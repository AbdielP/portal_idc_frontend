import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { ErrorHandlerService } from './errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {
  
  SERVER_URL = environment.SERVER_URL;
  formulariosURL = `${this.SERVER_URL}/formularios`;
  documentosURL = `${this.SERVER_URL}/documentos`;

  constructor(private http:HttpClient, private errorHandler:ErrorHandlerService) { }

  public getFormularios(token:any){
    return this.http.get(this.formulariosURL+`?token=${token}`)
    .pipe((catchError(err=>([
      this.errorHandler.unauthorizedHandleError(err)
      // console.log(err)
    ]))))
  }

  //Descarga desde el servidor node el FORMULARIO que recibe como parametro 
  public download(fileName:any,extension:any,token:any){
    this.http.get(`${this.formulariosURL}/${fileName}?token=${token}`,{responseType:'blob'})
    .subscribe((res:Blob)=>{
      saveAs(res,fileName);
    }),(err)=>{
      this.errorHandler.unauthorizedHandleError(err)
    }
  }

  public borrarForms(fileName:any,extension:any,token:any){
    return this.http.delete(`${this.formulariosURL}/borrar/${fileName}/${extension}?token=${token}`)
    .pipe((catchError(err=>([
      this.errorHandler.unauthorizedHandleError(err)
    ]))))
  }

  //------- SERVICIOS PARA EDITAR
  //OBETENER LA INFORMACIÓN DEL FORMULARIO A EDITAR
  getFormulario(doc:any,ext:any,token:any){
    return this.http.get(`${this.SERVER_URL}/formulario/${doc}/${ext}/?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

   //EDITAR DESCRIPCIÓN DEL FORMULARIO
   actualizarDescripcionForm(descripcion:any,id:number,token:any){
    return this.http.put(`${this.SERVER_URL}/formulario/descripcion/${id}?token=${token}`,descripcion)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err),
    ])))

  }
}
