import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  form:FormGroup;
  token:any;
  usuarioInfo:any = "";
  
  idcsEntidad:any = [];
  informacionIDCS:any = [];

  constructor(private usuariosService:UsuariosService, private passwordService:PasswordService) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.logedUserInfo();
    this.form = new FormGroup({
      'actual_password' : new FormControl('',[Validators.required]),
      'password' : new FormControl('',[Validators.required,Validators.minLength(8)]),
      're_password' : new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
    if(this.form.value.password === this.form.value.re_password){
      this.passwordService.updatePassword(this.form.value,this.token)
      .subscribe((resp:any)=>{
        if(resp) Swal.fire(resp.message)
      },(error)=>{
        console.log(error)
      })
    }else{
      Swal.fire("La nueva contraseña no coincide.")
    }
  }

  logedUserInfo(){
    this.usuariosService.logedUserInfo(this.token)
    .subscribe((resp:any)=>{
      this.usuarioInfo = resp.usuario_logeado[0];
    })
  }

}
