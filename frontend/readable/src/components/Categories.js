import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fillPost, OrderByPost } from '../actions/index';
import * as Api from '../utils/Api'
import Nav from './Nav'
import Posts from './Posts'
import Filter from './Filter'
import Header from './Header'
class Categories extends Component {

    componentDidMount() {
        let { fillPost } = this.props;
        Api.posts().then(response => {
            fillPost(response);
        })
    }
    
    handleChangeFilter = event => {
        let { OrderByPost } = this.props;
        let orderBy = event.currentTarget.value;
        OrderByPost(orderBy);
    }
    render() {
        let { posts, orderBy } = this.props
        let { category } = this.props.match.params
        return (
            <div className="container">
                {posts &&  <div className="row">
                    <Header/>
                        <div className="col-md-10 col-sm-10">
                            <div className="row">
                                <Filter handleChangeFilter={this.handleChangeFilter}/>
                            </div>
                            <div className="row">
                                <Posts posts={posts.filter(post => post.category === category).slice().sort((a, b) => b[orderBy] - a[orderBy])} />
                            </div>
                        </div>

                        <div className="col-md-2 col-sm-2 col-categories">
                            <Nav />
                        </div>
                    </div> }
                </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return{
        fillPost: (posts) => dispatch(fillPost(posts)),
        OrderByPost: (orderBy) => dispatch(OrderByPost(orderBy))
    }
}

function mapStateToProps({ postReducers }) {
    return {
        ...postReducers
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);