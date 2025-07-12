import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresAdminComponent } from './sensores-admin.component';

describe('SensoresAdminComponent', () => {
  let component: SensoresAdminComponent;
  let fixture: ComponentFixture<SensoresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensoresAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensoresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
