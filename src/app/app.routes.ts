import { Routes } from '@angular/router';
import { ListarEstudioComponent } from './pages/listar-estudio/listar-estudio.component';
import { AgregarEstudioComponent } from './pages/agregar-estudio/agregar-estudio.component';
import { EditarEstudioComponent } from './pages/editar-estudio/editar-estudio.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-estudio'
    },
    {
        path: 'listar-estudio',
        component: ListarEstudioComponent
    },
    {
        path: 'agregar-estudio',
        component: AgregarEstudioComponent
    },
    {
        path: 'editar-estudio/:id',
        component: EditarEstudioComponent
    },
    {
        path: '**',
        redirectTo: 'listar-estudio'
    }
];
