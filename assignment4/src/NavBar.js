import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//stateless component
class NavBar extends Component {
    render() {
        return (<nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">WEB422 - Project Portal</Link>
          </div>
        </div>
      </nav>)
    }

}

export default NavBar;