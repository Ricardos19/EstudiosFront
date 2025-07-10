import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EstudioService } from '../../services/estudio.service';

@Component({
  selector: 'app-agregar-estudio',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-estudio.component.html',
  styleUrl: './agregar-estudio.component.css'
})
export class AgregarEstudioComponent implements OnInit {

  // Propiedades
  estudioForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  estudioArea: any = [
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

  constructor (
    public formBuilder: FormBuilder,
    private router: Router, 
    private ngZone: NgZone,
    private estudioService: EstudioService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.estudioForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      area: ['', [Validators.required]],
      ano: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$')]],
      universidad: ['', [Validators.required]],
      aplicacion: ['', [Validators.required]],
      resumen: ['', [Validators.required]]
    });
  }

  // Método que asigna el área seleccionada al formulario
  actualizarArea(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const areaSeleccionada = seleccionarElemento.value;
    this.estudioForm.get('area')?.setValue(areaSeleccionada);
  }

  // Get para acceder a los controles del formulario
  get myForm() {
    return this.estudioForm.controls;
  }

  // Método de ejecución para el submit
  onSubmit() {
    this.enviado = true;
    if (!this.estudioForm.valid) {
      console.log('Formulario inválido:', this.estudioForm.errors);
      console.log('Valores del formulario:', this.estudioForm.value);
      return false;
    } else {
      console.log('Datos a enviar:', this.estudioForm.value); // Para debugging
      return this.estudioService.agregarEstudio(this.estudioForm.value)
        .subscribe({
          complete: () => {
            console.log('Estudio agregado correctamente');
            this.ngZone.run(() => this.router.navigateByUrl('/listar-estudio'));
          },
          error: (e) => {
            console.log('Error al agregar estudio:', e);
          },
        });
    }
  }
}