import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EstudioService {
  baseUri: string = 'https://estudiosback.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  //Método para agregar un estudio
  agregarEstudio(data:any) : Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url,data)
      .pipe(catchError(this.errorManager));
  }

  //Metodo para listar los estudios
  getEstudios() {
    let url = `${this.baseUri}/estudios`;
    return this.http.get(url);
  }

  //método para obtener un estudio por su ID
  getEstudio(id:any) : Observable<any> {
    let url = `${this.baseUri}/estudio/${id}`;
    return this.http.get(url, {headers: this.headers})
          .pipe(map((res:any) => {
            return res || {};
          }),
          catchError(this.errorManager)
        );
  }

  //Método para actualizar el estudio
  actualizarEstudio(id:any, data:any) : Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }

  // Método para eliminar un estudio
  eliminarEstudio(id:any, data:any) : Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }

  //Manejar errores 
   errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //error esta del lado del cliente
      errorMessage = error.error.message;
    } else {
      //El error esta del lado del servidor
      errorMessage = `Error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
   }
}

