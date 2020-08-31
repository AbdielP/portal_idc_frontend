import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormulariosService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  token:any;
  constructor(private activatedRoute:ActivatedRoute,private formService:FormulariosService,
    private location:Location) { 
      this.token = localStorage.getItem('token');
      this.activatedRoute.params.subscribe(params =>{
        // console.log(params.form)
        this.formService.download(params.form,params.ext,this.token);
        this.location.back();
      })
    }

  ngOnInit() {
  }

}
