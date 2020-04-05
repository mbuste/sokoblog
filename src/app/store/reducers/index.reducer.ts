import * as fromPost from './post.reducer'
import * as fromComment from './comment.reducer'

export const reducers = {
    post: fromPost.PostReducer,
    comment: fromComment.CommentReducer
}

