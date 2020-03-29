import { Action } from '@ngrx/store';
import { PostItem } from '../../models/PostItem.model';

export enum postActionTypes {
  LOAD_POST = '[POST] Load post',
  LOAD_POST_SUCCESS = '[POST] Load post Success',
  LOAD_POST_FAILURE = '[POST] Load post Failure',
  ADD_ITEM = '[POST] Add Item',
  ADD_ITEM_SUCCESS = '[POST] Add Item Success',
  ADD_ITEM_FAILURE = '[POST] Add Item Failure',
  DELETE_ITEM = '[POST] Delete Item',
  DELETE_ITEM_SUCCESS = '[POST] Delete Item Success',
  DELETE_ITEM_FAILURE = '[POST] Delete Item Failure'
}

export class LoadpostAction implements Action {
  readonly type = postActionTypes.LOAD_POST
}
export class LoadpostSuccessAction implements Action {
  readonly type = postActionTypes.LOAD_POST_SUCCESS

  constructor(public payload: Array<PostItem>) {}

}
export class LoadpostFailureAction implements Action {
  readonly type = postActionTypes.LOAD_POST_FAILURE
  
  constructor(public payload: Error) {}
}

export class AddItemAction implements Action {
  readonly type = postActionTypes.ADD_ITEM

  constructor(public payload: PostItem) { }
}
export class AddItemSuccessAction implements Action {
  readonly type = postActionTypes.ADD_ITEM_SUCCESS

  constructor(public payload: PostItem) { }
}
export class AddItemFailureAction implements Action {
  readonly type = postActionTypes.ADD_ITEM_FAILURE

  constructor(public payload: Error) { }
}

export class DeleteItemAction implements Action {
  readonly type = postActionTypes.DELETE_ITEM

  constructor(public payload: string) { }
}

export class DeleteItemSuccessAction implements Action {
  readonly type = postActionTypes.DELETE_ITEM_SUCCESS

  constructor(public payload: string) { }
}
export class DeleteItemFailureAction implements Action {
  readonly type = postActionTypes.DELETE_ITEM_FAILURE

  constructor(public payload: string) { }
}

export type postAction = AddItemAction |
  AddItemSuccessAction |
  AddItemFailureAction |
  DeleteItemAction |
  DeleteItemSuccessAction |
  DeleteItemFailureAction |
  LoadpostAction |
  LoadpostFailureAction |
  LoadpostSuccessAction