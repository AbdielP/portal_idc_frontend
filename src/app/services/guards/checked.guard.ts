import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckedGuard implements CanActivateChild {
  
  constructor(public authService:AuthenticationService, private router:Router){}

  canActivateChild(){
    if(this.authService.isChecked()){
      // console.log('Usuario verificado')
      return true;
    }else{
      // console.log('Usuario no verificado')
      this.authService.limpiarStorage();
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
