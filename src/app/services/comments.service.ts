import { Injectable } from '@angular/core';
import { CommentItem } from '../models/commentItem.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  uri="http://localhost:3000/comments"
  constructor(private http: HttpClient) { }

  
  getCommentItems() {
    return this.http.get<Array<CommentItem>>(this.uri)
  }

  addCommentItem(postItem: CommentItem) {
    return this.http.post(this.uri, postItem)
  }

  deleteCommentItem(id: string) {
    return this.http.delete(`${this.uri}/${id}`)
  }

  updateCommentItem( postItem: CommentItem) {
    return this.http.put(`${this.uri}/${postItem.id}`, postItem);
  }
}
