import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPageAdminComponent } from './principal-page-admin.component';

describe('PrincipalPageAdminComponent', () => {
  let component: PrincipalPageAdminComponent;
  let fixture: ComponentFixture<PrincipalPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalPageAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
