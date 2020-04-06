import { CommentActionTypes, CommentAction } from '../actions/comment.actions';
import { CommentItem } from '../../models/commentItem.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromRoot from '../../state/app-state.model'

export interface CommentState extends EntityState<CommentItem> {
  selectedCommentId: string | null,
  loading: boolean,
  error: Error
}

export interface AppState extends fromRoot.AppState {
  comment: CommentState
}

export const commentAdapter: EntityAdapter<CommentItem> = createEntityAdapter<CommentItem>();


const defaultComment: CommentState = {
  ids: [],
  entities: {},
  selectedCommentId: null,
  loading: false,
  error: undefined
};

export const initialState = commentAdapter.getInitialState(defaultComment);

export function CommentReducer(state: CommentState = initialState, action: CommentAction): CommentState {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENT_SUCCESS:
      return commentAdapter.addAll(action.payload, {
        ...state,
        loading: false
      })

    case CommentActionTypes.LOAD_COMMENT_FAILURE:
      return {
        ...state,
        entities: {},
        error: action.payload,
        loading: false
      }

    case CommentActionTypes.ADD_ITEM_SUCCESS:
      return commentAdapter.addOne(action.payload, state)
    case CommentActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state, error: action.payload
      };
    case CommentActionTypes.DELETE_ITEM_SUCCESS:
      return commentAdapter.removeOne(action.payload, state)
    case CommentActionTypes.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case CommentActionTypes.UPDATE_COMMENT_SUCCESS:
      return commentAdapter.updateOne(action.payload, state);
    case CommentActionTypes.UPDATE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}


const getCommentFeatureState = createFeatureSelector<CommentState>(
  "comment"
)

export const getComments = createSelector(
  getCommentFeatureState,
  commentAdapter.getSelectors().selectAll
)

export const getCommentsLoading = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.loading
)

export const getCommentsError = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.error
)

export const getCurrentCommentId = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.selectedCommentId
);

export const getCurrentComment = createSelector(
  getCommentFeatureState,
  getCurrentCommentId,
  state => state.entities[state.selectedCommentId]
);
