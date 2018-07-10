import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OrderByPost } from '../actions/index';
class Filter extends Component {
    
    render() {
        let { orderBy, handleChangeFilter } = this.props;
        return (
            <div className="filter">
                <span> Ordenado por: </span>
                <select className="form-control" defaultValue={orderBy} onChange={event => handleChangeFilter(event)}>
                    <option value="timestamp">Data</option>
                    <option value="voteScore">Votação</option>
                </select>
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {}
}

function mapStateToProps({ postReducers }) {
    return {
        ...postReducers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)


