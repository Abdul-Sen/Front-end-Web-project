import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  componentWillMount() {
    fetch("https://polar-headland-60757.herokuapp.com/projects") // this would be a URI from your "Teams API"
      .then(res => res.json())
      .then(returnedData => {
        this.setState({
          projects: returnedData,
        });
        console.log(this.state.projects);
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <MainContainer sidebar={"Projects"}>
        <h1 className="page-header">Projects</h1>
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
          <tbody>
            {this.state.projects.map((currentProject, index) => {
              return (
                <tr key={index}>
                  <td>{currentProject.ProjectName}</td>
                  <td>{currentProject.ProjectDescription}</td>
                  <td>{moment(currentProject.ProjectStartDate).format('LL')}</td>
                  {(currentProject.ProjectEndDate == null) ? <td>N/A</td> : <td>{currentProject.ProjectEndDate}</td>}
                </tr>)
            })}
          </tbody>
        </table>
      </MainContainer>
    )
  }
}

export default Projects;


