import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Cycle } from '../../../core/models/cycle.model';
import { MaterialModule } from '../../modules/material.module';
import { ColDef, GridOptions, RowNode } from 'ag-grid-community';
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
export class CycleSelectorComponent implements OnInit {
    @Input() cycles: Cycle[] = [];
    @Input() eventsProjection: Cycle[] = [];
    @Output() cyclesChange = new EventEmitter<Cycle[]>();
    heightGrid: number = window.innerHeight * 0.38;
    public gridApi: any;
    public gridColumnApi: any;
    public selectedRows: any[] = [];
    public selecionados: Cycle[] = [];

    ngOnInit(): void {
        console.log('clicle', this.cycles);
    }

    columnDefs: ColDef<Cycle>[] = [
        {
            width: 50,
            checkboxSelection: true,
            lockPosition: true,
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

    // defaultColDef: ColDef = {
    //     // flex: 1,
    // };

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    // toggle(cycle: Cycle) {
    //     cycle.selected = !cycle.selected;
    //     this.cyclesChange.emit(this.cycles);
    //     console.log('cycles change', this.cycles);
    // }

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

        this.selecionados = [... this.selectedRows];
        console.log('Filas seleccionadas:', this.selecionados);
        this.teste(this.selecionados);
    }

    teste(selecionados: Cycle[]) {
        selecionados.forEach(c => c.selected = true);
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
