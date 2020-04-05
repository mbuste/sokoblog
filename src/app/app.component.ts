import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { AppState } from './state/app-state.model';
import { PostItem } from './models/postItem.model';
import { AddItemAction, DeleteItemAction, LoadPostAction } from './store/actions/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  postItems: Observable<Array<PostItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>
  newPostItem: PostItem = { id: '', userid: '', title: '', body: '' }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.postItems = this.store.select(store => store.post.list);
    this.loading$ = this.store.select(store => store.post.loading);
    this.error$ = this.store.select(store => store.post.error);

    this.store.dispatch(new LoadPostAction());
    }
  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
  addItem() {
    this.newPostItem.id = uuid();
    this.newPostItem = { id: '', userid: '', title: '', body: '' };
    this.store.dispatch(new AddItemAction(this.newPostItem));

  }
}