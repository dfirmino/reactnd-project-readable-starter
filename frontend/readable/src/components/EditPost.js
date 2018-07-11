import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import Nav from './Nav';
import Header from './Header';
import * as Api from '../utils/Api'
import { fillPost} from '../actions';

class EditPost extends Component {
    state = {
        redirect: false
    }
    handleUpdate = event => {
        let { editPost } = this.props;
        let { postId } = this.props.match.params;
        let title = document.getElementById('titulo').value;
        let body = document.getElementById('descricao').value
        Api.updatePost(postId,body,title)
        .then(response => {
            this.setState({redirect: true})
        });
    }
    
    componentDidMount() {
        let { fillPost } = this.props;
        Api.posts().then(response => {
            fillPost(response);
        })
    }
    
    render() {
        let { postId } = this.props.match.params
        let { posts } = this.props;
        let {redirect} = this.state;
        return (
            <div className="container">
            {redirect && 
                    <Redirect from={`/post/edit/${postId}`} to="/" /> }
            {posts && (<div className="row">
                    <div>
                        <Header />
                        <div className="col-md-11 col-sm-11 pd-left-38">
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="titulo">Titulo:</label>
                                    <input type="text" className="form-control" id="titulo" placeholder="Titulo" name="titulo" defaultValue={posts.filter(post => post.id === postId)[0].title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descricao">Descricao:</label>
                                    <textarea className="form-control" id="descricao" placeholder="descricao" name="descricao" defaultValue={posts.filter(post => post.id === postId)[0].body} />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        Categoria:<br/>
                                        <span className="tag">
                                        { posts.filter(post => post.id === postId)[0].category }
                                        </span>
                                    </div>
                                    <div className="col-md-6">
                                        Enviado Por:<br />
                                        <small>
                                            {posts.filter(post => post.id === postId)[0].author}
                                        </small>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="btn btn-send" onClick={this.handleUpdate}>Enviar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> )}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fillPost: (posts) => dispatch(fillPost(posts))
    }
}

function mapStateToProps({  postReducers }) {
    return {
        ...postReducers
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPost)