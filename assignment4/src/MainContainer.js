import React, { Component } from 'react';
import NavBar from './NavBar'
import SideBar from './SideBar'

//stateless component
class MainContainer extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            sidebar: props.sidebar
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container-fluid">
                    <div className="row">
                    {/* // Add the correct "highlight" property here */}
                        <SideBar highlight = {this.state.sidebar} />
                        {/* // be sure to add a reference to the "children" here */}
                        <div className=" col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MainContainer;