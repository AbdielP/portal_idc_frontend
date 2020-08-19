import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cuentasxactivar',
  templateUrl: './cuentasxactivar.component.html',
  styleUrls: ['./cuentasxactivar.component.css']
})
export class CuentasxactivarComponent implements OnInit {

  @Output() titulo:String = "Listado de personal por habilitar en la matriz de comunicación"
  @Output() no_results_txt:String = "No se han encontrado solicitudes pendientes por añadir a la matriz de comunicación "
  @Output() checked:number = 0;
  @Output() activo:number = 0;
  @Output() bloqueado:number = 0;
  @Output() activo_txt:String = "Añadir a la matriz"

  constructor() { }

  ngOnInit() {
  }

}
