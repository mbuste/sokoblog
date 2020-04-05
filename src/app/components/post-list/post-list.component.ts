import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../state/app-state.model';
import { PostItem } from '../../models/postItem.model';
import * as fromPostActions from '../../store/actions/post.actions';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postItems: Observable<Array<PostItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  newPostItem: PostItem = { id: '', userid: '', title: '', body: '' }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.postItems = this.store.select(store => store.post.list);
    this.loading$ = this.store.select(store => store.post.loading);
    this.error$ = this.store.select(store => store.post.error);
    this.store.dispatch(new fromPostActions.LoadPostAction());
  }

}
