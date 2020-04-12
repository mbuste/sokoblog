import { Component, OnInit } from '@angular/core';
import { CommentItem } from 'src/app/models/CommentItem.model';
import * as fromCommentActions from '../../store/actions/comment.actions'
import * as fromComment from '../../store/reducers/comment.reducer'
import { Observable } from 'rxjs';
import { PostItem } from 'src/app/models/PostItem.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as frompost from '../../store/reducers/post.reducer'
import * as fromPostActions from '../../store/actions/post.actions'
import { v4 as uuid } from 'uuid';
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
  comments: any = []
  commentItems$: Observable<CommentItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  postItems$: Observable<PostItem[]>;
  editting: boolean = false;
  typedcomment = ""
  constructor(private route: ActivatedRoute, public auth: AuthService, private router: Router, private store: Store<fromComment.AppState>) { }

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

    this.store.dispatch(new fromPostActions.LoadPostById(this.postid))
    this.store.dispatch(new fromCommentActions.LoadCommentByPostAction(this.postid));
    
    this.subscribeToComments()
  }

  subscribeToComments() {
    this.commentItems$.subscribe(comments => {
      this.comments = comments
    })
  }

  writeComment() {
    this.editting = true;
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
}
