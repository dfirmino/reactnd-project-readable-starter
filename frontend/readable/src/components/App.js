import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../App.css';
import Categories from './Categories'
import Home from './Home'
import DetailPost from './DetailPost'
import EditPost from './EditPost'
import CreatePost from './CreatePost'

class App extends Component {
  
  render() {    
      return (
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route exact path="/:category" component={Categories} />
            <Route exact path="/:category/:postId" component={DetailPost} />
            <Route exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/create/post/new" component={CreatePost} />
          </div>
        </BrowserRouter>
    );
  }
}

export default connect()(App);
