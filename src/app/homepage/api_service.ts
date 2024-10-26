import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


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
      
}
  