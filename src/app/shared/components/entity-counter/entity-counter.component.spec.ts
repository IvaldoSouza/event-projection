import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCounterComponent } from './entity-counter.component';

describe('EntityCounterComponent', () => {
  let component: EntityCounterComponent;
  let fixture: ComponentFixture<EntityCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
