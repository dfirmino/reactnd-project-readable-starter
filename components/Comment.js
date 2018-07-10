import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementVoteComment, decrementVoteComment, deleteComment } from '../actions/index'
import * as Api from '../utils/Api'
import moment from 'moment';

class Comment extends Component {
    
    handleIncrementVoteScore = idComment => {
        let { incrementVoteComment } = this.props 
        incrementVoteComment(idComment)
        Api.upComment(idComment)
    }
    
    handleDecrementVoteScore = idComment => {
        let { decrementVoteComment } = this.props 
        decrementVoteComment(idComment)
        Api.downComment(idComment)
    }

    handleDeleteComment = idComment => {
        let { deleteComment } = this.props
        Api.deleteComment(idComment)
        .then(result => {
            deleteComment(idComment)
        })
    }
    
    render(){
        let { comment, edit } = this.props; 
        return (
            <div className="row comment-container">
                <div className="detailPost-comments">
                    <div className='comment-description col-md-10 col-sm-10 col-xs-10'>
                        <div className="row">
                            <span className="comment-author"> {comment.author}  </span> | <span className="comment-date"> {moment(comment.timestamp, "YYYYMMDD").fromNow()} </span>
                        </div>
                        <div className="row">
                            <span className="comment-body"> {comment.body} </span>
                        </div>
                        <div className="row editComment">
                            <span className="glyphicon glyphicon-edit" onClick={ () => edit(comment.author, comment.body,comment.id)}></span>  
                            <span className="glyphicon glyphicon-remove-circle" onClick={() => this.handleDeleteComment(comment.id)}></span>
                        </div>
                    </div>
                    <div className='comment-score col-md-2 col-sm-2 col-xs-2'>
                        <span className="glyphicon glyphicon-thumbs-up" onClick={() => this.handleIncrementVoteScore(comment.id)}></span>
                            <small> {comment.voteScore} </small>
                        <span className="glyphicon glyphicon-thumbs-down" onClick={() => this.handleDecrementVoteScore(comment.id)}></span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        incrementVoteComment: (idComment) => dispatch(incrementVoteComment(idComment)),
        decrementVoteComment: (idComment) => dispatch(decrementVoteComment(idComment)),
        deleteComment: (idComment) => dispatch(deleteComment(idComment))
    }
}

function mapStateToProps({ commentReducers }) {
    return {
        ...commentReducers,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)