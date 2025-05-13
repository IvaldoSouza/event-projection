import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Cycle } from '../../../core/models/cycle.model';
import { MaterialModule } from '../../modules/material.module';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ArrowUpwardAgGridComponent } from './arrow-upward-ag-grid/arrow-upward-aggrid-component';

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
export class CycleSelectorComponent implements OnChanges {

    @Input() cycles: Cycle[] = [];
    heightGrid: number = window.innerHeight * 0.28;
    public gridApi: any;
    public selectedRows: any[] = [];
    public selectedCycles: Cycle[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['cycles'] && this.gridApi) {
            setTimeout(() => {
                this.selectInitialRows();
            }, 0);
        }
    }

    columnDefs: ColDef<Cycle>[] = [
        {
            field: "selected",
            headerName: "",
            width: 50,
            checkboxSelection: true,
            lockPinned: true
        },
        {
            field: "priority",
            headerName: "",
            width: 80,
            cellRenderer: ArrowUpwardAgGridComponent,
            valueGetter: (params: any) => {
                return this.getPriorityColor(params.data.priority);
            }
        },
        {
            field: "name",
            headerName: "",
            flex: 1,
        },
        {
            field: "availableEntities",
            headerName: "Selecionados/Disponíveis",
            valueGetter: (params: any) => {
                return params.data.assignedEntities + '/' + params.data.availableEntities;
            },
            flex: 1,
        },
        {
            field: "eventsTodayBase",
            headerName: "Eventos para hoje",
        },
    ];

    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;

        this.selectInitialRows();
    }

    selectInitialRows(): void {
        this.gridApi.forEachNode((node: RowNode) => {
            if (node.data?.selected) {
                node.setSelected(true);
            }
        });
    }

    getPriorityColor(priority: string): string {
        switch (priority) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'orange';
            case 'LOW': return 'green';
            default: return 'gray';
        }
    }

    onSelectionChanged() {
        this.selectedRows = this.getSelectedRows();

        this.selectedCycles = [... this.selectedRows];
        this.getSelected(this.selectedCycles);
    }

    getSelected(selectedCycles: Cycle[]) {
        selectedCycles.forEach(c => c.selected = true);
    }

    selectAllRows(seleccionar: boolean) {
        if (seleccionar)
            this.gridApi.selectAll();
        else
            this.gridApi.deselectAll();
    }

    getSelectedRows() {
        const selectedNodes: RowNode[] = [];
        this.gridApi.forEachNode((node: RowNode) => {
            if (node.isSelected())
                selectedNodes.push(node);
        });

        return selectedNodes.map(node => node.data);
    }
}
