import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventDashboardComponent } from "./pages/event-dashboard/event-dashboard.component";
import { ModalMaterialComponent } from './shared/components/modal-material/modal-material.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    imports: [EventDashboardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'event-projection';

    constructor(private modal: MatDialog) { }

    openModal(): void {
        this.modal.open(ModalMaterialComponent, {
            // width: 'auto',
            height: '100vh',
            maxWidth: '800px',
            maxHeight: '100vh',
            panelClass: 'custom-modal',
            disableClose: true,
            autoFocus: false,
            data: {
                title: 'Iniciar novas Entidades',
                component: EventDashboardComponent
            }
        });
    }
}
