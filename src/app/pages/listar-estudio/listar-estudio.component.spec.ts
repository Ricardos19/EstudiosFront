import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudioComponent } from './listar-estudio.component';

describe('ListarEstudioComponent', () => {
  let component: ListarEstudioComponent;
  let fixture: ComponentFixture<ListarEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstudioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
