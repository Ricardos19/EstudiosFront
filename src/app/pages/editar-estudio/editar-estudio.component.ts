import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudioService } from '../../services/estudio.service';

@Component({
  selector: 'app-editar-estudio',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-estudio.component.html',
  styleUrl: './editar-estudio.component.css'
})
export class EditarEstudioComponent implements OnInit {

  estudioForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  estudioArea: string[] = [
    'Medicina',
    'Ingenieria Civil',
    'Inteligencia Artificial',
    'Agricultura',
    'Genetica',
    'Energías Renovables',
    'Neurociencia',
    'Quimica',
    'Biologia'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private actRouter: ActivatedRoute,
    private estudioService: EstudioService
  ) {}

  ngOnInit(): void {
    this.mainForm();
    const id = this.actRouter.snapshot.paramMap.get('id');
    if (id) this.getEstudio(id);
  }

  // Crear formulario reactivo
  mainForm(): void {
    this.estudioForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      area: ['', [Validators.required]],
      ano: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      universidad: ['', [Validators.required]],
      aplicacion: ['', [Validators.required]],
      resumen: ['', [Validators.required]]
    });
  }

  // Actualizar valor del área
  actualizarArea(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const areaSeleccionada = seleccionarElemento.value;
    this.estudioForm.get('area')?.setValue(areaSeleccionada);
  }

  // Acceso rápido a los controles del formulario
  get myForm() {
    return this.estudioForm.controls;
  }

  // Cargar datos actuales del estudio
  getEstudio(id: any): void {
    this.estudioService.getEstudio(id).subscribe((data) => {
      this.estudioForm.patchValue({
        titulo: data.titulo,
        area: data.area,
        ano: data.ano,
        universidad: data.universidad,
        aplicacion: data.aplicacion,
        resumen: data.resumen
      });
    });
  }

  // Subir cambios al backend
  onSubmit(): void {
    this.enviado = true;
    if (!this.estudioForm.valid) return;

    if (window.confirm('¿Estás seguro que lo deseas modificar?')) {
      const id = this.actRouter.snapshot.paramMap.get('id');
      this.estudioService.actualizarEstudio(id, this.estudioForm.value).subscribe({
        complete: () => {
          console.log('Se actualizó correctamente el estudio');
          this.router.navigateByUrl('/listar-estudios');
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }
}
