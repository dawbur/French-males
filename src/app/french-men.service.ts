import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrenchMenService {

  constructor(private http: HttpClient) { }

  getFrenchMales(): Observable<Array<any>> {
    return this.http.get<any>('https://randomuser.me/api/?nat=fr&gender=male&results=1000&inc=name,gender,nat,phone,picture,dob')
      .pipe(
        map(response => response.results)
      );
  }
}
