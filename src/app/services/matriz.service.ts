import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/services/errors/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MatrizService {

  SERVER_URL = environment.SERVER_URL

  constructor(private http:HttpClient,private errorHandler:ErrorHandlerService) { }
  
  agregarUsuarioMatriz(token:any,form:any){
    return this.http.post(`${this.SERVER_URL}/matriz/agregar/?token=${token}`,form)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  //Lista los usuarios que pertenecen a una entidad (cliente o proveedor, etc.. ) | SE USA EN MATRIZ.COMPONENT
  listarUsuariosEntidad(proyecto:any,token:any){
    return this.http.get(`${this.SERVER_URL}/matriz/listar/${proyecto}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //Lista los usuarios que pertenecen a una entidad según la fecha (versión) | SE USA EN MATRIZ.COMPONENT
  listarUsuariosVersionEntidad(proyecto:any,anio:any,token:any){
    return this.http.get(`${this.SERVER_URL}/matriz/listar/manual/${anio}/${proyecto}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  
  //Lista las versiones de la matriz de una empresa/proyecto
  listarVersionesMatriz(proyecto:any,token:any){
    return this.http.get(`${this.SERVER_URL}/matriz/versiones/${proyecto}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //Lista los datos de una (1) Matriz al darle editar (editarmatrizcomponent)
  listarEditarMatriz(version:number,idproyecto:number,idusuario:number,token:any){
    return this.http.get(`${this.SERVER_URL}/matriz/editar/${version}/${idproyecto}/${idusuario}?token=${token}`)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //EDITAR MATRIZ
  //Este servicio actualiza los permisos de usuario sobe la matriz de una entidad (forma 'actualiza el roll especifico cada ves que se haga click')
  actualizarPrivilegioMatriz(permisos:any,version:number,idproyecto:number,idusuario:number,token:any){
    return this.http.put(`${this.SERVER_URL}/matriz/editar/${version}/${idproyecto}/${idusuario}?token=${token}`,permisos)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //Deshabilita una cuenta de usuario en la BD (Se usa desde editarmatriz.component);
  deshabilitarUsuario(idusuario:number,token:any){
    //AQUI: --> ¿Si el usuario tiene 2 matrices, y solo quieren deshabilitarlo de 1? 
    return this.http.put(`${this.SERVER_URL}/matriz/deshabilitar/${idusuario}/?token=${token}`,null)
    .pipe((catchError(err=>[
      // console.log(err),
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }
  //Renovar versión matriz 
  renovarVersionMatriz(formulario:any,version:number,idproyecto:number,idusuario:number,token:any){
    return this.http.post(`${this.SERVER_URL}/matriz/renovar/${version}/${idproyecto}/${idusuario}?token=${token}`,formulario)
    .pipe((catchError(err=>[
      this.errorHandler.unauthorizedHandleError(err)
    ])))
  }

  //Verifica si tiene el roll para editar la matriz
  // verifyRollEditMatriz(token:any){
  //   return this.http.get(`${this.SERVER_URL}/matriz/roll_editar?token=${token}`)
  //   .pipe(catchError(err=>[
  //     this.errorHandler.unauthorizedHandleError(err)
  //   ]))
  // }
  
}
