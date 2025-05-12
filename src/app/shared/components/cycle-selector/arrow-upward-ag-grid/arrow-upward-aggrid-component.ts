import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { MaterialModule } from "../../../modules/material.module";

@Component({
    selector: 'app-company-logo-renderer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MaterialModule],
    template: `
        <span [style.color]="getPriorityColor(params.priority)">
            <mat-icon>arrow_upward</mat-icon>
        </span>
    `,
})
export class ArrowUpwardAgGridComponent implements ICellRendererAngularComp {
    params: any;

    agInit(params: ICellRendererParams): void {
        this.params = params.data;
    }

    refresh(): boolean {
        return false;
    }

     getPriorityColor(priority: string): string {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'orange';
            case 'LOW': return 'green';
            default: return 'gray';
        }
    }
}