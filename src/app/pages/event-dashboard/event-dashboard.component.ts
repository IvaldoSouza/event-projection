import { Component, OnInit, signal } from '@angular/core';
import { calculateEvents } from '../../core/utils/calculate-events.util';
import { Cycle } from '../../core/models/cycle.model';
import { MockApiService } from '../../core/services/mock-api.service';
import { EventProjection } from '../../core/models/event-projections.model';
import { distributeEntities } from '../../core/utils/distribute-entities.util';
import { FormsModule } from '@angular/forms';
import { EntityCounterComponent } from "../../shared/components/entity-counter/entity-counter.component";
import { CycleSelectorComponent } from "../../shared/components/cycle-selector/cycle-selector.component";
import { MaterialModule } from '../../shared/modules/material.module';
import { ChartOptions, StackedBarChartComponent } from '../../shared/components/stacked-bar-chart/stacked-bar-chart.component';

@Component({
    standalone: true,
    selector: 'app-event-dashboard',
    imports: [MaterialModule, FormsModule, EntityCounterComponent, CycleSelectorComponent, StackedBarChartComponent],
    templateUrl: './event-dashboard.component.html',
    styleUrl: './event-dashboard.component.scss'
})
export class EventDashboardComponent implements OnInit {
    cycles: Cycle[] = [];
    baseProjection: EventProjection[] = [];
    entityCount = 1;
    readonly panelOpenState = signal(false);


    constructor(private service: MockApiService) {
    }

    ngOnInit() {
        this.service.getMockData().subscribe(data => {
            // console.log(data);
            this.cycles = data.cycles;
            this.baseProjection = data.eventsProjection;

            console.log('cycles', this.cycles);
            console.log('baseProjection', this.baseProjection);
            this.generatingChart();
        });
    }


    generatingChart() {
        const generated = calculateEvents(this.cycles);
        console.log(generated);
    }

    startEntities() {
        if (this.entityCount < 1) return;

        this.cycles = distributeEntities(this.entityCount, this.cycles);

        this.calculateNewProjection(); // somar eventos das entidades 
        this.updateChart(); // mostrar gráfico 
    }

    updateChart() {
        throw new Error('Method not implemented.');
    }

    calculateNewProjection() {
        const result: { [day: number]: { [type: string]: number } } = {};

        this.baseProjection.forEach(ep => {
            if (!result[ep.day]) result[ep.day] = {};
            for (const type in ep.events) {
                // result[ep.day][type] = ep.events[type];
            }
        });

        this.cycles.forEach(cycle => {
            if (!cycle.assignedEntities || cycle.assignedEntities === 0) return;

            cycle.structure.forEach(dayStructure => {
                if (!result[dayStructure.day]) result[dayStructure.day] = {};

                ['meetings', 'emails', 'calls', 'follows'].forEach(type => {
                    const base = result[dayStructure.day][type] || 0;
                    // const extra = (dayStructure as any)[type] * cycle.assignedEntities;
                    // result[dayStructure.day][type] = base + extra;
                });
            });
        });

        const types = ['meetings', 'emails', 'calls', 'follows'];
        const days = [1, 2, 3, 4, 5];

        const series = types.map(type => {
            return {
                name: type,
                data: days.map(day => result[day]?.[type] || 0)
            };
        });

        this.chartOptions.series = series;
    }


    chartOptions: ChartOptions = {
        series: [],
        chart: {
            type: 'bar',
            stacked: true,
            height: 350
        },
        xaxis: {
            categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
        },
        yaxis: {
            title: {
                text: 'Qtd. de Eventos'
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        legend: {
            position: 'top'
        },
        title: {
            text: 'Projeção de Eventos'
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    };


}
