import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { City } from '../_models/City';
import { Hometown } from '../_models/Hometown';
import 'rxjs/add/operator/catch';

@Injectable()
export class GlobalService {
    baseUrl = environment.apiUrl;
    // cities : City[] = [];
    // hometowns: Hometown[] = [];

    constructor(private httpClient : HttpClient){
        // this.authHttp.get<City[]>(this.baseUrl + 'city').subscribe(cities => {
        //     this.cities = cities;
        //     console.log(this.cities);
        // });

        // this.authHttp.get<Hometown[]>(this.baseUrl + 'hometown').subscribe(hometowns => {
        //     this.hometowns = hometowns;
        // });
    }

    getCities(){
        return this.httpClient.get<City[]>(this.baseUrl + 'city');
    }

    getHometowns(){
        return this.httpClient.get<Hometown[]>(this.baseUrl + 'hometown');
    }

    getBlogCategories(){
        return ["日常", "ニュース", "グルメ", "国際恋愛", "仕事", "オピニオン"];
    }
}