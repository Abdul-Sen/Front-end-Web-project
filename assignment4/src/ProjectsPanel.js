import React, { Component } from 'react';
import moment from 'moment';

//stateless component
class ProjectsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://polar-headland-60757.herokuapp.com/projects") // this would be a URI from your "Teams API"
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    projects : returnedData,
                    dataLoaded: true
                });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.dataLoaded === true) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Projects</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                    {this.state.projects.map((currentProject,index)=>{
                                        return(
                                        <tr key={index}>
                                            <td >{currentProject.ProjectName}</td>
                                            <td>{ moment(new Date()).diff(moment(currentProject.ProjectStartDate),'days')}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <a href="/projects" className="btn btn-primary form-control">View All Project Data</a>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Projects</h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive overview-table">
                    <table className="table table-striped table-bordered">
                      <tbody>

                      </tbody>
                    </table>
                  </div>
                  <a href="/projects" className="btn btn-primary form-control">View All Project Data</a>
                </div>
              </div>)
        }
    }
}

export default ProjectsPanel;