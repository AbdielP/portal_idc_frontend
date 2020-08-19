import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cuentasactivas',
  templateUrl: './cuentasactivas.component.html',
  styleUrls: ['./cuentasactivas.component.css']
})
export class CuentasactivasComponent implements OnInit {

  @Output() titulo:String = "Listado de personal ACTIVO con acceso al portal"
  @Output() no_results_txt:String = "No se han encontrado usuarios activos"
  @Output() checked:number = null;
  @Output() activo:number = 1;
  @Output() bloqueado:number = 0;
  @Output() activo_txt:String = ""

  constructor() { }

  ngOnInit() {
  }

}
