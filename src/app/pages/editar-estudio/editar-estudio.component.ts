import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule,ReactiveFormsModule, FormGroup,FormBuilder,Validators} from '@angular/forms';
import { EstudioService } from '../../services/estudio.service';
import { Estudio } from '../../models/estudio';

@Component({
  selector: 'app-editar-estudio',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './editar-estudio.component.html',
  styleUrl: './editar-estudio.component.css'
})
export class EditarEstudioComponent implements OnInit{

  //propiedades
  estudioForm: FormGroup = new FormGroup({});
  enviado:boolean = false;
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

  constructor(
    public formBuilder :FormBuilder,
    private router : Router,
    private actRouter: ActivatedRoute,
    private estudioService: EstudioService

  ){
    //this.mainForm();
  }
  ngOnInit(): void { 
    this.mainForm();
    let id = this.actRouter.snapshot.paramMap.get('id');
    this.getEstudio(id);
  }

  //Metodo para crear el formulario
    mainForm(){
    this.estudioForm= this.formBuilder.group({
      titulo:['',[Validators.required]],
      area:['',[Validators.required]],
      ano:['',[
          Validators.required,
          Validators.pattern('^[0-9]+$')]],
      universidad: ['', [Validators.required]],
      aplicacion: ['', [Validators.required]],
      resumen: ['', [Validators.required]]
    })
  }

  //metodo que asigna el area seleccionada al formulario
  actualizarArea (event:Event): void{
    const seleccionarElemento = event.target as HTMLSelectElement;
    const areaSeleccionada = seleccionarElemento.value;
    this.estudioForm
    .get('area')?.setValue(areaSeleccionada);
  }
  //getter para acceder a los controles del formulario
  get myForm(){
    return this.estudioForm.controls;
  }

  //Metodo para buscar el estuio a modificar
  getEstudio(id:any){
    this.estudioService.getEstudio(id)
    .subscribe((data)=>{
      this.estudioForm.setValue({
        titulo:data['titulo'],
        area:data['area'],
        ano:data['ano'],
        universidad:data['universidad'],
        aplicacion:data['aplicacion'],
        resumen:data['resumen'],
      })
    })
  }
  //Ejecucion para el submit
  onSubmit(){
     this.enviado = true;
    if(!this.estudioForm.valid){
      return false;
    }else{
      if(window.confirm('¿Estás seguro que lo deseas modificar?')){
        let id = this.actRouter.snapshot.paramMap.get('id');
        this.estudioService.actualizarEstudio(id,this.estudioForm.value).subscribe({
          complete: () => {
            console.log('Se actualizó correctamente el estudio');
            this.router.navigateByUrl('/listar-estudios');
          }, 
           error: (e) => {
            console.log(e);
           }
        })
      }
      return;
    }
  }


}
