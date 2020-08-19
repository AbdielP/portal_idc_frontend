import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private authService:AuthenticationService,private router:Router) { 
  }

  ngOnInit() {
    // if(this.authService.isLogedIn()){
    //   this.router.navigate(['/home_staff'])
    // }
  }

}
