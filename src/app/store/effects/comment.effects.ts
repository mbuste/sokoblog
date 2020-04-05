import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
    LoadCommentAction, CommentActionTypes, LoadcommentSuccessAction,
    LoadcommentFailureAction, AddItemAction, AddItemSuccessAction,
    AddItemFailureAction, DeleteItemAction, DeleteItemSuccessAction,
    DeleteItemFailureAction, UpdateComment, UpdateCommentSuccess,
    UpdateCommentFail
} from '../actions/comment.actions'
import { of } from 'rxjs';
import { CommentsService } from '../../services/comments.service';

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
                (data) => this.commentService.updateCommentItem(data.id, data.payload)
                    .pipe(
                        map(() => new UpdateCommentSuccess(data.payload)),
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