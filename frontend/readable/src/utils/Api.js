const api = "http://localhost:3001"
let token = 'batman'

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const categories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const posts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getComments = (idPost) =>
    fetch(`${api}/posts/${idPost}/comments`, { headers })
        .then(res => res.json())
        .then(data => data)

export const updatePost = (idPost, body, title) => 
    fetch(`${api}/posts/${idPost}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ body, title })
    })
        .then(res => res.json())
        .then(data => data)

export const saveComment = (parentId, author, body, timestamp) => 
    fetch(`${api}/comments`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ parentId, author, body, timestamp })
    })
        .then(res => res.json())
        .then(data => data)

export const editComment = (body, timestamp,id) =>
    fetch(`${api}/comments/${id}`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ body, timestamp })
    })
        .then(res => res.json())
        .then(data => data)

export const upPost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: "upVote" })
    })
        .then(res => res.json())
        .then(data => data)

export const upComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: "upVote" })
    })
        .then(res => res.json())
        .then(data => data)

export const downPost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: "downVote" })
    })
        .then(res => res.json())
        .then(data => data)

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(data => data)

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(data => data)

export const downComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: "downVote" })
    })
        .then(res => res.json())
        .then(data => data)

export const createPost = ({id, timestamp, author, body, category, title}) =>
    fetch(`${api}/posts`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, timestamp, author, body, category, title })
    })
        .then(res => res.json())
        .then(data => data)