import { PostState } from '../store/reducers/post.reducer';
import {CommentState} from '../store/reducers/comment.reducer'

export interface AppState {
  readonly post: PostState,
  readonly comment: CommentState
}