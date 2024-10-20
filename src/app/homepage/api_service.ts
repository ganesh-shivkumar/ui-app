import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(private _http: HttpClient) { }

    getdata() : Observable<string>{
        return this._http.get('http://127.0.0.1:5000/api/data', {responseType: 'text'});
      }
      
}
  