import React, { Component } from 'react';
import MainContainer from './MainContainer';
import moment from 'moment';
class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    }
  }

  componentWillMount() {
    fetch("https://polar-headland-60757.herokuapp.com/employees") // this would be a URI from your "Teams API"
      .then(res => res.json())
      .then(returnedData => {
        this.setState({
          employees: returnedData,
        });
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <MainContainer sidebar={"Employees"}>
        <h1 className="page-header">Employees</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>{'Name & Position'}</th>
              <th>{'Address'}</th>
              <th>{'Phone Num'}</th>
              <th>{'Hire Date'}</th>
              <th>{'Salary Bonus'}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((currnetEmployee, index) => {
              return (<tr key={index}>
                <td>{currnetEmployee.FirstName} {currnetEmployee.LastName}</td>
                <td>{currnetEmployee.AddressStreet}, {currnetEmployee.AddressCity} {currnetEmployee.AddressState}, {currnetEmployee.AddressZip}</td>
                <td>{currnetEmployee.PhoneNum} {'ex: '} {currnetEmployee.Extension}</td>
                <td>{moment(currnetEmployee.HireDate).format('LL')}</td>
                <td>{currnetEmployee.SalaryBonus}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </MainContainer>
    )
  }
}

export default Employees;