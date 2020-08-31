import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cuentasbloqueadas',
  templateUrl: './cuentasbloqueadas.component.html',
  styleUrls: ['./cuentasbloqueadas.component.css']
})
export class CuentasbloqueadasComponent implements OnInit {

  @Output() titulo:String = "Listado de personal bloqueado sin acceso al portal"
  @Output() no_results_txt:String = "No se han encontrado usuarios bloqueados"
  @Output() checked:number = null;
  @Output() activo:number = null;
  @Output() bloqueado:number = 1;
  @Output() activo_txt:String = ""

  constructor() { }

  ngOnInit() {
  }

}
