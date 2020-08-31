import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthErrorHandlerService } from './errors/auth-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  token:string;
  menu:any[] = [];
  checked:any;
  SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient, private router:Router, private authErrorHandler:AuthErrorHandlerService) { 
    this.cargarStorage();
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.checked = localStorage.getItem('x');
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.menu = [];
    }
  }

  login(usuario:any){
    return this.http.post(`${this.SERVER_URL}/login`,usuario.value)
    .pipe(map((resp:any)=>{
      // console.log(resp)
      this.guardarStorage(resp.token,resp.menu,resp.usuarioLogeado.checked);
      if(resp.usuarioLogeado.checked == 0){
        return this.router.navigate(['/password']);
      }
      return resp;
    }))
    .pipe(catchError(err=> of([
      this.authErrorHandler.handleError(err)
    ])))
  }

  logOut(){
    this.token = '';
    this.menu = [];
    this.checked = '';
    this.limpiarStorage();
    this.router.navigate(['/login']);
  }

  guardarStorage(token:any,menu:any,checked:any){
    localStorage.setItem('token',token);
    localStorage.setItem('x',checked);
    localStorage.setItem('menu',JSON.stringify(menu));
    this.token = token;
    this.menu = menu;
    this.checked = checked;
    // console.log('token login:',token)
  }

  limpiarStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('x');
    localStorage.clear();
  }

  isLogedIn(){
    return (this.token.length > 5) ? true:false;
  }

   // ------------------------------------------------------------------------------------------
    //CAMBIAR PRIMERA CONTRASEÑA
    public firstPssword(form:String,token:any){
      return this.http.put(`${this.SERVER_URL}/firstlogpass/?token=${token}`,form)
      .pipe(map((resp:any)=>{
        // console.log(resp)
        this.updateLocalStorage(resp.usuarioChecked[0].checked,resp.token,);
        return resp;
      }))
      .pipe(catchError(err=> of([
        this.authErrorHandler.handleError(err)       
        // console.log('HTTP Error:',err.error.message)
      ])))
    }

    public updateLocalStorage(checked:any,token:any){
      localStorage.removeItem('token');
      localStorage.removeItem('x');
      localStorage.setItem('token',token)
      localStorage.setItem('x',checked)
      this.checked = checked;
      this.token = token;
    }

    public isChecked(){
      return (this.checked > 0) ? true:false;
    }

}
