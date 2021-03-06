import { Action } from '@ngrx/store';
import { PostItem } from '../../models/PostItem.model';
import { Update } from '@ngrx/entity';

export enum PostActionTypes {
  LOAD_POST_BY_ID = "[Post] Load Post By Id",
  LOAD_POST_BY_ID_SUCCESS = "[Post] Load Post Success By Id",
  LOAD_POST_BY_ID_FAIL = "[Post] Load Post Fail By Id",

  LOAD_POST = '[POST] Load post',
  LOAD_POST_SUCCESS = '[POST] Load post Success',
  LOAD_POST_FAILURE = '[POST] Load post Failure',
  ADD_ITEM = '[POST] Add Item',
  ADD_ITEM_SUCCESS = '[POST] Add Item Success',
  ADD_ITEM_FAILURE = '[POST] Add Item Failure',
  DELETE_ITEM = '[POST] Delete Item',
  DELETE_ITEM_SUCCESS = '[POST] Delete Item Success',
  DELETE_ITEM_FAILURE = '[POST] Delete Item Failure',
  UPDATE_POST = "[POST] Update Post",
  UPDATE_POST_SUCCESS = "[POST] Update Post Success",
  UPDATE_POST_FAIL = "[POST] Update Post Fail",
}

export class LoadPostAction implements Action {
  readonly type = PostActionTypes.LOAD_POST
}
export class LoadpostSuccessAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_SUCCESS

  constructor(public payload: Array<PostItem>) { }

}
export class LoadpostFailureAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_FAILURE

  constructor(public payload: Error) { }
}

export class LoadPostById implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID;

  constructor(public payload: string) { }
}

export class LoadPostByIdSuccess implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID_SUCCESS;

  constructor(public payload: PostItem) { }
}

export class LoadPostByIdFail implements Action {
  readonly type = PostActionTypes.LOAD_POST_BY_ID_FAIL;

  constructor(public payload: Error) { }
}


export class AddItemAction implements Action {
  readonly type = PostActionTypes.ADD_ITEM

  constructor(public payload: PostItem) { }
}
export class AddItemSuccessAction implements Action {
  readonly type = PostActionTypes.ADD_ITEM_SUCCESS

  constructor(public payload: PostItem) { }
}
export class AddItemFailureAction implements Action {
  readonly type = PostActionTypes.ADD_ITEM_FAILURE

  constructor(public payload: Error) { }
}

export class DeleteItemAction implements Action {
  readonly type = PostActionTypes.DELETE_ITEM

  constructor(public payload: string) { }
}

export class DeleteItemSuccessAction implements Action {
  readonly type = PostActionTypes.DELETE_ITEM_SUCCESS

  constructor(public payload: string) { }
}
export class DeleteItemFailureAction implements Action {
  readonly type = PostActionTypes.DELETE_ITEM_FAILURE

  constructor(public payload: Error) { }
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UPDATE_POST
  constructor(public payload: PostItem) { }
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActionTypes.UPDATE_POST_SUCCESS
  constructor(public payload: Update<PostItem>) { }
}
export class UpdatePostFail implements Action {
  readonly type = PostActionTypes.UPDATE_POST_FAIL
  constructor(public payload: Error) { }
}

export type PostAction = AddItemAction |
  AddItemSuccessAction |
  AddItemFailureAction |
  DeleteItemAction |
  DeleteItemSuccessAction |
  DeleteItemFailureAction |
  LoadPostAction |
  LoadpostFailureAction |
  LoadpostSuccessAction | LoadPostById | LoadPostByIdFail | LoadPostByIdSuccess |
  UpdatePost | UpdatePostFail | UpdatePostSuccess