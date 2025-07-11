import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSensoresComponent } from './card-sensores.component';

describe('CardSensoresComponent', () => {
  let component: CardSensoresComponent;
  let fixture: ComponentFixture<CardSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSensoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
