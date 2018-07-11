import React, { Component } from 'react';
import Header from './Header'
class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <div className="col-md-12 notFound">
                    404<br/>
                    <span>Página não Encontrada</span>
                </div>
            </div>
        )
    }

}
export default NotFound