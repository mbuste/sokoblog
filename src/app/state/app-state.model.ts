import { PostState } from '../store/reducers/post.reducer';
import { CommentState } from '../store/reducers/comment.reducer'
import { UserState } from '../store/reducers/user.reducer'

export interface AppState {
  readonly post: PostState,
  readonly comment: CommentState,
  readonly user: UserState
}