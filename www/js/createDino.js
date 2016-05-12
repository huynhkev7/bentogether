$(document).ready(function () {
    
    var points = parseInt(localStorage.getItem("points"));
    $("#points").text(points);

    $("#createMeal").click(function(){
        window.location = "calendar.html";
    });

    $("#prepareMeal").click(function(){
        window.location = "prepare.html";
    });

    $("#customize").click(function(){
        window.location = "customize.html";
    });
    $("#backNav").click(function(){
        window.location = "createDino.html";
    });
});