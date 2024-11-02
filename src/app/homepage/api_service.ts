import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ApiService {

    constructor(private _http: HttpClient) { }

    getData(body: string) {
      return this._http.post('http://127.0.0.1:5000/api/data', body);
    }

    trainData() {
      return this._http.get('http://127.0.0.1:5000/api/train');
    }

    getLatestTunedModel() {
      return this._http.get('http://127.0.0.1:5000/api/tunedmodels/latest');
    }

    callGemini(body: string) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      return this._http.post('http://127.0.0.1:5000/api/chat', body, {headers : headers});
    }
      
    login(body: string) {
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      return this._http.post('http://127.0.0.1:5000/api/user/login', body, {headers : headers});
    }
}
  