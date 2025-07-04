import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsHistoryComponent } from './sensors-history.component';

describe('SensorsHistoryComponent', () => {
  let component: SensorsHistoryComponent;
  let fixture: ComponentFixture<SensorsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
