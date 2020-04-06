import { Component, OnInit } from '@angular/core';
import { CommentItem } from 'src/app/models/CommentItem.model';
import * as fromCommentActions from '../../store/actions/comment.actions'
import * as fromComment from '../../store/reducers/comment.reducer'
import { Observable } from 'rxjs';
import { PostItem } from 'src/app/models/PostItem.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';


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
    this.store.dispatch(new fromCommentActions.LoadCommentAction());
    this.commentItems$ = this.store.pipe(select(fromComment.getComments));
    this.subscribeToPostItems()
  }

  subscribeToPostItems() {
    this.commentItems$.subscribe(comments => {
      this.comments = comments.filter(comment => comment.postid == this.postid)
    })
  }
}
