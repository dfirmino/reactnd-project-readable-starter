import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import dateFormatter from '../utils/dateFormatter'
import { incrementVotePost, decrementVotePost, deletePost } from '../actions/index'
import * as Api from "../utils/Api"
class Posts extends Component {

    state = {
        redirect: false
    }
    
    handleIncrement = event => {
        let { incrementVotePost } = this.props;
        let id = event.target.dataset.id;
        incrementVotePost(id);
        Api.upPost(id);
    }
    
    handleDecrement = event => {
        let { decrementVotePost } = this.props;
        let id = event.target.dataset.id;
        decrementVotePost(id);
        Api.downPost(id);
    }
    
    handleDeletePost(idPost) {
        let { deletePost } = this.props;
        Api.deletePost(idPost)
            .then(result => {
                deletePost(idPost)
                this.setState({redirect: true})
            });
    }
    render() {
        let { posts, incrementVotePost } = this.props
        return (
            <div className="posts-container">
                {posts && posts.filter(post => !post.deleted).map( post => (
                    <div key={post.id} className="row">
                        <div className="post">
                        <div className="col-md-2 post-score">
                                <span className='icon-vote glyphicon glyphicon-chevron-up' data-id={post.id} onClick={this.handleIncrement}></span>
                                {post.voteScore}
                                <span className='icon-vote glyphicon glyphicon-chevron-down' data-id={post.id} onClick={this.handleDecrement}></span>
                        </div>
                        <div className="col-md-10 post-title">
                            <Link to={`/${post.category}/${post.id}`}> {post.title} </Link>
                        </div>
                        <div className="col-md-10 post-detail">
                            <span className="post-author"> Enviador por: <b> {post.author} </b> </span>
                            <span className="post-comment"> Cometários: <b> {post.commentCount} </b> </span>
                            <span className="post-data"> Enviado em: <b> {dateFormatter(post.timestamp) + ' atrás'} </b> </span>
                            <span className="post-category"> <b> {post.category} </b> </span>
                        </div>
                        <div className="col-md-10 post-actions">
                            <Link to={`/post/edit/${post.id}`}> <span className="btn btn-send ft-rg" title="editar">Editar</span> </Link>  
                            <span title="remover" className="btn btn-send ft-rg" onClick={event => this.handleDeletePost(post.id)}>Remover</span>
                        </div>
                        </div>
                    </div>
                ))}
                {(posts && posts.length === 0) && <h4>Não foi Encontrado Posts Dessa Categoria 🙁</h4> }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        incrementVotePost: (idPost) => dispatch(incrementVotePost(idPost)),
        decrementVotePost: (idPost) => dispatch(decrementVotePost(idPost)),
        deletePost: (idPost) => dispatch(deletePost(idPost))
    }
}


export default connect(null, mapDispatchToProps)(Posts)