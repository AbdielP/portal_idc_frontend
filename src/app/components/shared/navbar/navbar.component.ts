import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menu:any[] = [];

  constructor(public authService:AuthenticationService) { 
    this.menu = this.authService.menu;
  }

  ngOnInit() {
  }

}
