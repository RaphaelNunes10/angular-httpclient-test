import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/data"
  }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.url)
  }

  postData(text: string): Observable<Data> {
    return this.http.post<Data>(this.url, { text: text })
  }

  patchData(id: string, data: object): Observable<Data> {
    return this.http.patch<Data>(`${this.url}/${id}`, data)
  }
}
