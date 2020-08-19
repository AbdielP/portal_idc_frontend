import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private injector:Injector, private authService:AuthenticationService) { }
  
  unauthorizedHandleError(error){
    const router = this.injector.get(Router);
    if(error.status === 401 || error.status === 403){
      this.authService.limpiarStorage();
      router.navigate(['/login']);
      // Swal.fire(error.error.message)
    }
    if(error.error.err.code === 'ER_DUP_ENTRY'){
      Swal.fire(`${error.error.message}. ${error.error.err.sqlMessage}`)
      return console.log("Error handler:",error);
    }
    Swal.fire(error.error.message)
    console.log("Error handler:",error);
  }
}