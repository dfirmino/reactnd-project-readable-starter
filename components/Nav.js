import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import * as Api from '../utils/Api'
import Categories from './Categories'
import { fillAction } from '../actions';
class Nav extends Component {

    componentDidMount() {
        let { fillCategories } = this.props;
        Api.categories().then(response => {
            let allNames = response.map(categorie => categorie.name)
            fillCategories(allNames);
        })
    }

    render() {
        let { categories } = this.props
        return (
            <ul className="list-categories">
                <Link to='/'> <li className="category"> Todos </li> </Link>
                {categories && categories.map(categoria => (
                    <Link to={categoria} key={categoria}> <li className="category"> {categoria} </li></Link>
                ))}
            </ul>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fillCategories: (categories) => dispatch(fillAction(categories)),
    }
}

function mapStateToProps({ categorieRedux }) {
    return {
        ...categorieRedux,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);