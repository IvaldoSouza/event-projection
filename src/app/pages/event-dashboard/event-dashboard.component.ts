import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Cycle, EventType } from '../../core/models/cycle.model';
import { EventProjection } from '../../core/models/event-projections.model';
import { MockApiService } from '../../core/services/mock-api.service';
import { distributeEntities } from '../../core/utils/distribute-entities.util';

import { CycleSelectorComponent } from "../../shared/components/cycle-selector/cycle-selector.component";
import { MaterialModule } from '../../shared/modules/material.module';
import { ChartOptions, StackedBarChartComponent } from '../../shared/components/stacked-bar-chart/stacked-bar-chart.component';
import { ModalMaterialComponent } from '../../shared/components/modal-material/modal-material.component';

interface ProjectionResult {
  day: number;
  events: {
    meetings: number;
    emails: number;
    calls: number;
    follows: number;
  };
}

@Component({
  selector: 'app-event-dashboard',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MaterialModule, FormsModule, CycleSelectorComponent, StackedBarChartComponent],
  templateUrl: './event-dashboard.component.html',
  styleUrl: './event-dashboard.component.scss'
})
export class EventDashboardComponent implements OnInit {
  cycles: Cycle[] = [];
  baseProjection: EventProjection[] = [];
  newProjection: ProjectionResult[] = [];
  entityCount = 1;
  readonly panelOpenState = signal(false);

  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'bar',
      stacked: true,
      height: 350
    },
    colors: ['#28A745', '#6C757D', '#4DD0E1', '#7F7BFF'], 
    xaxis: {
      categories: this.getDayLabels()
    },
    yaxis: {
      title: { text: 'Qtd. de Eventos' }
    },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    tooltip: { shared: true, intersect: false },
    legend: { position: 'bottom' },
    title: { text: 'Projeção de Eventos Futuros' },
    plotOptions: {
      bar: { horizontal: false }
    }
  };

  constructor(
    private service: MockApiService,
    public dialogRef: MatDialogRef<ModalMaterialComponent>
  ) {}

  ngOnInit() {
    const today = this.currentDayToChart();

    this.service.getMockData().subscribe(data => {
      this.cycles = data.cycles.map(cycle => {
        const structureToday = cycle.structure.find(s => s.day === today);
        const eventsTodayBase =
          (structureToday?.meetings ?? 0) +
          (structureToday?.emails ?? 0) +
          (structureToday?.calls ?? 0) +
          (structureToday?.follows ?? 0);

        return {
          ...cycle,
          selected: cycle.priority === 'HIGH',
          assignedEntities: 0,
          eventsTodayBase
        };
      });

      this.baseProjection = data.eventsProjection;
      this.calculateNewProjection();
    });
  }

  startEntities() {
    if (this.entityCount < 1) return;
    this.cycles = distributeEntities(this.entityCount, this.cycles);
    this.calculateNewProjection();
  }

  calculateNewProjection() {
    const result: { [day: number]: { [type: string]: number } } = {};
    const keys: EventType[] = ['meetings', 'emails', 'calls', 'follows'];

    this.baseProjection.forEach(ep => {
      if (!result[ep.day]) result[ep.day] = {};
      keys.forEach(type => {
        result[ep.day][type] = ep.events[type] ?? 0;
      });
    });

    this.cycles.forEach(cycle => {
      const multiplier = cycle.assignedEntities ?? 0;
      if (multiplier === 0) return;

      cycle.structure.forEach(dayStructure => {
        if (!result[dayStructure.day]) result[dayStructure.day] = {};
        keys.forEach(type => {
          const base = result[dayStructure.day][type] ?? 0;
          const extra = (dayStructure as any)[type] ?? 0;
          result[dayStructure.day][type] = base + (extra * multiplier);
        });
      });
    });

    this.newProjection = Object.entries(result).map(([day, events]) => ({
      day: +day,
      events: events as ProjectionResult['events']
    }));

    this.updateChart(keys, result);
  }

  updateChart(keys: EventType[], result: { [day: number]: { [type: string]: number } }) {
    const days = [1, 2, 3, 4, 5];
    const series = keys.map(type => ({
      name: type,
      data: days.map(day => result[day]?.[type] ?? 0)
    }));

    this.chartOptions = {
      ...this.chartOptions,
      series,
      xaxis: { ...this.chartOptions.xaxis, categories: this.getDayLabels() }
    };
  }

  getDayLabels(): string[] {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    const dayOfWeek = new Date().getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) return days;

    const todayIndex = dayOfWeek - 1;
    return Array.from({ length: 5 }, (_, i) => {
      const index = (todayIndex + i) % 5;
      return i === 0 ? 'Hoje' : days[index];
    });
  }

  currentDayToChart(): number {
    const day = new Date().getDay();
    return (day === 0 || day === 6) ? 1 : day;
  }

  getEventsForToday(): number {
    const today = this.currentDayToChart();
    const projection = this.newProjection.find(p => p.day === today);
    if (!projection) return 0;

    const { meetings = 0, emails = 0, calls = 0, follows = 0 } = projection.events;
    return meetings + emails + calls + follows;
  }

  closeModal() {
    this.dialogRef.close();
  }
}

