import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planet, Vehicle } from '../model/app-model';

import { catchError } from 'rxjs/operators'; 

@Injectable()
export class SharedService {


    /**
     * shared varible between components
     * @type {*}
     * @memberof SharedService
     */
    public commonStorage : any;
    
    /**
     * Behaviour subject to detect changes
     * @type {*}
     * @memberof SharedService
     */
    private _resetClicked = new BehaviorSubject({isReset : false});


    public constructor(private _httpClient: HttpClient) {}

    /**
     * Setting the behaviour subject
     * @type {*}
     * @memberof SharedService
     */
    public setReset(reset : boolean) : void {

        this._resetClicked.next({isReset : reset});
    }

    /**
     * get method of the behaviour subject
     * @type {*}
     * @memberof SharedService
     */
    public getReset() : Observable<any> {

        return this._resetClicked.asObservable();
    }

    /**
     * Get Planet list using API
     * @type {*}
     * @memberof SharedService
     */
    public getPlanetList() : Observable<any> {

        let apiUrl = 'https://findfalcone.herokuapp.com/planets';
        return this._httpClient.get<Planet[]>(apiUrl);
    }

    /**
     * Get Vehcile list using API
     * @type {*}
     * @memberof SharedService
     */
    public getVechileList() : Observable<any> {

        let apiUrl = 'https://findfalcone.herokuapp.com/vehicles';
        return this._httpClient.get<Vehicle[]>(apiUrl);
    }

    /**
     * Get token using API
     * @type {*}
     * @memberof SharedService
     */
    public getToken() : Observable<any> {

        let apiUrl = 'https://findfalcone.herokuapp.com/token';

        let headers = new HttpHeaders({
             'Accept'  : 'application/json'
            })

        let options = { headers: headers };

        return this._httpClient.post(apiUrl,'', options);
    }

    /**
     * Get Find falcone status using API
     * @type {*}
     * @memberof SharedService
     */
    public find(token, planets, vechiles) : any {

        let apiUrl = 'https://findfalcone.herokuapp.com/find';

        let headers = new HttpHeaders({
            'Accept'  : 'application/json',
            'Content-Type' : 'application/json'
           })

       let options = { headers: headers };

        let body = {
            token : token,
            planet_names : planets,
            vehicle_names : vechiles
        }
        
       return this._httpClient.post(apiUrl,body,options);
    }
}