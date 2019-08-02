import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planet, Vehicle } from '../model/app-model';

@Injectable()
export class SharedService {

    public commonStorage : any;

    private _resetClicked = new BehaviorSubject({isReset : false});

    public constructor(private _httpClient: HttpClient) {}

    public setReset(reset : boolean) : void {

        this._resetClicked.next({isReset : reset});
    }

    public getReset() : Observable<any> {

        return this._resetClicked.asObservable();
    }

    public getPlanetList() : Observable<any> {

        let apiUrl = 'https://findfalcone.herokuapp.com/planets';
        return this._httpClient.get<Planet[]>(apiUrl);
    }

    public getVechileList() : Observable<any> {

        let apiUrl = 'https://findfalcone.herokuapp.com/vehicles';
        return this._httpClient.get<Vehicle[]>(apiUrl);
    }

    // public getToken() : Observable<any> {

    //     let apiUrl = 'https://findfalcone.herokuapp.com/token';
    //         headers: new HttpHeaders({
    //          'Accept'  : 'application/json'
    //         })
    //     return this._httpClient.post(apiUrl,headers);
    // }
}