import { Component, OnInit } from '@angular/core';;
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//Servicios
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  year:number = new Date().getFullYear();
  redirect_url:any = [];

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
  }
  
  onSubmit(form:NgForm){
    if(form.invalid) return;
    this.authService.login(form).subscribe((resp=>{
      if(resp.ok){
        this.redirect_url = resp.menu[0].url;
        this.router.navigate([`${this.redirect_url}`]);
      }
    })),(err)=>{
      console.log('VER LOGIN.COMPONENT.TS ',err.error.error.message);
    }
  }
}
