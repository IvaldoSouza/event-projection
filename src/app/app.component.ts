import { Component } from '@angular/core';
import { EventDashboardComponent } from "./pages/event-dashboard/event-dashboard.component";
import { ModalMaterialComponent } from './shared/components/modal-material/modal-material.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from './shared/modules/material.module';

@Component({
    selector: 'app-root',
    imports: [MaterialModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'event-projection';

    constructor(private modal: MatDialog) { }

    openModal(): void {
        this.modal.open(ModalMaterialComponent, {
            // width: 'auto',
            height: '95vh',
            maxWidth: '800px',
            maxHeight: '95vh',
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
