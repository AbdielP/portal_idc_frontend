import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-tabla-matriz',
  templateUrl: './tabla-matriz.component.html',
  styleUrls: ['./tabla-matriz.component.css']
})
export class TablaMatrizComponent implements OnInit {
  
  formTable:FormGroup;

  eventsSubscription:Subscription;
  @Input() disable_checkbox; //Variable que indica si los checkbox son clickeables o no.
  @Input() events: Observable<any>;
  @Output() emitir_privilegios:EventEmitter<any> = new EventEmitter();
  privilegios: any = {};
  permisos:any = [];

  constructor() { }

  ngOnInit() {
    this.subscribeEventPermisos();
    this.formTable = new FormGroup({
      'solicitar_acceso': new FormControl({value:0,disabled:this.disable_checkbox}),
      'actualizar_acceso': new FormControl({value:0,disabled:this.disable_checkbox}),
      'eliminar_acceso': new FormControl({value:0,disabled:this.disable_checkbox}),
      'manos_remotas': new FormControl({value:0,disabled:this.disable_checkbox}),
      'alertas_baja': new FormControl({value:0,disabled:this.disable_checkbox}),
      'alertas_media': new FormControl({value:0,disabled:this.disable_checkbox}),
      'alertas_alta': new FormControl({value:0,disabled:this.disable_checkbox}),
      'editar_matriz': new FormControl({value:0,disabled:this.disable_checkbox})
    })
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  
  //Subscribe al Object/Observable del componente padre y obtiene los permisos del/los usuario/s (RECIBE <-)
  subscribeEventPermisos(){
    this.eventsSubscription = this.events
    .subscribe(({data}) => {
      this.permisos = data;
      this.populateTable(data)
    })
  }

  //Rellena el formTable con los values que le pasa el observable subscribeEventPermisos (LLENA LA TABLA DEL COMPOENETE)
  populateTable(permisos){
    var permiso = permisos[0]
    this.formTable.setValue({
      solicitar_acceso: permiso.solicitar_acceso,
      actualizar_acceso: permiso.actualizar_acceso,
      eliminar_acceso: permiso.eliminar_acceso,
      manos_remotas: permiso.manos_remotas,
      alertas_baja: permiso.alertas_baja,
      alertas_media: permiso.alertas_media,
      alertas_alta: permiso.alertas_alta,
      editar_matriz: permiso.editar_matriz
    });
  }
//Cuando se le da click a un checkbox, emite el valor del checkbox al componente padre (ENVÍA ->)
  onCheckChange(event:any){
    // console.log(event.target.checked)
    if(event.target.name === "editar_matriz" && event.target.checked === true){
      var confirmar = confirm(`Se le asignará privilegios a este usuario para editar, crear y añadir usuarios en la matriz de comunicación. ¿Está seguro?`)
      if(!confirmar){
        this.formTable.patchValue({editar_matriz: 0})
        // event.target.checked == false;
        return null;
      }
    }
    this.privilegios = {
      nombre: event.target.name,
      checked: event.target.checked
    }
    this.emitir_privilegios.emit(this.privilegios);
  }
}
