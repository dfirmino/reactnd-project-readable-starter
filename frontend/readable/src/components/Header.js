import React from 'react'
import { Link } from "react-router-dom";
let Header = () => (
    <div className="col-md-12 col-sm-12">
        <div className="title text-center">
            <span className="title-name"><Link to="/">Readable</Link></span>
            <span className="new-post"> <Link to="/create/post/new"> New Post</Link> </span>
        </div>
    </div>  
)

export default Header