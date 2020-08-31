import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
//Servicios
import { ProyectosService } from 'src/app/services/proyectos.service';
import { FechaService } from 'src/app/services/fecha.service';
import { RolesService } from 'src/app/services/roles.service';
import { MatrizService } from 'src/app/services/matriz.service';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {
  
  token:any;
  roles:any;
  clientes:any;
  proveedores:any;

  constructor(private formBuilder:FormBuilder,private proyectoService:ProyectosService,public fechaService:FechaService
    ,private rollService:RolesService, private matrizService:MatrizService) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getRoles();
  }

  get proyectos(){
    return this.registerForm.get('proyectos') as FormArray;
  }

  registerForm = this.formBuilder.group({
    username: ['',{validators: [Validators.required]}],
    password:[{value:"welcome",disabled: true}],
    nombre:['',{validators: [Validators.required]}],
    apellido:['',{validators: [Validators.required]}],
    cedula:[null],
    correo:['',{validators: [Validators.required]}],
    telefono:[''],
    celular:[''],
    rollId:['',{validators: [Validators.required]}],
    direccion:[''],
    cargo:[''],
    departamento:[''],
    createdAt: this.fechaService.getDate(),
    check_activo:[false],

    proyecto:['',{validators: [Validators.required]}],
    version:[this.fechaService.actualYear(),{validators: [Validators.required,Validators.min(2000),Validators.max(this.fechaService.actualYear()+1)]}],
    solicitar_acceso:[false],
    actualizar_acceso:[false],
    eliminar_acceso:[false],
    manos_remotas:[false],
    alertas_baja:[false],
    alertas_media:[false],
    alertas_alta:[false],
    editar_matriz:[false],
    proyectos: this.formBuilder.array([]), //FormArray
    link:['',{validators: [Validators.required]}]
  })

  onSubmit(){
    if(!this.registerForm.valid){
      alert("Fomulario no válido");
      return;
    }
    this.agregarUsuarioMatriz(this.token,this.registerForm.getRawValue());
    // console.log(this.registerForm);
  }

  onChange(event:any){
    if(event.target.value == 2 || event.target.value == 1) {
      this.getProyectos();
    }
    if(event.target.value == 3){
      this.getProveedores();
    }
  }

  agregarUsuarioMatriz(token:any,form:any){
    this.matrizService.agregarUsuarioMatriz(token,form)
    .subscribe((resp:any)=>{
      if(resp.ok){
        Swal.fire(resp.message)
      }
    },(error)=>{
      console.log(error)
    })
  }
  
  getProyectos(){
    this.proyectoService.listarProyectos(this.token)
    .subscribe((resp:any)=>{
      this.proveedores = [''];
      this.clientes = resp.results;
      // console.log(this.clientes)
    },(error)=>{
      console.log(error)
    });
  }

  getProveedores(){
    this.proyectoService.listarProveedores(this.token)
    .subscribe((resp:any)=>{
      this.clientes = [''];
      // console.log(resp.results[0])
      this.proveedores = resp.results;
    },(error)=>{
      console.log(error)
    });
  }

  getRoles(){
    this.rollService.listarRoles(this.token)
    .subscribe((resp:any)=>{
      this.roles = resp.roles;
    },(error)=>{
      console.log(error)
    });
  }

  //FUNCIONES FormArray ------------------------------>
  agregarTelefono(){
    const telefonoFormGroup = this.formBuilder.group({
      proyecto:['',{validators: [Validators.required]}],
      link:['',{validators: [Validators.required]}],
      version:[this.fechaService.actualYear(),{validators: [Validators.required,Validators.min(2000),Validators.max(this.fechaService.actualYear()+1)]}],
      solicitar_acceso:[false],
      actualizar_acceso:[false],
      eliminar_acceso:[false],
      manos_remotas:[false],
      alertas_baja:[false],
      alertas_media:[false],
      alertas_alta:[false],
      editar_matriz:[false]
    });
    this.proyectos.push(telefonoFormGroup);
  }

  removerTelefono(indice:number){
    this.proyectos.removeAt(indice);
  }
  
  // refrescar(){
  //   this.registerForm.patchValue({
  //     username: '',
  //     password : 'welcome'
  //   })
  //   this.proyectos.controls.splice(0,this.proyectos.length)
  // }
}
