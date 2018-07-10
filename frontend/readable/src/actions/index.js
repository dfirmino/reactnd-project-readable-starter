export const FILL_CATEGORIE = "FILL_CATEGORIE";
export const FILL_POST = "FILL_POST";
export const FILL_COMMENTS = "FILL_COMMENTS";
export const INCREMENT_POST_VOTE = "INCREMENT_POST_VOTE";
export const NEW_POST = "NEW_POST";
export const INCREMENT_COMMENT_VOTE = "INCREMENT_COMMENT_VOTE";
export const DECREMENT_POST_VOTE = "DECREMENT_POST_VOTE";
export const DECREMENT_COMMENT_VOTE = "DECREMENT_COMMENT_VOTE";
export const NEW_COMMENT = "NEW_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const ORDER_BY = "ORDER_BY";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const fillAction = ( categories ) => ({
    type: FILL_CATEGORIE,
    categories
});


export const fillPost = ( posts ) => ({
    type: FILL_POST,
    posts
})

export const newPost = ({ id, timestamp, author, body, category, title }) => ({
    type: NEW_POST,
    id, 
    timestamp, 
    author, 
    body, 
    category, 
    title,
    voteScore: 1,
    deleted: false,
    commentCount: 0
})

export const deletePost = (idPost) => ({
    type: DELETE_POST,
    idPost
})

export const incrementVotePost = (idPost) => ({
    type: INCREMENT_POST_VOTE,
    idPost
})

export const decrementVotePost = (idPost) => ({
    type: DECREMENT_POST_VOTE,
    idPost
})

export const OrderByPost = (orderBy) => ({
    type: ORDER_BY,
    orderBy
})

export const fillComments = (comments) => ({
    type: FILL_COMMENTS,
    comments
})

export const newComment = ({ postId, author, timestamp, body}) => ({
    type: NEW_COMMENT,
    postId,
    author,
    timestamp,
    body,
    voteScore:1,
    parentDeleted: false,
    deleted: false
})

export const editComment = ({ commentId, body, timestamp}) => ({
    type: EDIT_COMMENT,
    commentId,
    timestamp,
    body
})

export const incrementVoteComment = (idComment) => ({
    type: INCREMENT_COMMENT_VOTE,
    idComment
})

export const decrementVoteComment = (idComment) => ({
    type: DECREMENT_COMMENT_VOTE,
    idComment
})

export const deleteComment = (idComment) => ({
    type: DELETE_COMMENT,
    idComment
})