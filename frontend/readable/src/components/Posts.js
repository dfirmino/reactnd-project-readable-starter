import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { incrementVotePost, decrementVotePost } from '../actions/index'
import * as Api from "../utils/Api"
class Posts extends Component {

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
    
    render() {
        let { posts, incrementVotePost } = this.props
        console.log(posts);
        return (
            <div className="posts-container">
                { posts && posts.map( post => (
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
                            <span className="post-data"> Enviado em: <b> {post.timestamp} </b> </span>
                            <span className="post-category"> <b> {post.category} </b> </span>
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
        decrementVotePost: (idPost) => dispatch(decrementVotePost(idPost))
    }
}

function mapStateToProps() {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)