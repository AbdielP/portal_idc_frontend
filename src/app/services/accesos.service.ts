import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ErrorHandlerService } from './errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccesosService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient, private errorHandler:ErrorHandlerService) { }

   //Lista los accesos de una ENTIDAD (IDC, Empresa, proveedor, etc)
  getAccesos(entidad:any,token:any){
    return this.http.get(`${this.SERVER_URL}/accesos/${entidad}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
      // console.log('ERROR DESDE EL SERVICE',err)
    ])))
  }
  //Obtiene TODOS los accesos por aprobar
  getAccesosPendientes(){
    return this.http.get(`${this.SERVER_URL}/accesospendientes`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
    ])))
  }
  //Obtiene los detalles de un acceso -> (detallesacceso.components)
  getAccesDetails(idseguridad:number,cedula_visitante:string,compania_visitante:string,token:any){
    return this.http.get(`${this.SERVER_URL}/accesos/detalle/${idseguridad}/${cedula_visitante}/${compania_visitante}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
    ])))
  }
  // ---------------------------- SOLICITAR ACCESO ------------------------------
  //Obtiene los datos de los solicitantes de la matriz más reciente si solicitar_acceso = 1 (SOLICITAR-ACCESO.COMPONENT.TS)
  getDatosSolicitante(idproyecto:number,token:any){
    return this.http.get(`${this.SERVER_URL}/accesos/solicitante/${idproyecto}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
    ])))
  }

  solicitarAcceso(token:any,form:any){
    return this.http.post(`${this.SERVER_URL}/accesos/solicitar/?token=${token}`,form)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
      // console.log('ERROR DESDE EL SERVICE',err)
    ])))
  }
}
