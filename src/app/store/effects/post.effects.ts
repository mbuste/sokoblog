import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { LoadPostAction, PostActionTypes, LoadpostSuccessAction, LoadpostFailureAction, AddItemAction, AddItemSuccessAction, AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction, LoadPostById, LoadPostByIdSuccess, LoadPostByIdFail, UpdatePost, UpdatePostFail } from '../actions/post.actions'
import { of } from 'rxjs';
import { PostService } from '../../services/post.service';
import { UpdateCommentSuccess } from '../actions/comment.actions';
import { PostItem } from 'src/app/models/PostItem.model';

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

  @Effect() editPostItem$ = this.actions$
    .pipe(
      ofType<UpdatePost>(PostActionTypes.UPDATE_POST),
      mergeMap(
        (data) => this.postService.updatePostItem(data.payload)
          .pipe(
            map((updatePost: PostItem) => new UpdateCommentSuccess({
              id: updatePost.id,
              changes: updatePost

            })),
            catchError(error => of(new UpdatePostFail(error)))
          )
      )
    )


  @Effect()
  loadPostById$ = this.actions$.pipe(
    ofType<LoadPostById>(
      PostActionTypes.LOAD_POST_BY_ID
    ),
    mergeMap((action: LoadPostById) =>
      this.postService.getPostById(action.payload).pipe(
        map(
          (data) =>
            new LoadPostByIdSuccess(data)
        ),
        catchError(err => of(new LoadPostByIdFail(err)))
      )
    )
  );

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