import React, { Component } from 'react';
import {Link} from 'react-router-dom';

//stateless component
class EmployeesPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        fetch("https://polar-headland-60757.herokuapp.com/employees") // this would be a URI from your "Teams API"
            .then(res => res.json())
            .then(returnedData => {
                this.setState({
                    employees : returnedData,
                    dataLoaded: true
                });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return(<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
              {this.state.employees.map((currentEmployee,index)=>{
                                        return(
                                        <tr key={index}>
                                            <td>{currentEmployee.FirstName} {currentEmployee.LastName}</td>
                                            <td>{currentEmployee.Position.PositionName}</td>
                                        </tr>)
                                })}
              </tbody>
            </table>
          </div>
          <Link to="/employees" className="btn btn-primary form-control">View All Employee Data</Link>
        </div>
      </div>)
    }
}

export default EmployeesPanel;