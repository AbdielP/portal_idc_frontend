import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuario:any = [''];
  usuario_info:any = []

  form_info:FormGroup;
  form_activar:FormGroup;
  form_bloquear:FormGroup;
  token:any;

  constructor(private activatedRoute:ActivatedRoute, private usuarioService:UsuariosService) { 
    this.token = localStorage.getItem('token')
    this.getParameters();
  }

  ngOnInit() {
    this.form_info = new FormGroup({
      'password': new FormControl('',[Validators.required,Validators.minLength(8)])
    })
    this.form_activar = new FormGroup({
      'activo': new FormControl()
    })
    this.form_bloquear = new FormGroup({
      'bloqueada': new FormControl()
    })
    this.getUserInfo();
  }

  getParameters(){
    this.activatedRoute.params.subscribe(params=>{
      this.usuario = params;
    })
  }

  getUserInfo(){
    this.usuarioService.userInfo(this.usuario.idusuario,this.token)
    .subscribe((resp:any)=>{
      this.usuario_info = resp.user[0];
      this.form_activar.setValue({activo:this.usuario_info.activo})
      this.form_bloquear.setValue({bloqueada:this.usuario_info.bloqueada})
    },(error)=>{
      console.log(error)
    })
  }

  onSubmitPass(){
    var url = 'editar'
    this.usuarioService.editarUsuario(url,this.token,this.usuario.idusuario,this.form_info.value)
    .subscribe((resp:any)=>{
      Swal.fire(resp.message)
    },(error)=>{
      console.log(error)
    })
  }

  onSubmitActivar(){
    var url = 'activar'
    if(this.usuario_info.activo == 1){
      this.form_activar.setValue({
        activo:0
      })
    }
    if(this.usuario_info.activo == 0){
      this.form_activar.setValue({
        activo:1
      })
    }

    this.usuarioService.editarUsuario(url,this.token,this.usuario.idusuario,this.form_activar.getRawValue())
    .subscribe((resp:any)=>{
      this.getUserInfo();
      Swal.fire(resp.message)
    },(error)=>{
      console.log(error)
    })
  }
  onSubmitBloquear(){
    var url = 'bloquear'
    if(this.usuario_info.bloqueada == 1){
      this.form_bloquear.setValue({
        bloqueada:0
      })
    }
    if(this.usuario_info.bloqueada == 0){
      this.form_bloquear.setValue({
        bloqueada:1
      })
    }
    console.log(this.form_bloquear.getRawValue())

    this.usuarioService.editarUsuario(url,this.token,this.usuario.idusuario,this.form_bloquear.getRawValue())
    .subscribe((resp:any)=>{
      this.getUserInfo();
      Swal.fire(resp.message)
    },(error)=>{
      console.log(error)
    })
  }
}
