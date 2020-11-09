import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { config } from 'src/assets/config/config';
import { SpacexDetails } from '../models/spaceX-model';


@Injectable({
    providedIn: 'root'
})

export class HomeService{
    constructor(private http: HttpClient){

    }
    private baseUrl = config.baseUrl;


    getLaunches(year: string, isLaunched: string, isLanded: string, limit: number) {
        let reqUrl = `${this.baseUrl}/launches?limit=${limit}`;
    
        if (year) {
          reqUrl = reqUrl + `&launch_year=${year}`;
        }
    
        if (isLaunched) {
          const launchStatus = isLaunched === 'Yes' ? true : false;
          reqUrl = reqUrl + `&launch_success=${launchStatus}`;
        }
    
        if (isLanded) {
          const landStatus = isLanded === 'Yes' ? true : false;
          reqUrl = reqUrl + `&land_success=${landStatus}`;
        }
        return this.http.get<SpacexDetails[]>(reqUrl);
      }
}