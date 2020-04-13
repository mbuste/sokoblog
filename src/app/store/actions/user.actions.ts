import { Action } from '@ngrx/store';
import { IUser } from '../../models/user.model';
import { Update } from '@ngrx/entity';

export enum UserActionTypes {
  LOAD_USER_BY_ID = "[User] Load User By Id",
  LOAD_USER_BY_ID_SUCCESS = "[User] Load User By Id Success ",
  LOAD_USER_BY_ID_FAIL = "[User] Load User By Id Fail ",
  LOAD_USER = '[USER] Load user',
  LOAD_USER_SUCCESS = '[USER] Load user Success',
  LOAD_USER_FAILURE = '[USER] Load user Failure',
  ADD_USER = '[USER] Add User',
  ADD_USER_SUCCESS = '[USER] Add User Success',
  ADD_USER_FAILURE = '[USER] Add User Failure',
  DELETE_USER = '[USER] Delete User',
  DELETE_USER_SUCCESS = '[USER] Delete User Success',
  DELETE_USER_FAILURE = '[USER] Delete User Failure',
  UPDATE_USER = "[USER] Update User",
  UPDATE_USER_SUCCESS = "[USER] Update User Success",
  UPDATE_USER_FAIL = "[USER] Update User Fail",
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER
}
export class LoaduserSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS

  constructor(public payload: Array<IUser>) { }

}
export class LoaduserFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE

  constructor(public payload: Error) { }
}

export class LoadUserById implements Action {
  readonly type = UserActionTypes.LOAD_USER_BY_ID;

  constructor(public payload: string) { }
}

export class LoadUserByIdSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_BY_ID_SUCCESS;

  constructor(public payload: IUser) { }
}

export class LoadUserByIdFail implements Action {
  readonly type = UserActionTypes.LOAD_USER_BY_ID_FAIL;

  constructor(public payload: Error) { }
}


export class AddUserAction implements Action {
  readonly type = UserActionTypes.ADD_USER

  constructor(public payload: IUser) { }
}
export class AddUserSuccessAction implements Action {
  readonly type = UserActionTypes.ADD_USER_SUCCESS

  constructor(public payload: IUser) { }
}
export class AddUserFailureAction implements Action {
  readonly type = UserActionTypes.ADD_USER_FAILURE

  constructor(public payload: Error) { }
}

export class DeleteUserAction implements Action {
  readonly type = UserActionTypes.DELETE_USER

  constructor(public payload: string) { }
}

export class DeleteUserSuccessAction implements Action {
  readonly type = UserActionTypes.DELETE_USER_SUCCESS

  constructor(public payload: string) { }
}
export class DeleteUserFailureAction implements Action {
  readonly type = UserActionTypes.DELETE_USER_FAILURE

  constructor(public payload: Error) { }
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UPDATE_USER
  constructor(public payload: IUser) { }
}

export class UpdateUserSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_SUCCESS
  constructor(public payload: Update<IUser>) { }
}
export class UpdateUserFail implements Action {
  readonly type = UserActionTypes.UPDATE_USER_FAIL
  constructor(public payload: Error) { }
}

export type UserAction = AddUserAction |
  AddUserSuccessAction |
  AddUserFailureAction |
  DeleteUserAction |
  DeleteUserSuccessAction |
  DeleteUserFailureAction |
  LoadUserAction |
  LoaduserFailureAction |
  LoaduserSuccessAction | LoadUserById | LoadUserByIdFail | LoadUserByIdSuccess |
  UpdateUser | UpdateUserFail | UpdateUserSuccess