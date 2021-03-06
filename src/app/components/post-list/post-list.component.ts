import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../state/app-state.model';
import { PostItem } from '../../models/postItem.model';
import * as fromPostActions from '../../store/actions/post.actions';
import * as fromPostReducer from '../../store/reducers/post.reducer'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postItems$: Observable<Array<PostItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  user: any;

  constructor(private store: Store<AppState>, public auth: AuthService) { }

  ngOnInit() {
    this.postItems$ = this.store.pipe(select(fromPostReducer.getPosts));
    this.loading$ = this.store.pipe(select(fromPostReducer.getPostsLoading));
    this.error$ = this.store.pipe(select(fromPostReducer.getPostsError));
    this.store.dispatch(new fromPostActions.LoadPostAction());

  }

  deletePost(id) {
    if (confirm("Are You Sure You want to Delete the Post?")) {
      this.store.dispatch(new fromPostActions.DeleteItemAction(id))
    }
  }

  editPost(id) {
    this.store.dispatch(new fromPostActions.LoadPostById(id))
  }

}
