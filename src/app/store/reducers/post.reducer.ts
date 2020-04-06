import { PostActionTypes, PostAction } from '../actions/post.actions';
import { PostItem } from '../../models/postItem.model';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromRoot from "../../state/app-state.model";

export interface PostState extends EntityState<PostItem> {
  selectedPostId: string | null;
  loading: boolean,
  error: Error
}

export interface AppState extends fromRoot.AppState {
  post: PostState
}

export const postAdapter: EntityAdapter<PostItem> = createEntityAdapter<PostItem>();

export const defaultPost: PostState = {
  ids: [],
  entities: {},
  selectedPostId: null,
  loading: false,
  error: undefined
};

export const initialState = postAdapter.getInitialState(defaultPost);

export function PostReducer(state: PostState = initialState, action: PostAction): PostState {
  switch (action.type) {

    case PostActionTypes.LOAD_POST_SUCCESS:
      return postAdapter.addAll(action.payload, {
        ...state,
        loading: false
      })

    case PostActionTypes.LOAD_POST_FAILURE:
      return {
        ...state,
        entities: {},
        error: action.payload,
        loading: false
      }

    case PostActionTypes.ADD_ITEM_SUCCESS:
      return postAdapter.addOne(action.payload, state)
    case PostActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state, error: action.payload
      };

    case PostActionTypes.DELETE_ITEM_SUCCESS:
      return postAdapter.removeOne(action.payload, state)
    case PostActionTypes.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case PostActionTypes.LOAD_POST_BY_ID_SUCCESS: {
      return postAdapter.addOne(action.payload, {
        ...state,
        selectedPostId: action.payload.id
      });
    }
    case PostActionTypes.LOAD_POST_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}


const getPostFeatureState = createFeatureSelector<PostState>(
  "post"
)

export const getPosts = createSelector(
  getPostFeatureState,
  postAdapter.getSelectors().selectAll
)

export const getPostsLoading = createSelector(
  getPostFeatureState,
  (state: PostState) => state.loading
)

export const getPostsError = createSelector(
  getPostFeatureState,
  (state: PostState) => state.error
)

export const getCurrentPostId = createSelector(
  getPostFeatureState,
  (state: PostState) => state.selectedPostId
);

export const getCurrentPost = createSelector(
  getPostFeatureState,
  getCurrentPostId,
  state => state.entities[state.selectedPostId]
);
