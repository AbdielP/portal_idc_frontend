import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-checkusuarios',
  templateUrl: './checkusuarios.component.html',
  styleUrls: ['./checkusuarios.component.css']
})
export class CheckusuariosComponent implements OnInit {

  token:any;
  usuarios:any = [''];

  @Input() titulo:string;
  @Input() no_results_txt:string;
  @Input() checked:number;
  @Input() activo:number;
  @Input() bloqueado:number;
  @Input() activo_txt:string;

  constructor(private usuariosService:UsuariosService,private _location:Location) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuariosService.listarUsuarios(this.token,this.activo,this.checked,this.bloqueado)
    .subscribe((resp:any)=>{
      this.usuarios = resp.usuarios;
    },(error)=>{
      console.log(error)
    })
  }

  volver(){
    this._location.back();
  }

}
