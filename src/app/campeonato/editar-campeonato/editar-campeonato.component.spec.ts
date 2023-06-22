import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCampeonatoComponent } from './editar-campeonato.component';

describe('EditarCampeonatoComponent', () => {
  let component: EditarCampeonatoComponent;
  let fixture: ComponentFixture<EditarCampeonatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCampeonatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
