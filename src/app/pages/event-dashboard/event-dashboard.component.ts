import { Component, OnInit } from '@angular/core';
import { calculateEvents } from '../../core/utils/calculate-events.util';
import { Cycle } from '../../core/models/cycle.model';
import { MockApiService } from '../../core/services/mock-api.service';
import { EventProjection } from '../../core/models/event-projections.model';
import { distributeEntities } from '../../core/utils/distribute-entities.util';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-event-dashboard',
    imports: [MatInputModule, FormsModule],
    templateUrl: './event-dashboard.component.html',
    styleUrl: './event-dashboard.component.css'
})
export class EventDashboardComponent implements OnInit {
    cycles: Cycle[] = [];
    baseProjection: EventProjection[] = [];
    entityCount = 1;



    constructor(private service: MockApiService) {
    }

    ngOnInit() {
        this.service.getMockData().subscribe(data => {
            console.log(data);
            this.cycles = data.cycles;
            this.baseProjection = data.eventsProjection;
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

        this.calculateNewProjection(); // somar eventos das entidades iniciadas
        this.updateChart(); // mostrar gráfico atualizado
    }

    updateChart() {
        throw new Error('Method not implemented.');
    }

    calculateNewProjection() {
        throw new Error('Method not implemented.');
    }


}
