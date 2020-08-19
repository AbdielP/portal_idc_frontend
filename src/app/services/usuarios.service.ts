import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from 'src/app/services/errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient, private errorHandler:ErrorHandlerService) { }
  //Se usa en el componente compartido CHECKUSUARIOS
  listarUsuarios(token:any,activo:number,checked:number,bloqueado:number){
    return this.http.get(`${this.SERVER_URL}/usuarios/${activo}/${checked}/${bloqueado}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  
  //FUNCIÓN PARA ENCONTRAR LOS DATOS DE UN USUARIO
  userInfo(idusuario:any,token:any){
    return this.http.get(`${this.SERVER_URL}/usuario/${idusuario}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //SIMILAR AL DE ARRIBA, PERO RETORNA SOLO LOS DATOS DEL USUARIO LOGEADO (USA EL TOKEN)
 logedUserInfo(token:any){
  return this.http.get(`${this.SERVER_URL}/usuario/logeado/info?token=${token}`)
  .pipe((catchError(err=>[
    this.errorHandler.unauthorizedHandleError(err)
  ])))
 }

  //FUNCIÓN PARA EDITAR PASSWORD/DATOS DE OTROS USUARIOS (USO SOLO PARA ESPECIALISTAS) editarusuario.component.ts
  editarUsuario(url:string,token:any,idusuario:number,form:any){
    return this.http.put(`${this.SERVER_URL}/usuario/${url}/${idusuario}?token=${token}`,form)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  //------> COUNTS de cuentas activas, bloqueadas y por activar.
  countPorActivar(){
    return this.http.get(`${this.SERVER_URL}/usuarios/count/activar`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  countBloqueadas(){
    return this.http.get(`${this.SERVER_URL}/usuarios/count/bloqueadas`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  countActivas(){
    return this.http.get(`${this.SERVER_URL}/usuarios/count/activas`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
}
