import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { LoadPostAction, PostActionTypes, LoadpostSuccessAction, LoadpostFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction } from '../actions/post.actions'
import { of } from 'rxjs';
import { PostService } from '../../services/post.service';

@Injectable()
export class PostEffects {

  @Effect() loadPost$ = this.actions$
    .pipe(
      ofType<LoadPostAction>(PostActionTypes.LOAD_POST),
      mergeMap(
        () => this.postService.getPostItems()
          .pipe(
            map(data => {
              return new LoadpostSuccessAction(data)
            }),
            catchError(error => of(new LoadpostFailureAction(error)))
          )
      ),
    )

  @Effect() addPostItem$ = this.actions$
    .pipe(
      ofType<AddItemAction>(PostActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this.postService.addPostItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
    )

  @Effect() deletePostItem$ = this.actions$
    .pipe(
      ofType<DeleteItemAction>(PostActionTypes.DELETE_ITEM),
      mergeMap(
        (data) => this.postService.deletePostItem(data.payload)
          .pipe(
            map(() => new DeleteItemSuccessAction(data.payload)),
            catchError(error => of(new DeleteItemFailureAction(error)))
          )
      )
    )


  constructor(
    private actions$: Actions,
    private postService: PostService
  ) { }
}