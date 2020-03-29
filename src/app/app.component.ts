import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './state/app-state.model';
import { PostItem } from './models/postItem.model';
import { LoadPostAction } from './store/actions/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  postItems: Observable<Array<PostItem>>;
  loading$: Observable<Boolean>;
  error$: Observable<Error>

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.postItems = this.store.select(store => store.post.list);
    this.loading$ = this.store.select(store => store.post.loading);
    this.error$ = this.store.select(store => store.post.error);

    this.store.dispatch(new LoadPostAction());

  }

}