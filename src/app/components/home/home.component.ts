import { Component, OnInit } from '@angular/core';
import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { SesionInactivityService } from 'src/app/services/sesion-inactivity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userActivity:any;
  userInactive: Subject<any> = new Subject();

  constructor(private sessionInactivity:SesionInactivityService) { 
  }

  ngOnInit() {}

  @HostListener('window:mousemove') refreshUserState() {
    this.sessionInactivity.resetActivity();
  }

}
