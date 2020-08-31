import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorHandlerService {
//ESTE SERVICIO DE ERRORES ES PARA EL LOGIN
  constructor() { }

  handleError(error){
    Swal.fire(error.error.message);
    console.log("Error handler:",error);
  }
}
