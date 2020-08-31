import { Component, OnInit, Output } from '@angular/core';
import {Location, DatePipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatrizService } from 'src/app/services/matriz.service';
import { FechaService } from 'src/app/services/fecha.service';

@Component({
  selector: 'app-editarmatriz',
  providers:[DatePipe],
  templateUrl: './editarmatriz.component.html',
  styleUrls: ['./editarmatriz.component.css']
})
export class EditarmatrizComponent implements OnInit {
  
  token:any;
  version_matriz:any;
  renovar:boolean = false;
  mostrar_form_matriz:boolean = false;
  idproyecto:number;
  idusuario:number;
  
  actual_year:number;
  esta_matriz:any = [''];

  eventsSubject:Subject<any> = new Subject<any>();
  @Output() disable_checkbox = false;

  constructor(private activatedRoute:ActivatedRoute,private matrizService:MatrizService, private _location:Location, private fechaService:FechaService
    ,private formBuilder:FormBuilder, private datePipe:DatePipe) { 
    this.token = localStorage.getItem('token');
    this.activaredRouteGetParametros();
    this.actual_year = this.fechaService.actualYear();
  }

  ngOnInit() {
    this.litarDatosMatrizEditar(this.version_matriz,this.idproyecto,this.idusuario,this.token);
    this.evaluarRenovacion(this.version_matriz,this.actual_year);
  }

  actualizarMatrizForm = this.formBuilder.group({
    nombre:[''],
    solicitar_acceso:[false],
    actualizar_acceso:[false],
    eliminar_acceso:[false],
    manos_remotas:[false],
    alertas_baja:[false],
    alertas_media:[false],
    alertas_alta:[false],
    editar_matriz:[false],
    version:[this.fechaService.actualYear()+1],
    link:['',{validators: [Validators.required]}],
    createdAt:[this.fechaService.getDate()]
  })

  evaluarRenovacion(version:number,actual_year:number){
    if(actual_year == version) this.renovar = true;
  }
  //Obtener params del URL
  activaredRouteGetParametros(){
    this.activatedRoute.params.subscribe(params=>{
      this.version_matriz = this.datePipe.transform(params.version,'yyyy-MM-dd');
      this.idproyecto = params.idproyecto;
      this.idusuario = params.idusuario;
    })
  }
  //Obtener info de esta matriz a EDITAR (INNER JOIN DE 3 TABLAS)
  litarDatosMatrizEditar(version:any,idproyecto:number,idusuario:number,token:any){
    this.matrizService.listarEditarMatriz(version,idproyecto,idusuario,token)
    .subscribe((resp:any)=>[
        this.esta_matriz = resp.results[0],
        this.emitEventToChild(resp.results)
    ])
  }

  emitEventToChild(data) {
    this.eventsSubject.next({data});
  }

  //Recibe los datos emitidos de los campos/permisos editados desde el componente "tabla-matriz" (ENVÍA AL SERVICIO ->)
  recibirPrivilegiosActualizados(e:any){
    this.matrizService.actualizarPrivilegioMatriz(e,this.version_matriz,this.idproyecto,this.idusuario,this.token)
    .subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire(resp.message)
      }
    },(error)=>{
      console.log(error)
    })
  }
  //Renovar matriz
  mostrarFormularioRenovar(){
    this.mostrar_form_matriz = true;
    this.matrizService.listarEditarMatriz(this.version_matriz,this.idproyecto,this.idusuario,this.token)
    .subscribe((resp:any)=>[
        this.esta_matriz = resp.results[0],
        this.actualizarMatrizForm.patchValue({
          nombre: this.esta_matriz.nombre,
          solicitar_acceso: this.esta_matriz.solicitar_acceso,
          actualizar_acceso: this.esta_matriz.actualizar_acceso,
          eliminar_acceso: this.esta_matriz.eliminar_acceso,
          manos_remotas: this.esta_matriz.manos_remotas,
          alertas_baja: this.esta_matriz.alertas_baja,
          alertas_media: this.esta_matriz.alertas_media,
          alertas_alta: this.esta_matriz.alertas_alta,
          editar_matriz: this.esta_matriz.editar_matriz,
        })
    ])
  }

  onSubmitRenovarMatriz(){
  //Submit form renovar
    console.log(this.actualizarMatrizForm.getRawValue());
    this.matrizService.renovarVersionMatriz(this.actualizarMatrizForm.getRawValue(),this.version_matriz,this.idproyecto,this.idusuario,this.token)
    .subscribe((resp:any)=>{
      console.log(resp)
      Swal.fire(resp.message)
    },(error)=>{
      console.log(error)
    })
  }

  volver(){
    this._location.back();
  }

}
