import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-accesos-aprobados',
  templateUrl: './accesos-aprobados.component.html',
  styleUrls: ['./accesos-aprobados.component.css']
})
export class AccesosAprobadosComponent implements OnInit {

  accesos:any = [''];
  proyectos:any = [''];
  filterPost:any = "";

  token:any;

  constructor(private proyectoService:ProyectosService, private accesoService:AccesosService) { 
    this.token = localStorage.getItem('token');
    this.listarProyectos();
  }

  ngOnInit() {
  }

  listarProyectos(){
    this.proyectoService.listarProyectos(this.token)
    .subscribe((resp:any)=>{
      this.proyectos = resp.results;
    }),(err)=>{
      console.log(err)
    }
  }
 
  listarAccesos(entidad){
    this.accesoService.getAccesos(entidad,this.token)
    .subscribe((resp:any)=>{
      this.accesos = resp.accesos;
    }),(err)=>{
      console.log(err)
    }
  }

  getEntidad(event:any){
    // console.log(event.target.value)
    this.listarAccesos(event.target.value);
  }

}
