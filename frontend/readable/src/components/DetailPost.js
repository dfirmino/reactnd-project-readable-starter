import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Nav from './Nav'
import * as Api from '../utils/Api'
import { fillComments, fillPost, newComment, editComment, deletePost } from '../actions/index'
import Comment from './Comment'
import Header from './Header'
class DetailPost extends Component {

    state = {
        update : false,
        body: null,
        author: null,
        commentId: null
    }
    
    changeBody = event => {
        let body = event.currentTarget.value;
        this.setState( state => ({
            ...state,
            body            
        }))
    }
    
    changeAuthor = event => {
        let author = event.currentTarget.value;
        this.setState(state => ({
            ...state,
            author
        }))
    }
    
    changeCommentId = event => {
        let commentId = event.currentTarget.value;
        this.setState(state => ({
            ...state,
            commentId
        }))
    }
    handleEditComment = (author, body, commentId) => {
        let update = true;
        this.setState({ body, author, commentId, update});
        document.getElementById('author').disabled = true;
    }
    
    handleDeletePost(idPost) {
        let { deletePost } = this.props; 
        Api.deletePost(idPost)
        .then(result => {
            deletePost(idPost)
        });
    }
    handleNewPost = () => {
        let { postId } = this.props.match.params
        let { newComment, editComment } = this.props;
        let { update, body, author, commentId } = this.state;
        let timestamp = + new Date()

        if(update){
            Api.editComment(body, timestamp, commentId)
                .then(response => {
                    editComment({ commentId, timestamp ,body})
                })
        }else{
            Api.saveComment(postId,author,body,timestamp)
            .then(response => {
                newComment({ postId, author, body, timestamp})
            })
        }
        this.setState({ update: false, body: '', author: '', commentId: '' })
        document.getElementById('author').disabled = false;
    }
    
    componentDidMount() {
        let { postId } = this.props.match.params
        let { fillComments } = this.props;
        let { posts } = this.props;
        Api.getComments(postId).then(result => {
            fillComments(result) 
        })
        
        if(!posts) {
            let { fillPost } = this.props;
            Api.posts().then(response => {
                fillPost(response);
            })
        }
    }
    
    render() {
        let { comments, deletePost } = this.props; 
        let { postId } = this.props.match.params
        let post = this.props.posts ? this.props.posts.filter(post => post.id == postId)[0] : null;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <Header/>
                        <div className="col-md-11 col-sm-11">
                            <div className="row">
                            <div className="editPost">
                                <Link to={`/post/edit/${postId}`}> <span className="glyphicon glyphicon-edit" title="editar"></span> </Link> 
                                <span title="remover" className="glyphicon glyphicon-remove-circle" onClick={event => this.handleDeletePost(postId)}></span>
                            </div>
                                <div className="detailPost">
                                    <div className="detailPost--title"> 
                                        <br/>
                                        <span> Titulo:</span> 
                                        {post && post.title} 
                                    </div>
                                    <div className="detailPost-body">
                                        <span>Descrição:</span>
                                        {post && post.body}
                                    </div>
                                    <div className="detailPost-author">
                                        <span>Autor:</span>
                                        {post && post.author}
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-new-comments">
                    <div className="col-md-12">
                        Novo:
                    </div>
                    <div className="col-md-offset-3 col-md-5">
                        <input type="hidden" id="idComment" value={this.state.commentId} onChange={event => { this.changeCommentId(event) }}/>
                        <input type="text" placeholder="nome" className="form-control" id="author" value={this.state.author} onChange={event => { this.changeAuthor(event) }}/><br/>
                        <textarea placeholder="Comentário" className="form-control" id="body" value={ this.state.body } onChange={event => {this.changeBody(event)}}></textarea>
                        <span className="btn btn-send" onClick={this.handleNewPost}>Enviar</span>
                    </div>
                </div>
                <div className="row row-comments">
                    <div className="col-md-10">
                        <span>Comentários: </span>
                        {comments && comments.filter(comment => !comment.deleted).map(comment => <Comment edit={this.handleEditComment} comment={comment}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fillComments: (comments) => dispatch(fillComments(comments)),
        fillPost: (posts) => dispatch(fillPost(posts)),
        newComment: (comment) => dispatch(newComment(comment)),
        editComment: (comment) => dispatch(editComment(comment)),
        deletePost: (idPost) => dispatch(deletePost(idPost))
    }
}

function mapStateToProps({ commentReducers, postReducers }) {
    return {
        ...commentReducers,
        ...postReducers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)