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


@Component({
  selector: 'app-post-comment-list',
  templateUrl: './post-comment-list.component.html',
  styleUrls: ['./post-comment-list.component.scss']
})
export class PostCommentListComponent implements OnInit {

  postid;
  post$: Observable<PostItem>
  comments: any = []
  commentItems$: Observable<CommentItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  postItems$: Observable<PostItem[]>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromComment.AppState>) { }

  ngOnInit(): void {
    this.getIdFromRoute();
    this.fetchDetails()
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
    this.subscribeToPostItems()
  }

  subscribeToPostItems() {
    this.commentItems$.subscribe(comments => {
      this.comments = comments
    })
  }
}
