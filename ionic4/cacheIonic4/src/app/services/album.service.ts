import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CacheService } from 'ionic-cache';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private cache: CacheService) { }

  getAlbums(): Observable<any> {
    let url = "https://jsonplaceholder.typicode.com/albums";
    let cacheKey = url;
    let request = this.http.get(url);
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getDetail(id): Observable<any> {
    let url = 'https://jsonplaceholder.typicode.com/albums/' + id;
    let cacheKey = url;
    let request = this.http.get(url);
    return this.cache.loadFromObservable(cacheKey, request);
  }
}