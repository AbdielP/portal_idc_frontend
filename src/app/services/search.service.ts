import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient:HttpClient) { }

  hints(hints:any){
    // console.log(hints)
    return this.httpClient.get(`${this.SERVER_URL}/hints/${hints}`)
    .pipe((catchError(err=>[
      console.log(err)
    ])))
  }
}
