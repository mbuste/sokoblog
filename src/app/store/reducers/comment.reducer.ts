import { CommentActionTypes, CommentAction } from '../actions/comment.actions';
import { CommentItem } from '../../models/commentItem.model';

export interface CommentState {
  list: CommentItem[],
  loading: boolean,
  error: Error
}

const initialState: CommentState = {
  list: [],
  loading: false,
  error: undefined
};
export function CommentReducer(state: CommentState = initialState, action: CommentAction) {
  switch (action.type) {
    case CommentActionTypes.LOAD_COMMENT:
      return {
        ...state,
        loading: true
      }
    case CommentActionTypes.LOAD_COMMENT_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }

    case CommentActionTypes.LOAD_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case CommentActionTypes.ADD_ITEM:
      return {
        ...state,
        loading: true
      }
    case CommentActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case CommentActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CommentActionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true
      };
    case CommentActionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      }
    case CommentActionTypes.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      case CommentActionTypes.UPDATE_COMMENT:
        return {
          ...state,
          loading: true
        }
      case CommentActionTypes.UPDATE_COMMENT_SUCCESS:
        return {
          ...state,
          list: [...state.list, action.payload],
          loading: false
        };
      case CommentActionTypes.UPDATE_COMMENT_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
  
    default:
      return state;
  }
}