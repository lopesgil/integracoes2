import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiURL = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  createComment(form): Observable<any> {
    return this.http.post(this.apiURL + 'createComment', form);
  }

  showRepublicWithComments(id): Observable<any> {
    return this.http.get(this.apiURL + 'showRepublicWithComments/' + id);
  }

  updateComment(id, form): Observable<any> {
    return this.http.put(this.apiURL + 'updateComment/' + id, form);
  }

  deleteComment(id): Observable<any> {
    return this.http.delete(this.apiURL + 'deleteComment/' + id);
  }
}
