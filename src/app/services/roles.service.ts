import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from 'src/app/services/errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient,private errorHandler:ErrorHandlerService) { }

  listarRoles(token:any){
    return this.http.get(`${this.SERVER_URL}/roles?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
}