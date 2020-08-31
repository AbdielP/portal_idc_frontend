import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from 'src/app/services/errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient,private errorHandler:ErrorHandlerService) { }

  //LISTA LOS CLIENTES DEL IDC DESDE LA BD 'general_db' en CWP-IDC-SCA
  listarProyectos(token:any){
    return this.http.get(`${this.SERVER_URL}/proyectos?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  listarProveedores(token:any){
    return this.http.get(`${this.SERVER_URL}/proveedores?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  
  //lista los proyectos WHERE LIKE 'IDC%'
  listarIDCS(token:any){
    return this.http.get(`${this.SERVER_URL}/proyectos/idc?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
}
