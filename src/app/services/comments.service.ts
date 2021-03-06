import { Injectable } from '@angular/core';
import { CommentItem } from '../models/commentItem.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  uri = "https://jsonplaceholder.typicode.com/comments"
  post_comment_uri = "https://jsonplaceholder.typicode.com/posts"
  // post_comment_uri = "http://localhost:3000/post"
  // uri="http://localhost:3000/comments"
  constructor(private http: HttpClient) { }


  getCommentItems() {
    return this.http.get<Array<CommentItem>>(this.uri)
  }

  addCommentItem(commentItem: CommentItem) {
    return this.http.post(this.uri, commentItem)
  }

  deleteCommentItem(id: string) {
    return this.http.delete(`${this.uri}/${id}`)
  }

  updateCommentItem(commentItem: CommentItem) {
    return this.http.put(`${this.uri}/${commentItem.id}`, commentItem);
  }

  getCommentsByPost(id: string) {
    return this.http.get<Array<CommentItem>>(`${this.post_comment_uri}/${id}/comments`)
  }
}
