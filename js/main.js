/*********************************************************************************
* WEB422 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: _Abdul Rehman________ Student ID: _149019176__ Date: __14/2/19______________
*
********************************************************************************/

//Assignment 3 starts
let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}
function showGenericModal(title, message) {
    $("#genericModal .modal-title").html(title);
    $("#genericModal .modal-body").html(message);
    $("#genericModal").modal("show");
}

function initializeTeams() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.teams = ko.mapping.fromJS(data);
                resolve();
                return;
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
                reject("Error loading team data!");
                return;
            })
    });

}
function initializeEmployees() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.employees = ko.mapping.fromJS(data);
                resolve();
                return;
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
                reject("Error loading employee data!");
                return;
            })
    });
}
function initializeProjects() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.projects = ko.mapping.fromJS(data);
                resolve();//TODO: Might need to return .employees
                return;
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
                reject("Error loading projects data!");
                return;
            })
    });
}

function saveTeam() {
    let currentTeam = this;
       $.ajax({
           url: "https://polar-headland-60757.herokuapp.com/team/" + currentTeam._id(),
           type: "PUT",
            data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
            }),
           contentType: "application/json"
        })
           .done(function(){
               showGenericModal("Success",`${currentTeam.TeamName()} updated successfully`);
           })
           .fail(function(){
               showGenericModal("Error","Error updating team information");
           })
}
//assignment 3 ends
$(function () {
    initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(function () {
            console.log(`done`);
            ko.applyBindings(viewModel);
            $("select.multiple").multipleSelect({ filter: true });
            $("select.single").multipleSelect({ single: true, filter: true });
        })
        .catch(function (errors) {
            console.log(errors);
            showGenericModal("Error", errors);
        });
});