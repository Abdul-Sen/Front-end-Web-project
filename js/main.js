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

    function showGenericModal(title, message) {
        $("#genericModal .modal-title").text(title);
        $("#genericModal .modal-body").text(message);
        $("#genericModal").modal('show');
    }

    function refreshEmployeeRows(employees) {
        console.log(`inside refreshEmployeeRows`);
        //First try
        let myTemplate = _.template(
            '<% _.forEach(employees, function(employee) { %>' +
                '<div class="row body-row" data-id=<%- employee._id %>>' + 
                    '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
                    '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
                    '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
                '</div>' +
            '<% }); %>');

        $("employees-table").empty();
        // console.log(employees[0]._id);
        // console.log(employees[0].FirstName);
        // console.log(employees[0].LastName);
        // console.log(employees[0].Position.PositionName);
        console.log(myTemplate({'employees' : employees}));
         myTemplate({'employees' : employees});
       $("employees-table").append(myTemplate({'employees' : employees}));
    }

    function getFilteredEmployeesModel(filterString)
    {
        let temp = _.filter(employees,function(currentEmp){
            return currentEmp.FirstName == filterString || currentEmp.LastName == filterString || currentEmp.Position.PositionName == filterString;
        });
    }

    function getEmployeeModelById(id) {
        let temp = _.filter(employees,function(currentEmp){
            return currentEmp._id == id;
        });

        let deepArr = _.cloneDeep(temp);
        return deepArr;
    }

    initializeEmployeesModel();

    //Assignment 2 ends
});