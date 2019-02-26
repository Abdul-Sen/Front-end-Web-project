import React, { Component } from 'react';
import MainContainer from './MainContainer';
class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }

  componentWillMount() {
    fetch("https://polar-headland-60757.herokuapp.com/teams") // this would be a URI from your "Teams API"
      .then(res => res.json())
      .then(returnedData => {
        this.setState({
          teams: returnedData,
        });
        console.log(this.state.teams);
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <MainContainer sidebar={"Teams"}>
        <h1 className="page-header">Teams</h1>
        <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Projects</th>
            <th>Employees</th>
            <th>Team Lead</th>
          </tr>
        </thead>
          <tbody>
            {this.state.teams.map((currentTeam, index) => {
              return (
                <tr key={index}>
                      <td>{currentTeam.TeamName}</td>
                      <td>
                        {currentTeam.Projects.map((currentProject,projectIndex)=>{
                          return(
                            <ul key ={projectIndex}>
                            <li>{currentProject.ProjectName}</li>
                            </ul>
                          )
                        })}
                      </td>
                      <td>{currentTeam.Employees.length} Employees</td>
                      <td>{currentTeam.TeamLead.FirstName} {currentTeam.TeamLead.LastName} </td>
                </tr>)
            })}
          </tbody>
        </table>
      </MainContainer>
    )
  }
}

export default Teams;


