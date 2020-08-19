import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionInactivityService {

  userActivity:any;
  userInactive: Subject<any> = new Subject();

  constructor(private authService:AuthenticationService) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.callLogOut());
  }

  setTimeout() {
    // this.userActivity = setTimeout(() => this.userInactive.next(undefined), 600000);
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 28800000);
  }

  callLogOut(){
    // console.log('user has been inactive for 4s')
    this.authService.logOut();
  }

  resetActivity(){
    // console.log('Se mueve?')
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
