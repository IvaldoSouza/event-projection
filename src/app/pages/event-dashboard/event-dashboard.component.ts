import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
// import { calculateEvents } from '../../core/utils/calculate-events.util';
import { Cycle, EventType } from '../../core/models/cycle.model';
import { MockApiService } from '../../core/services/mock-api.service';
import { EventProjection } from '../../core/models/event-projections.model';
import { distributeEntities } from '../../core/utils/distribute-entities.util';
import { FormsModule } from '@angular/forms';
import { EntityCounterComponent } from "../../shared/components/entity-counter/entity-counter.component";
import { CycleSelectorComponent } from "../../shared/components/cycle-selector/cycle-selector.component";
import { MaterialModule } from '../../shared/modules/material.module';
import { ChartOptions, StackedBarChartComponent } from '../../shared/components/stacked-bar-chart/stacked-bar-chart.component';

@Component({
    selector: 'app-event-dashboard',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MaterialModule, FormsModule, EntityCounterComponent, CycleSelectorComponent, StackedBarChartComponent],
    templateUrl: './event-dashboard.component.html',
    styleUrl: './event-dashboard.component.scss'
})
export class EventDashboardComponent implements OnInit {
    cycles: Cycle[] = [];
    cyclesSelected: Cycle[] = [];
    baseProjection: EventProjection[] = [];
    entityCount = 1;
    readonly panelOpenState = signal(false);


    constructor(private service: MockApiService) { }

    // openModal(): void {
    //     this.modal.open(ModalMaterialComponent, {
    //         width: '90vw',   // Ocupa 90% da largura da tela
    //         height: '90vh',  // Ocupa 90% da altura da tela
    //         panelClass: 'custom-modal'  // Para estilos personalizados
    //     });
    // }

    ngOnInit() {
        this.service.getMockData().subscribe(data => {
            this.cycles = data.cycles.map(c => {
                const dayOne = c.structure.find(s => s.day === 1);

                const eventsTodayBase =
                    (dayOne?.meetings || 0) +
                    (dayOne?.emails || 0) +
                    (dayOne?.calls || 0) +
                    (dayOne?.follows || 0);

                return {
                    ...c,
                    selected: false,
                    assignedEntities: 0,
                    eventsTodayBase
                };
            });

            this.baseProjection = data.eventsProjection;
            this.generatingChart();

            console.log('cycles', this.cycles);
            console.log('baseProjection', this.baseProjection);
            console.log('entidades', this.entityCount)

            // this.calculateNewProjection();
        });
    }


    generatingChart() {
        const generated = this.calculateNewProjection();
        console.log(generated);
    }

    startEntities() {
        console.log('entidades 2', this.entityCount)
        if (this.entityCount < 1) return;

        this.cycles = distributeEntities(this.entityCount, this.cycles);

        this.calculateNewProjection(); // somar eventos das entidades 
        console.log('cycles 2', this.cycles);
        this.updateChart(); // mostrar gráfico 
    }

    updateChart() {
        throw new Error('Method not implemented.');
    }

    calculateNewProjection() {
        const result: { [day: number]: { [type: string]: number } } = {};
        const keys: EventType[] = ['meetings', 'emails', 'calls', 'follows'];

        // 1. Eventos existentes
        this.baseProjection.forEach(ep => {
            if (!result[ep.day]) result[ep.day] = {};
            keys.forEach(type => {
                result[ep.day][type] = ep.events[type];
            });
        });

        // 2. Eventos gerados pelos ciclos iniciados
        this.cycles.forEach(cycle => {
            const multiplier = cycle.assignedEntities ?? 0;
            if (multiplier === 0) return;

            cycle.structure.forEach(dayStructure => {
                if (!result[dayStructure.day]) result[dayStructure.day] = {};
                keys.forEach(type => {
                    const base = result[dayStructure.day][type] || 0;
                    const extra = (dayStructure as any)[type] * multiplier;
                    result[dayStructure.day][type] = base + extra;
                });
            });
        });

        // 3. Monta as séries para o gráfico
        const days = [1, 2, 3, 4, 5];
        const series = keys.map(type => ({
            name: type,
            data: days.map(day => result[day]?.[type] || 0)
        }));

        this.chartOptions = {
            ...this.chartOptions,
            series
        };

        console.log('chartOptions', this.chartOptions.series);
    }

    teste(event: any) {
        console.log('teste main', event)
        this.cyclesSelected = event;
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
            text: 'Projeção de Eventos Futuros'
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    };


}
