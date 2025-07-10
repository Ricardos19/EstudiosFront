import { Component, OnInit } from '@angular/core';
import { EstudioService } from '../../services/estudio.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-estudio',
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-estudio.component.html',
  styleUrl: './listar-estudio.component.css'
})
export class ListarEstudioComponent implements OnInit {
  listarEstudios: any[] = [];
  
  constructor(private estudioService: EstudioService) {}
  
  ngOnInit(): void {
    this.getEstudios();
  }
  
  // Método para obtener estudios
  getEstudios() {
    this.estudioService.getEstudios().subscribe((data: any) => {
      console.log('Datos recibidos:', data); 
      this.listarEstudios = data;
    });
  }
  
  eliminarEstudio(estudio: any, index: number) {
    if (window.confirm('¿Estás seguro que lo deseas eliminar?')) {
      this.estudioService.eliminarEstudio(estudio._id, {})
        .subscribe((data: any) => {
          this.listarEstudios.splice(index, 1);
        });
    }
  }
}