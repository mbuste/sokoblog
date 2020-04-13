import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromUserActions from '../actions/user.actions'
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/models/user.model';

@Injectable()
export class UserEffects {
    
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  @Effect() loadUser$ = this.actions$
    .pipe(
      ofType<fromUserActions.LoadUserAction>(fromUserActions.UserActionTypes.LOAD_USER),
      mergeMap(
        () => this.userService.getUsers()
          .pipe(
            map(data => {
              return new fromUserActions.LoaduserSuccessAction(data)
            }),
            catchError(error => of(new fromUserActions.LoaduserFailureAction(error)))
          )
      ),
    )

  @Effect() editIUser$ = this.actions$
    .pipe(
      ofType<fromUserActions.UpdateUser>(fromUserActions.UserActionTypes.UPDATE_USER),
      mergeMap(
        (data) => this.userService.updateUser(data.payload)
          .pipe(
            map((updateUser: IUser) => new fromUserActions.UpdateUserSuccess({
              id: updateUser.id,
              changes: updateUser

            })),
            catchError(error => of(new fromUserActions.UpdateUserFail(error)))
          )
      )
    )


  @Effect()
  loadUserById$ = this.actions$.pipe(
    ofType<fromUserActions.LoadUserById>(
      fromUserActions.UserActionTypes.LOAD_USER_BY_ID
    ),
    mergeMap((action: fromUserActions.LoadUserById) =>
      this.userService.getUserById(action.payload).pipe(
        map(
          (data) =>
            new fromUserActions.LoadUserByIdSuccess(data)
        ),
        catchError(err => of(new fromUserActions.LoadUserByIdFail(err)))
      )
    )
  );

  @Effect() addIUser$ = this.actions$
    .pipe(
      ofType<fromUserActions.AddUserAction>(fromUserActions.UserActionTypes.ADD_USER),
      mergeMap(
        (data) => this.userService.addUser(data.payload)
          .pipe(
            map(() => new fromUserActions.AddUserSuccessAction(data.payload)),
            catchError(error => of(new fromUserActions.AddUserFailureAction(error)))
          )
      )
    )

  @Effect() deleteIUser$ = this.actions$
    .pipe(
      ofType<fromUserActions.DeleteUserAction>(fromUserActions.UserActionTypes.DELETE_USER),
      mergeMap(
        (data) => this.userService.deleteUser(data.payload)
          .pipe(
            map(() => new fromUserActions.DeleteUserSuccessAction(data.payload)),
            catchError(error => of(new fromUserActions.DeleteUserFailureAction(error)))
          )
      )
    )


}