import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostItem } from '../models/postItem.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private POST_URL = "https://jsonplaceholder.typicode.com/posts"
  private POST_URL = "http://localhost:3000/post"

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

  updatePostItem(id: string, postItem: PostItem) {
    return this.http.put(`${this.POST_URL}/${id}`, postItem);
  }
}