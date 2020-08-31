import { Component, OnInit } from '@angular/core';
import { MatrizService } from 'src/app/services/matriz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-matriz',
  templateUrl: './actualizar-matriz.component.html',
  styleUrls: ['./actualizar-matriz.component.css']
})
export class ActualizarMatrizComponent implements OnInit {

  token:any = localStorage.getItem('token');
  personal:Array<any> = [];
  proyecto:number;

  constructor(private activatedRoute:ActivatedRoute,private matrizService:MatrizService) {
    this.getPersoanlMatriz();
  }

  ngOnInit() {
    this.getParametros();
  }

  getParametros(){
    this.matrizService.listarUsuariosEntidad(this.proyecto,this.token)
    .subscribe((resp:any)=>{
      console.log(resp.results)
      this.personal = resp.results;
    })
  }

  getPersoanlMatriz(){
    this.activatedRoute.params.subscribe(params=>{
      this.proyecto = params.idproyecto;
    })
  }

}
