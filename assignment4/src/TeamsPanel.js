import React, { Component } from 'react';

//stateless component
class TeamsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://polar-headland-60757.herokuapp.com/teams") // this would be a URI from your "Teams API"
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    teams : returnedData,
                    dataLoaded: true
                });

            }).catch(err => {
                console.log(err);
            });
    }

    render() { /*Why do i not need dataLoaded == true here? */
        return(
            <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Teams</h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive overview-table">
                <table className="table table-striped table-bordered">
                  <tbody>
                  {this.state.teams.map((currentTeam,index)=>{
                                        return(
                                        <tr key={index}>
                                            <td>{currentTeam.TeamName}</td>
                                            <td>{currentTeam.Employees.length}</td>
                                        </tr>)
                                })}
                  </tbody>
                </table>
              </div>
              <a href="/teams" className="btn btn-primary form-control">View All Team Data</a>
            </div>
          </div>
        )
    }
}

export default TeamsPanel;