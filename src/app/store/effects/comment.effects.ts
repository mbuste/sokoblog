import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
    LoadCommentAction, CommentActionTypes, LoadcommentSuccessAction,
    LoadcommentFailureAction, AddItemAction, AddItemSuccessAction,
    AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction,
    DeleteItemFailureAction, UpdateComment, UpdateCommentSuccess,
    UpdateCommentFail,
    LoadCommentByPostAction,
    LoadcommentByPostSuccess,
    LoadCommentByPostFail
} from '../actions/comment.actions'
import { of } from 'rxjs';
import { CommentsService } from '../../services/comments.service';
import { CommentItem } from 'src/app/models/CommentItem.model';

@Injectable()
export class CommentEffects {

    @Effect() loadComment$ = this.actions$
        .pipe(
            ofType<LoadCommentAction>(CommentActionTypes.LOAD_COMMENT),
            mergeMap(
                () => this.commentService.getCommentItems()
                    .pipe(
                        map(data => {
                            return new LoadcommentSuccessAction(data)
                        }),
                        catchError(error => of(new LoadcommentFailureAction(error)))
                    )
            ),
        )

        
    @Effect()
    loadCommentByPost$ = this.actions$.pipe(
      ofType<LoadCommentByPostAction>(
        CommentActionTypes.LOAD_COMMENT_BY_POST
      ),
      mergeMap((action: LoadCommentByPostAction) =>
        this.commentService.getCommentsByPost(action.payload).pipe(
          map(
            (data) =>
              new LoadcommentByPostSuccess(data)
          ),
          catchError(err => of(new LoadCommentByPostFail(err)))
        )
      )
    );

    @Effect() addCommentItem$ = this.actions$
        .pipe(
            ofType<AddItemAction>(CommentActionTypes.ADD_ITEM),
            mergeMap(
                (data) => this.commentService.addCommentItem(data.payload)
                    .pipe(
                        map(() => new AddItemSuccessAction(data.payload)),
                        catchError(error => of(new AddItemFailureAction(error)))
                    )
            )
        )


    @Effect() editCommentItem$ = this.actions$
        .pipe(
            ofType<UpdateComment>(CommentActionTypes.UPDATE_COMMENT),
            mergeMap(
                (data) => this.commentService.updateCommentItem(data.payload)
                    .pipe(
                        map((updateComment: CommentItem) => new UpdateCommentSuccess({
                            id: updateComment.id,
                            changes: updateComment

                        })),
                        catchError(error => of(new UpdateCommentFail(error)))
                    )
            )
        )

    @Effect() deleteCommentItem$ = this.actions$
        .pipe(
            ofType<DeleteItemAction>(CommentActionTypes.DELETE_ITEM),
            mergeMap(
                (data) => this.commentService.deleteCommentItem(data.payload)
                    .pipe(
                        map(() => new DeleteItemSuccessAction(data.payload)),
                        catchError(error => of(new DeleteItemFailureAction(error)))
                    )
            )
        )


    constructor(
        private actions$: Actions,
        private commentService: CommentsService
    ) { }
}