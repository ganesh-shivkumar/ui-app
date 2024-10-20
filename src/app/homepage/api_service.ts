import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(private _http: HttpClient) { }

    getdata(body: string) : Observable<string>{
      return this._http.post('http://127.0.0.1:5000/api/data', body , {responseType: 'text'});//,{ headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) , responseType: 'text'});
      }
      
}
  