import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cycle } from '../../../core/models/cycle.model';
import { MaterialModule } from '../../modules/material.module';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

interface IRow {
    make: string;
    model: string;
    price: number;
    electric: boolean;
}

@Component({
    standalone: true,
    imports: [MaterialModule, AgGridModule],
    selector: 'app-cycle-selector',
    templateUrl: './cycle-selector.component.html',
    styleUrls: ['./cycle-selector.component.scss']
})
export class CycleSelectorComponent {
    heightGrid: number = window.innerHeight * 0.58;

    columnDefs: ColDef<IRow>[] = [
        { 
            field: "make",
            checkboxSelection: true,
        },
        { field: "model" },
        { field: "price" },
        { field: "electric" },
    ];

    defaultColDef: ColDef = {
        flex: 1,
    };

    rowData: IRow[] = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Mercedes", model: "EQA", price: 48890, electric: true },
        { make: "Fiat", model: "500", price: 15774, electric: false },
        { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ];

    @Input() cycles: Cycle[] = [];
    @Output() cyclesChange = new EventEmitter<Cycle[]>();
    toggle(cycle: Cycle) {
        cycle.selected = !cycle.selected;
        this.cyclesChange.emit(this.cycles);
    }

    getPriorityColor(priority: string): string {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'orange';
            case 'LOW': return 'green';
            default: return 'gray';
        }
    }

    disabled = false;
    max = 100;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = false;
    value = 0;
}
