import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }

  getDetail(id): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/albums/' + id);
  }
}
