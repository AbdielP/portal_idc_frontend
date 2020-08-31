import { Component, OnInit } from '@angular/core';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-accesos-pendientes',
  templateUrl: './accesos-pendientes.component.html',
  styleUrls: ['./accesos-pendientes.component.css']
})
export class AccesosPendientesComponent implements OnInit {

  token:any;
  accesos:any = [''];

  constructor(private accesoService:AccesosService) { }

  ngOnInit() {
    this.getAccesosPendientes();
  }

  getAccesosPendientes(){
    this.accesoService.getAccesosPendientes()
    .subscribe((resp:any)=>{
      this.accesos = resp.results;
      // console.log(resp)
    }),(err)=>{
      console.log(err)
    }
  }

}
