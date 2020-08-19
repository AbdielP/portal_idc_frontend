import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }
  public getDate(){
    var hoy:any = new Date();
    var dd:any = hoy.getDate();
    var mm:any = hoy.getMonth() + 1; //Enero es 0!
    
    var yyyy = hoy.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    // hoy = `${dd}-${mm}-${yyyy}`;
    hoy = `${yyyy}-${mm}-${dd}`;
    return hoy;
  }

  public lastDayYear(){
    var hoy:any = new Date();
    var yyyy:any = hoy.getFullYear();
    var next_year = `${yyyy+1}-01-01`;
    return next_year;
    // console.log(`${yyyy+1}-01-01`)
  }

  public actualYear(){
    var hoy:any = new Date();
    var actual_year:any = hoy.getFullYear();
    return actual_year;
  }
}
