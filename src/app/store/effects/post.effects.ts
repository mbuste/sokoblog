import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { LoadPostAction, PostActionTypes, LoadpostSuccessAction, LoadpostFailureAction  } from '../actions/post.actions'
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

  constructor(
    private actions$: Actions,
    private postService: PostService
  ) { }
}