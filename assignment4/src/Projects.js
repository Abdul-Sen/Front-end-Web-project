import React, { Component } from 'react';
import MainContainer from './MainContainer';
import ProjectsPanel from './ProjectsPanel';
import TeamsPanel from './TeamsPanel';
import EmployeesPanel from './EmployeesPanel';
class Projects extends Component {
  render()
  {
      return (
      <MainContainer sidebar={"Projects"}>
      <h1 className="page-header">Projects</h1>
      <div className="row">
        <div className="col-md-4">
          <ProjectsPanel />
        </div>
        <div className="col-md-4">
          <TeamsPanel />
        </div>
        <div className="col-md-4">
          <EmployeesPanel />
        </div>
      </div>
    </MainContainer>
    )
  }
}

export default Projects;


