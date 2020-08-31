import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-escoger-proyecto',
  templateUrl: './escoger-proyecto.component.html',
  styleUrls: ['./escoger-proyecto.component.css']
})
export class EscogerProyectoComponent implements OnInit {

  token:any;
  proyectos:any = [];
  @Output() emitirProyecto: EventEmitter<String> = new EventEmitter<string>();

  constructor(private proyectoService:ProyectosService) { 
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

  //Emitir HIJO-PADRE (matriz.component.ts)
  getProyecto(event){
    this.emitirProyecto.emit(event.target.value)
  }

}
