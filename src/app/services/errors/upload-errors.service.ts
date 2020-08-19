import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadErrorsService {

  constructor() { }

  uploadErrors(error){
    var message:string = "";
    // console.log("COMPLETO",error);
    if(error.error.err.code === 'ER_DUP_ENTRY') message = "Documento duplicado en la base de datos.";
    if(error.status === 400 ) message = error.error.err.message;
    return message;
  }
}
