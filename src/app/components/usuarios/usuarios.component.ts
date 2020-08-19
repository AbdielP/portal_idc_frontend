import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  count_activar:number;
  count_bloqueadas:number;
  count_activas:number;

  constructor(private usuarioService:UsuariosService) { 
  }

  ngOnInit() {
   this.countPorActivar();
   this.countBloqueadas();
   this.countActivas();
  }

  countPorActivar(){
    this.usuarioService.countPorActivar()
    .subscribe((resp:any)=>{
      this.count_activar = resp.results[0].activar;
    },(error)=>{
      console.log(error)
    })
  }

  countBloqueadas(){
    this.usuarioService.countBloqueadas()
    .subscribe((resp:any)=>{
      this.count_bloqueadas = resp.results[0].bloquedas;
    },(error)=>{
        console.log(error)
    })
  }

  countActivas(){
    this.usuarioService.countActivas()
    .subscribe((resp:any)=>{
      this.count_activas = resp.results[0].activas;
      // console.log(resp.results[0].activas)
    },(error)=>{
        console.log(error)
    })
  }

}