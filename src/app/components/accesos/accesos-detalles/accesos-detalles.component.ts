import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import html2canvas from 'html2canvas';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-accesos-detalles',
  templateUrl: './accesos-detalles.component.html',
  styleUrls: ['./accesos-detalles.component.css']
})
export class AccesosDetallesComponent implements OnInit {

  @ViewChild('screen',{static:false}) screenx: ElementRef;
  @ViewChild('canvas',{static:false}) canvasx: ElementRef;
  @ViewChild('downloadLink',{static:false}) downloadLinkx: ElementRef;

  idseguridad:number = null;
  cedula_visitante:string = "";
  compania_visitante:string = "";

  token:any = "";
  detalles_acceso:any = "";
  qrcode:any = "";

  constructor(private activatedRoute:ActivatedRoute,private accesoService:AccesosService,private _location: Location) {
    this.getParams();
    this.token = localStorage.getItem('token');
   }

  ngOnInit() {
    this.getAccesosDetail();
  }

  getParams(){
    this.activatedRoute.params.subscribe(params=>{
      this.idseguridad = params.idseguridad;
      this.cedula_visitante = params.cedula_visitante;
      this.compania_visitante = params.compania_visitante;
    })
  }

  getAccesosDetail(){
    this.accesoService.getAccesDetails(this.idseguridad,this.cedula_visitante,this.compania_visitante,this.token)
    .subscribe((resp:any)=>{
      if(resp.ok){
        this.detalles_acceso = resp.results[0];
        // console.log(this.detalles_acceso)
        this.qrcode = resp.url;
      }
    },(error)=>{
      console.log(error)
    })
  }

  volver(){
    this._location.back();
  }

  downLoadImage(){
    html2canvas(this.screenx.nativeElement).then(canvas =>{
      this.canvasx.nativeElement.src = canvas.toDataURL();
      this.downloadLinkx.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLinkx.nativeElement.download = 'QR.png';
      this.downloadLinkx.nativeElement.click();
    })
  }

}
