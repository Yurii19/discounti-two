import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITag } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor( private http: HttpClient ) { }

  getTags() {
    return this.http.get<ITag[]>(`${API_URL}/tags`);
  };

  createTag(tag:{name: string}): any {//Observable<string> { 
      return this.http.post<string>(`${API_URL}/tags`, tag, httpOptions)
  };
}

