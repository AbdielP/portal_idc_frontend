import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './errors/error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL = environment.SERVER_URL;
  token:any;

  constructor(private httpClient:HttpClient, private errorHandler:ErrorHandlerService) { 
    this.token = localStorage.getItem('token');
  }

  //FORMULARIOS
  //FUNCIÓN PARA SUBIR FORMULARIO
  upload(data){
    let uploadURL = `${this.SERVER_URL}/upload/formulario?token=${this.token}`;
    return this.httpClient.post<any>(uploadURL,data,{
      reportProgress:true,
      observe: 'events'
    }).pipe(map((event)=>{
      switch(event.type){
        case HttpEventType.UploadProgress:
          const progress = Math.round(100*event.loaded/event.total);
          return {status: 'progress',message:progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    },(err)=>{
      // console.log(err),
      this.errorHandler.unauthorizedHandleError(err);
    }))
  }

  //Actualizar formularios
  update(data,id,olddoc){
    let updateURL = `${this.SERVER_URL}/formulario/actualizar/${id}/${olddoc}?token=${this.token}`;
    return this.httpClient.post<any>(updateURL,data)
    .pipe((catchError(err=>([
      // console.log(err),
      this.errorHandler.unauthorizedHandleError(err)
    ]))))
  }
}
