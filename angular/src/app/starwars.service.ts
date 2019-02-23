import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StarWarsService {
  constructor(private http: HttpClient) {}

  getPeople(input: string) {
    return this.http.get<any>(`/API/v1/star-wars/?search=${input}`);
  }
}
