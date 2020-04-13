import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { v4 as uuid } from 'uuid';

import { CommentItem } from 'src/app/models/CommentItem.model';
import { PostItem } from 'src/app/models/PostItem.model';

import * as fromCommentActions from '../../store/actions/comment.actions'
import * as fromComment from '../../store/reducers/comment.reducer'

import * as frompost from '../../store/reducers/post.reducer'
import * as fromPostActions from '../../store/actions/post.actions'
import * as fromUserActions from '../../store/actions/user.actions'
import * as fromUser from '../../store/reducers/user.reducer'
import { IUser } from '../../models/user.model'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-post-comment-list',
  templateUrl: './post-comment-list.component.html',
  styleUrls: ['./post-comment-list.component.scss']
})
export class PostCommentListComponent implements OnInit {
  
  commentemail: any
  postid;
  post$: Observable<PostItem>
  commentItems$: Observable<CommentItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  editting: boolean = false;
  typedcomment = ""
  userid: string;
  author$: Observable<IUser>;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private store: Store<fromComment.AppState>
  ) { }

  ngOnInit(): void {
    this.getIdFromRoute();
    this.fetchDetails()

    this.auth.user$.subscribe(user => {
      if (user) {
        this.commentemail = user.email
      } else {
        this.commentemail = "anonymous"
      }
    })
  }

  getIdFromRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'))
      this.postid = id;
      this.fetchDetails()
    });
  }

  fetchDetails() {
    this.loading$ = this.store.pipe(select(fromComment.getCommentsLoading));
    this.error$ = this.store.pipe(select(fromComment.getCommentsError));
    this.commentItems$ = this.store.pipe(select(fromComment.getComments));
    this.post$ = this.store.pipe(select(frompost.getCurrentPost))
    this.post$.subscribe(val => {
      if (val) {
        this.store.dispatch(new fromUserActions.LoadUserById(val.userId))
      }
    })

    this.store.dispatch(new fromPostActions.LoadPostById(this.postid))
    this.store.dispatch(new fromCommentActions.LoadCommentByPostAction(this.postid));
    this.author$ = this.store.pipe(select(fromUser.getCurrentUser))
  }

  addComment() {
    let newId = uuid()

    let newComment: CommentItem = {
      id: newId,
      name: 'comment ' + newId,
      email: this.commentemail,
      postid: this.postid,
      body: this.typedcomment
    }
    this.store.dispatch(new fromCommentActions.AddItemAction(newComment))
  }

  writeComment() {
    this.editting = true;
  }

}
