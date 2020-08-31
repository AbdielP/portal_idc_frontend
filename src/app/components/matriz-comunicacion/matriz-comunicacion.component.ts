import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-matriz-comunicacion',
  templateUrl: './matriz-comunicacion.component.html',
  styleUrls: ['./matriz-comunicacion.component.css']
})
export class MatrizComunicacionComponent implements OnInit {

  proyecto:string = "-";
  eventsSubject: Subject<any> = new Subject<any>();

  constructor() {}

  ngOnInit() {
  }

  getEmitedProyecto(event){
    this.proyecto = event;
    this.emitEventToChild(this.proyecto);
  }

  emitEventToChild(data) {
    // console.log(data)
    this.eventsSubject.next({data});
  }

}
