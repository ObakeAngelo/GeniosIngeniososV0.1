import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTraspasosComponent } from './agregar-traspasos.component';

describe('AgregarTraspasosComponent', () => {
  let component: AgregarTraspasosComponent;
  let fixture: ComponentFixture<AgregarTraspasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTraspasosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTraspasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
