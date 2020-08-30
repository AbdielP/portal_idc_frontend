import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AccesosService } from 'src/app/services/accesos.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-acesos-solicitar',
  templateUrl: './acesos-solicitar.component.html',
  styleUrls: ['./acesos-solicitar.component.css']
})
export class AcesosSolicitarComponent implements OnInit {

  form:FormGroup;
  proyecto:number;
  companias:any;
  tipo_visitante:Array<string> = [`Empleado de EMPRESA`,`Proveedor`,`Auditor`,`Visitante`,`Otro`];
  token:any;

  solicitantes:Array<any> = [];
  hints:Array<any> = [];
  hint:any = '';
  solicitante:any;
  datacenters:any = [''];

  constructor(private accesoService:AccesosService,private proyectoService:ProyectosService, public searchService:SearchService) { 
    this.token = localStorage.getItem('token');
  }

  form_select = new FormGroup({
    'escoger_solicitante': new FormControl({value:"",disabled:true}),
  })

  ngOnInit() {
    this.getDatacenters();
    this.getProyectos();
    this.form = new FormGroup({
      // 'solicitante': new FormControl({value:"",disabled:false}, [Validators.required]),
      'solicitante': new FormControl("",Validators.required),
      'numero_empleado': new FormControl({value:"",disabled:false}),
      'direccion': new FormControl({value:"",disabled:false}),
      'telefono': new FormControl({value:"",disabled:false}),
      'cargo': new FormControl({value:"",disabled:false}),
      'departamento': new FormControl({value:"",disabled:false}),
      'compania_visitante': new FormControl({value:"",disabled:false},[Validators.required]),
      
      'nombre_visitante': new FormControl("", [Validators.required]),
      // 'nombre_visitante': new FormControl("", Validators.compose([Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9  !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€£¥₩])(?=.*?[A-Z 0-9]).{8,}$"), Validators.required])),
      'cedula_visitante': new FormControl("",Validators.required),
      'fecha_solicitud': new FormControl("",Validators.required),
      'fecha_expiracion': new FormControl("",[Validators.required]),
      'empleado_visitante': new FormControl("",Validators.required),
      'vicepresidencia_ejecutiva': new FormControl(""),
      'tipo_visitante': new FormControl(""),
      'motivo_solicitud': new FormControl(""),
      'link_formulario':new FormControl(""),
      'notas': new FormControl(`El personal listado es [EMPLEADO/PROVEEDOR] de nuestra empresa y debe ingresar [SOLO/ESCOLTADO] a la infraestructura del proyecto para realizar [TAREA DEL VISITANTE].
¿Se requiere asistencia del personal del IDC? [Si/NO - Motivo]. Adicional se requiere el ingreso de auto a zona de carga: Marca, Modelo, Color y Placa,  conducido por: [Nombre y ID del conductor].
Datos adicionales.`,Validators.required),
      //FUERA DEL FORMULARIO
      // 'usuario_solicitante': new FormControl({value:this.usuario})
    })
  }

  getEmitedProyecto(event){
    this.proyecto = event;
    this.getDatosSolicitante(this.proyecto,this.token);
  }

  getDatosSolicitante(proyecto:number,token:any){
    this.form_select.controls['escoger_solicitante'].enable();
    this.accesoService.getDatosSolicitante(proyecto,token)
    .subscribe((resp:any)=>{
      // console.log(resp)
      this.solicitantes = resp.results;
    },(error)=>{
      console.log(error)
    })
  }
  //Obtiene el solicitante del select 'datos del cliente'
  getSolicitante(event){
    this.limpiarDatosSolicitante();
    this.solicitante = this.solicitantes.find(sol => sol.idusuario == event.target.value);
    this.form.patchValue({
      solicitante:`${this.solicitante.nombre}`,
      numero_empleado:`${this.solicitante.cedula}`,
      telefono:`${this.solicitante.celular}`,
      cargo:`${this.solicitante.cargo}`,
      departamento:`${this.solicitante.departamento}`,
      compania_visitante: `${this.solicitante.nombre_empresa}`,
    })
    this.form.controls['solicitante'].enable()
    this.form.controls['numero_empleado'].enable()
    this.form.controls['direccion'].enable()
    this.form.controls['telefono'].enable()
    this.form.controls['cargo'].enable()
    this.form.controls['departamento'].enable()
    this.form.controls['compania_visitante'].enable()
  }

  onSubmit(){
    // console.log(this.form.getRawValue())
    if(this.form.valid === false){
      return Swal.fire('formulario no valido. verifique que ha llenado todos los campos.');
    }else{
      this.accesoService.solicitarAcceso(this.token,this.form.getRawValue())
      .subscribe((resp:any)=>{
        if(resp.ok){
          Swal.fire(resp.message)
        }
      })
    }
  }
  //Busca en la BD los hints 
  onChangeHints(event){
    if(event.length > 4) {
      this.searchService.hints(event)
      .subscribe((resp:any)=>{
        // console.log(resp.hints)
        this.hints = resp.hints;
      },(error)=>{
        console.log(error)
      })
    }else{
      this.hints = []
    }
  }
  //Obtiene los datos de la tarjeta al clickearla
  getHintID(id:number){
    this.hint = this.hints.find(ids => ids.idseguridad == id)
    this.form.patchValue({
      nombre_visitante:`${this.hint.nombre_visitante}`,
      cedula_visitante:`${this.hint.cedula_visitante}`,
      vicepresidencia_ejecutiva:`${this.hint.viceprecidencia_ejecutiva}`,
      empleado_visitante:`${this.hint.empleado_visitante}`
    })
  }
  //Para el SELECT de los Datos del Solicitante
  getProyectos(){
    this.proyectoService.listarProyectos(this.token)
    .subscribe((resp:any)=>{
      this.companias = resp.results;
    })
  }

  getDatacenters(){
    this.proyectoService.listarIDCS(this.token)
    .subscribe((resp:any)=>{
      this.datacenters = resp.results;
    },(error)=>{
      console.log(error)
    })
  }

  limpiarDatosSolicitante(){
    this.form.patchValue({
      solicitante:``,
      numero_empleado:``,
      telefono:``,
      cargo:``,
      departamento:``,
      compania_visitante: ``,
    })
  }

}
