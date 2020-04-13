import * as fromPost from './post.reducer'
import * as fromComment from './comment.reducer'
import * as fromUser from './user.reducer'

export const reducers = {
    post: fromPost.PostReducer,
    comment: fromComment.CommentReducer,
    user: fromUser.UserReducer
}

