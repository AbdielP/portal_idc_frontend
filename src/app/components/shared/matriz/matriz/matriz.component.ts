import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FechaService } from 'src/app/services/fecha.service';
import { MatrizService } from 'src/app/services/matriz.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-matriz',
  providers:[DatePipe],
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent implements OnInit {

  token:any;
  anio_actual:any;
  proyecto:any;
  usuario_logeado:any;
  nombre_empresa:any = [];
  versiones_matriz:any = [];
  
  usuarios:any;
  editar_matriz:any;
  permisos_usuarios:any = [];

  eventsSubscription: Subscription;
  @Input() events: Observable<any>;

  constructor(private fechaService:FechaService,public datePide:DatePipe, private matrizService:MatrizService) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.subscribeEventProyecto();
  }

  subscribeEventProyecto(){
    this.eventsSubscription = this.events
    .subscribe(({data}) => {
      this.proyecto = data;
      //AQUÍ SE LLAMAN LOS PERMISOS DEL PERSONAL DE LA MATRIZ Y LAS VERSIONES DISPONIBLES
      this.getVersionesMatriz(this.proyecto,this.token);
      this.getPersonalMatriz(this.proyecto);
    })
  }

  //Lista las personas de la matriz de comunicación de una empresa (SELECCIONANDO EL CLIENTE DESDE EL FIELD SELECT )
  private getPersonalMatriz(proyecto){
    this.matrizService.listarUsuariosEntidad(proyecto,this.token)
    .subscribe((resp:any)=>{
      if(resp.results == 0){
        // console.log(resp)
        this.nombre_empresa = [];
        this.usuarios = [];
      }else{
        // console.log(resp)
        this.nombre_empresa = resp.results[0].nombre_empresa;
        this.usuarios = resp.results;
      }
      
    },(error)=>{
      console.log(error)
    })
  }

  private getVersionesMatriz(proyecto,token){
    this.matrizService.listarVersionesMatriz(proyecto,token)
    .subscribe((resp:any)=>{
      this.versiones_matriz = resp.results;
    },(error)=>{
      console.log(error)
    })
  }
  //Al escoger la 'fecha matriz' en el field select, busca la matriz correspondiente.
  private listarMatrizSegunFecha(fecha){
    this.matrizService.listarUsuariosVersionEntidad(this.proyecto,fecha,this.token)
    .subscribe((resp:any)=>{
      this.usuarios = resp.results;
    },(error)=>{
      console.log(error)
    })
  }

  //Obtiene el año/versión de la matriz a mostrar (Botón versión matriz)
  getVersion(event){
    this.listarMatrizSegunFecha(this.datePide.transform(event.target.value,'yyyy-MM-dd'));
  }

  //Obtiene el roll de editar matriz del usuario logeado, tomando en cuenta el proyecto y versión. (USANDO SOLO EL TOKEN)
  // private getRolesUsuarioLogeado(idproyecto:number,token:any){
  //   console.log(idproyecto,token)
  //   this.matrizService.verifyRollEditMatriz(this.token)
  //   .subscribe((resp:any)=>{
  //     console.log(resp)
  //     this.usuario_logeado = resp.results[0];
  //   },(error)=>{
  //     console.log(error)
  //   })
  // }

  redirect(url:string){
    window.open(url, "_blank");
  }
}
