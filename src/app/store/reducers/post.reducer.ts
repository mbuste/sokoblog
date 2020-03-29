import { PostActionTypes, PostAction } from '../actions/post.actions';
import { PostItem } from '../../models/postItem.model';

export interface PostState {
  list: PostItem[],
  loading: boolean,
  error: Error
}

const initialState: PostState = {
  list: [],
  loading: false,
  error: undefined
};
export function PostReducer(state: PostState = initialState, action: PostAction) {
  switch (action.type) {
    case PostActionTypes.LOAD_POST:
      return {
        ...state,
        loading: true
      }
    case PostActionTypes.LOAD_POST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }

    case PostActionTypes.LOAD_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case PostActionTypes.ADD_ITEM:
      return {
        ...state,
        loading: true
      }
    case PostActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case PostActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case PostActionTypes.DELETE_ITEM:
      return {
        ...state,
        loading: true
      };
    case PostActionTypes.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      }
    case PostActionTypes.DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}