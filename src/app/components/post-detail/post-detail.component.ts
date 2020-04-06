import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostItem } from 'src/app/models/PostItem.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/comment.reducer';
import * as fromPostActions from 'src/app/store/actions/post.actions';
import * as fromPosts from '../../store/reducers/post.reducer'
import { CommentItem } from 'src/app/models/CommentItem.model';
import * as fromCommentActions from '../../store/actions/comment.actions'
import * as fromComment from '../../store/reducers/comment.reducer'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postid;
  post$: Observable<PostItem>
  posts: any = []
  commenntItems$: Observable<CommentItem[]>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  postItems$: Observable<PostItem[]>;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

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
    this.loading$ = this.store.pipe(select(fromPosts.getPostsLoading));
    this.error$ = this.store.pipe(select(fromPosts.getPostsError));
    this.store.dispatch(new fromPostActions.LoadPostAction());
    this.postItems$ = this.store.pipe(select(fromPosts.getPosts));
    this.subscribeToPostItems()
  }

  subscribeToPostItems() {
    this.postItems$.subscribe(posts => {
      this.posts = posts.find(post => post.id == this.postid)
    })
  }

  next() {
    let nextid = this.postid + 1;
    this.router.navigate(['/posts', nextid])
  }

  previous() {
    let previousid = this.postid - 1;
    this.router.navigate(['/posts', previousid])
  }

  backToList() {
    let selectedId = this.postid ? this.postid : null;
    this.router.navigate(['../', { id: selectedId }], { relativeTo: this.route })
  }

  viewComments() {
    this.router.navigate(['/posts', this.postid, "comments"])
  }
}
