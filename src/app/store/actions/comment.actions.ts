import { Action } from '@ngrx/store';
import { CommentItem } from '../../models/CommentItem.model';

export enum CommentActionTypes {
    LOAD_COMMENT = '[COMMENT] Load comment',
    LOAD_COMMENT_SUCCESS = '[COMMENT] Load comment Success',
    LOAD_COMMENT_FAILURE = '[COMMENT] Load comment Failure',
    ADD_ITEM = '[COMMENT] Add Item',
    ADD_ITEM_SUCCESS = '[COMMENT] Add Item Success',
    ADD_ITEM_FAILURE = '[COMMENT] Add Item Failure',
    DELETE_ITEM = '[COMMENT] Delete Item',
    DELETE_ITEM_SUCCESS = '[COMMENT] Delete Item Success',
    DELETE_ITEM_FAILURE = '[COMMENT] Delete Item Failure',
    UPDATE_COMMENT = "[COMMENT] Update Comment",
    UPDATE_COMMENT_SUCCESS = "[COMMENT] Update Comment Success",
    UPDATE_COMMENT_FAIL = "[COMMENT] Update Comment Fail",
}

export class LoadCommentAction implements Action {
    readonly type = CommentActionTypes.LOAD_COMMENT
}
export class LoadcommentSuccessAction implements Action {
    readonly type = CommentActionTypes.LOAD_COMMENT_SUCCESS

    constructor(public payload: Array<CommentItem>) { }

}
export class LoadcommentFailureAction implements Action {
    readonly type = CommentActionTypes.LOAD_COMMENT_FAILURE

    constructor(public payload: Error) { }
}

export class AddItemAction implements Action {
    readonly type = CommentActionTypes.ADD_ITEM

    constructor(public payload: CommentItem) { }
}
export class AddItemSuccessAction implements Action {
    readonly type = CommentActionTypes.ADD_ITEM_SUCCESS

    constructor(public payload: CommentItem) { }
}
export class AddItemFailureAction implements Action {
    readonly type = CommentActionTypes.ADD_ITEM_FAILURE

    constructor(public payload: Error) { }
}

export class DeleteItemAction implements Action {
    readonly type = CommentActionTypes.DELETE_ITEM

    constructor(public payload: string) { }
}

export class DeleteItemSuccessAction implements Action {
    readonly type = CommentActionTypes.DELETE_ITEM_SUCCESS

    constructor(public payload: string) { }
}
export class DeleteItemFailureAction implements Action {
    readonly type = CommentActionTypes.DELETE_ITEM_FAILURE

    constructor(public payload: string) { }
}

export class UpdateComment implements Action {
    readonly type = CommentActionTypes.UPDATE_COMMENT
    constructor(public id: string, public payload: CommentItem) { }
}

export class UpdateCommentSuccess implements Action {
    readonly type = CommentActionTypes.UPDATE_COMMENT_SUCCESS
    constructor(public payload: CommentItem) { }
}
export class UpdateCommentFail implements Action {
    readonly type = CommentActionTypes.UPDATE_COMMENT_FAIL
    constructor(public payload: Error) { }
}

export type CommentAction = AddItemAction |
    AddItemSuccessAction |
    AddItemFailureAction |
    DeleteItemAction |
    DeleteItemSuccessAction |
    DeleteItemFailureAction |
    LoadCommentAction |
    LoadcommentFailureAction |
    LoadcommentSuccessAction |
    UpdateComment | UpdateCommentSuccess |UpdateCommentFail