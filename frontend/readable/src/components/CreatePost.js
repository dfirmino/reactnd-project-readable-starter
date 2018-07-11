import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router'
import Header  from './Header';
import { newPost, fillPost } from '../actions/index';
import * as Api from '../utils/Api'

class CreatePost extends Component {

    state = {
        body : '',
        author: '',
        category: 'udacity',
        title: '',
        redirect: false
    }

    componentDidMount() {
        let { fillPost } = this.props;
        Api.posts().then(response => {
            fillPost(response);
        })
    }

    handleNewPost = () => {
        let {body, author, category, title, redirect } = this.state;
        let { newPost } = this.props;
        let timestamp = + new Date();
        let id = this.newId();
        redirect = true;
        console.log({ body, author, category, title, id, timestamp })
        Api.createPost({ body, author, category, title, id, timestamp })
        .then(result => {
            newPost({ id, timestamp, author, body, category, title })
            this.setState({ id:'', timestamp:'', author:'', body:'', category, title:'' }) 
        })
    } 

    changeTitle = event => {
        let title = event.currentTarget.value;
        this.setState({title})
    }
    changeBody = event => {
        let body = event.currentTarget.value;
        this.setState({body})
    }

    changeAuthor = event => {
        let author = event.currentTarget.value;
        this.setState({author})
    }
    
    changeCategory = event => {
        let category = event.currentTarget.value;
        this.setState({category})
    }
    
 newId = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
    }
    render() {
        let { title, body, author, category, redirect } = this.state;
        return (
            <div className="container">
                {redirect &&
                    <Redirect from="/create/post/" to="/" />}
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <Header />
                        <div className="col-md-11 col-sm-11">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <h4>Novo Post</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="titulo">Titulo:</label>
                                    <input type="text" value={title} className="form-control" id="titulo" placeholder="Titulo" name="titulo" onChange={event => this.changeTitle(event)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descricao">Descricao:</label>
                                    <textarea value={body} className="form-control" id="descricao" placeholder="descricao" name="descricao" onChange={event => this.changeBody(event)}/>
                                </div>
                                <div className="col-md-6 cl-left cl-right">
                                    <div className="form-group">
                                        <label htmlFor="autor">Autor:</label>
                                        <input value={author} className="form-control" type="text" id="autor" placeholder="autor" name="autor" onChange={ event =>this.changeAuthor(event) }/>
                                    </div>
                                </div>
                                <div className="col-md-6 cl-left">
                                    <div className="form-group">
                                        <label htmlFor="categoria">Categoria:</label>
                                        <select value={category} className="form-control" type="text" id="categoria" placeholder="categoria" name="categoria" onChange={event => this.changeCategory(event)}>
                                            <option value="udacity">Udacity</option>
                                            <option value="react">React</option>
                                            <option value="redux">Redux</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <span className="btn btn-send" onClick={this.handleNewPost}><span className="glyphicon glyphicon-send"></span> Postar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        newPost: (post) => dispatch(newPost(post)),
        fillPost: (posts) => dispatch(fillPost(posts)),
    }
}
function mapStateToProps({...postReducers }) {
    return {
        ...postReducers
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)