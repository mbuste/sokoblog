import { PostState } from '../store/reducers/post.reducer';

export interface AppState {
  readonly post: PostState
}