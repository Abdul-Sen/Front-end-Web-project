$(function() {
    console.log(`hello again world!`);

    $("#teams-menu").on("click",function () { 
        event.preventDefault();
        //Making AJAX GET request
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/teams",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {

            $("#data").empty();
            data = JSON.stringify(data);
            $("#data").append( "<h3>Teams</h3>",data);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
        
    });

    $("#employees-menu").on("click",function () { 
        event.preventDefault();
        //Making AJAX GET request
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {

            $("#data").empty();
            data = JSON.stringify(data);
            $("#data").append( "<h3>Employees</h3>",data);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
        
    });


    $("#projects-menu").on("click",function () { 
        event.preventDefault();
        //Making AJAX GET request
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {

            $("#data").empty();
            data = JSON.stringify(data);
            $("#data").append( "<h3>Projects</h3>",data);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
        
    });

    $("#positions-menu").on("click",function () { 
        event.preventDefault();
        //Making AJAX GET request
        $.ajax({
            url: "https://polar-headland-60757.herokuapp.com/positions",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {

            $("#data").empty();
            data = JSON.stringify(data);
            $("#data").append( "<h3>Positions</h3>",data);
        })
        .fail(function (err) {
            console.log("error: " + err.statusText);
        });
        
    });

});