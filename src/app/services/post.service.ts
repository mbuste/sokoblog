import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostItem } from '../models/postItem.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private POST_URL = "https://jsonplaceholder.typicode.com/posts"
  // private POST_URL = "http://localhost:3000/post"

  constructor(private http: HttpClient) { }

  getPostItems() {
    return this.http.get<Array<PostItem>>(this.POST_URL)
  }

  addPostItem(postItem: PostItem) {
    return this.http.post(this.POST_URL, postItem)
  }

  deletePostItem(id: string) {
    return this.http.delete(`${this.POST_URL}/${id}`)
  }


  getPostById(payload: string):Observable<PostItem> {
    return this.http.get<PostItem>(`${this.POST_URL}/${payload}`);
  }

  updatePostItem(postItem: PostItem) {
    return this.http.patch(`${this.POST_URL}/${postItem.id}`, postItem);
  }

}