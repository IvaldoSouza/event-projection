import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-modal-material',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './modal-material.component.html',
    styleUrl: './modal-material.component.scss',
    encapsulation: ViewEncapsulation.None 
})
export class ModalMaterialComponent {
    @Input() selector: string = '';
    constructor(
        public dialogRef: MatDialogRef<ModalMaterialComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            component: any,
            title: string
        }
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}
