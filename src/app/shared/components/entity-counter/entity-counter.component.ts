import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../modules/material.module';

@Component({
    standalone: true,
    selector: 'app-entity-counter',
    imports: [MaterialModule],
    templateUrl: './entity-counter.component.html',
    styleUrl: './entity-counter.component.scss'
})
export class EntityCounterComponent {
    @Input() value: number = 1;
    @Output() valueChange = new EventEmitter<number>();

    increase() {
        this.value += 1;
        this.valueChange.emit(this.value);
    }

    decrease() {
        if (this.value > 1) {
            this.value--;
            this.valueChange.emit(this.value);
        }
    }
}
