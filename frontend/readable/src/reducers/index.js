import { combineReducers } from 'redux'
import { FILL_CATEGORIE, FILL_POST, FILL_COMMENTS, 
        INCREMENT_POST_VOTE, DECREMENT_POST_VOTE, EDIT_POST, NEW_COMMENT,
        EDIT_COMMENT, INCREMENT_COMMENT_VOTE, DECREMENT_COMMENT_VOTE,
        NEW_POST, ORDER_BY, DELETE_POST, DELETE_COMMENT } from '../actions/index'

function categorieRedux(state = {} , action) {
    switch (action.type) {
        case FILL_CATEGORIE:
            return {
                ...state,
                categories: action.categories 
            }
        default:
            return state;
    }
}

function postReducers(state ={post: [], orderBy: "timestamp"}, action){
    switch (action.type) {
        case FILL_POST:
            return {
                ...state,
                posts: action.posts.filter(post => !post.deleted)
            }
        case INCREMENT_POST_VOTE:
            return {
               ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.idPost) {
                        post.voteScore += 1;
                    }
                    return post;
                })

            }
        case DECREMENT_POST_VOTE:
           return {
               ...state,
               posts: state.posts.map(post => {
                   if (post.id === action.idPost) {
                       post.voteScore -= 1;
                   }
                   return post;
               })
            }
        case NEW_POST:
            return { posts: [...state.posts, action] }
        case ORDER_BY:
            return { ...state, ['orderBy']: action.orderBy }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.idPost) {
                        post.deleted = true;
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

function commentReducers(state ={}, action) {
    switch (action.type) {
        case FILL_COMMENTS:
            return {
                ...state,
                comments: action.comments.filter(comment => !comment.deleted)
            }
        case NEW_COMMENT:
            return { comments: [...state.comments, action] }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.commentId) {
                        comment.body = action.body;
                        comment.timestamp = action.timestamp;
                    }
                    return comment;
                })
            }
        case INCREMENT_COMMENT_VOTE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.idComment){
                        comment.voteScore += 1
                    }
                    return comment
                })
            }
        case DECREMENT_COMMENT_VOTE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.idComment) {
                        comment.voteScore -= 1
                    }
                    return comment
                })
            }
            case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.idComment) {
                        comment.deleted = true;
                    }
                    return comment
                })
            }
        default:
            return state;
    }
}

export default combineReducers({
    categorieRedux,
    postReducers,
    commentReducers
})