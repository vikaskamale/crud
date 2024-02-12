import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http:HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id:number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post:Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post:Post):Observable<Post>{
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
