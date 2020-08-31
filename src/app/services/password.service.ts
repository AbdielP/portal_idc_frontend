import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  
  SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient, private errorHandler:ErrorHandlerService) { }

  //CAMBIAR LA CONTRASEÑA
  public updatePassword(form:String,token:any){
    return this.http.put(`${this.SERVER_URL}/password/cambiar/?token=${token}`,form)
    .pipe((catchError(err=>[
      console.log(err),
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  public recoverPassword(form:any,correo:string){
    return this.http.post(`${this.SERVER_URL}/password/recover/${correo}`,form)
    .pipe((catchError(err=>[
      console.log(err),
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
}
