import { UserActionTypes, UserAction } from '../actions/user.actions';
import { IUser } from '../../models/user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromRoot from "../../state/app-state.model";

export interface UserState extends EntityState<IUser> {
  selectedUserId: string | null;
  loading: boolean,
  error: Error
}

export interface AppState extends fromRoot.AppState {
  user: UserState
}

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const defaultUser: UserState = {
  ids: [],
  entities: {},
  selectedUserId: null,
  loading: false,
  error: undefined
};

export const initialState = userAdapter.getInitialState(defaultUser);

export function UserReducer(state: UserState = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.LOAD_USER_SUCCESS:
      return userAdapter.addAll(action.payload, {
        ...state,
        loading: false
      })

    case UserActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        entities: {},
        error: action.payload,
        loading: false
      }

    case UserActionTypes.ADD_USER_SUCCESS:
      return userAdapter.addOne(action.payload, state)
    case UserActionTypes.ADD_USER_FAILURE:
      return {
        ...state, error: action.payload
      };

    case UserActionTypes.DELETE_USER_SUCCESS:
      return userAdapter.removeOne(action.payload, state)
    case UserActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case UserActionTypes.LOAD_USER_BY_ID_SUCCESS: {
        return userAdapter.addOne(action.payload, {
            ...state,
            selectedUserId: action.payload.id
          });
    
    }
    case UserActionTypes.LOAD_USER_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return userAdapter.updateOne(action.payload, state);
    case UserActionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}


const getUserFeatureState = createFeatureSelector<UserState>(
  "user"
)

export const getUsers = createSelector(
  getUserFeatureState,
  userAdapter.getSelectors().selectAll
)

export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loading
)

export const getUsersError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
)

export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UserState) => state.selectedUserId
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  getCurrentUserId,
  state => state.entities[state.selectedUserId]
);
