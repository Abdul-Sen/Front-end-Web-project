$(function () {
    console.log(`hello again world!`);
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

    initializeEmployeesModel();

    function showGenericModal(title, message) {
        $("#genericModal .modal-title").text(title);
        $("#genericModal .modal-body").text(message);
        $("#genericModal").modal('show');
    }

    function refreshEmployeeRows(employees) {
        console.log(`inside refreshEmployeeRows`);
        //First try
        let myTemplate = _.template(`<% _.forEach(employees, function(currentEmp){ %>` + //evaluate
            + `<div class="row body-row" data-id=" <%-currentEmp._id%>"> ` //escape start
            + `<div class="col-xs-4 body-column"> <%-currentEmp.FirstName%> </div>`
            + `<div class="col-xs-4 body-column"><%-currentEmp.LastName%> </div>`
            + `<div class="col-xs-4 body-column"><%-currentEmp.Position.PositionName%> </div>` //escape end
            + `<% }); %>` + `</div>`);
        $("employees-table").empty();
        console.log(employees[0]._id);
        console.log(employees[0].FirstName);
        console.log(employees[0].LastName);
        console.log(employees[0].Position.PositionName);
        // console.log(myTemplate({'employees' : employees}));
      //  $("employees-table").append();
        
    }

    //Assignment 2 ends
});