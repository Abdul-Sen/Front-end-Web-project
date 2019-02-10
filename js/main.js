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
                resolve();//TODO: Might need to return .employees
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


    //Assignment 2 starts
    let employeesModel = [];
    function initializeEmployeesModel() {
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                employeesModel = data;
                refreshEmployeeRows(employeesModel);
            })
            .fail(function (err) {
                console.log("error: " + err.statusText);
                showGenericModal('Error', 'Unable to get Employees');
            });
    }

    function showGenericModal(title, message) {
        // $("#genericModal").empty(); //TODO: WHY IS THIS NOT WORKING?
        $("#genericModal .modal-title").html(title);
        $("#genericModal .modal-body").html(message);
        $("#genericModal").modal("show");
    }

    function refreshEmployeeRows(employees) {
        //First try
        let myTemplate = _.template(
            '<% _.forEach(employees, function(employee) { %>' +
            '<div class="row body-row" data-id=<%- employee._id %>>' +
            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
            '</div>' +
            '<% }); %>');

        $("#employees-table").empty();
        myTemplate({ 'employees': employees });
        $("#employees-table").append(myTemplate({ 'employees': employees }));
    }

    function getFilteredEmployeesModel(filterString)//TODO: Finish this
    {
        return _.filter(employeesModel, function (currentEmp) {
            if ((currentEmp.FirstName.toUpperCase()).includes(filterString.toUpperCase())
                || (currentEmp.LastName.toUpperCase()).includes(filterString.toUpperCase())
                || (currentEmp.Position.PositionName.toUpperCase()).includes(filterString.toUpperCase())) {
                return currentEmp;
            }
        });
    }

    function getEmployeeModelById(id) {
        let temp = _.filter(employeesModel, function (currentEmp) {
            return currentEmp._id == id;
        });

        let deepArr = _.cloneDeep(temp);
        return deepArr;
    }

    initializeEmployeesModel();

    $("#employee-search").keyup(function () {

        refreshEmployeeRows(getFilteredEmployeesModel((this).value)); //refreshes row /w a given string
    });

    $("#employees-table").on("click", ".body-row", function () { // watch the whole document for when existing (or new) tr elements are clicked
        let result = getEmployeeModelById($(this).attr("data-id"));

        result[0].HireDate = moment(result[0].HireDate).format("LL"); //creating a moment obj, then formating date, then setting that date to the current obj
        let bodyTemplate = _.template(
            '<strong>Address:</strong>' +
            '<%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %> <%-employee.AddressZip %>' +
            '<br> <strong>Phone Number:</strong>' +
            '<%- employee.PhoneNum %> ext: <%-employee.Extension%><br>' +
            '<strong>Hire Date:</strong>' +
            '<%- employee.HireDate %>');

        let templateBody = bodyTemplate({ 'employee': result[0] });
        showGenericModal(result[0].FirstName + " " + result[0].LastName, templateBody);
    });


    //Assignment 2 ends
});