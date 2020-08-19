import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  menu:any;
  form:FormGroup;
  token:any;

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.menu = JSON.parse(localStorage.getItem('menu'))
    this.form = new FormGroup({
      'password': new FormControl('',[Validators.required, Validators.minLength(8)]),
      're_password': new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit(){
    // console.log(this.form)
    this.authService.firstPssword(this.form.value,this.token)
    .subscribe((resp:any)=>{
      // console.log(resp)
      if(resp.ok === true){
        Swal.fire(resp.message)
        // this.authService.guardarStorage(this.token,resp.findUser,this.menu); 
        this.router.navigate([`${(this.menu[0].url).toString()}`]);
      } 
    },(error)=>{
      console.log(error)
    })
  }

}
