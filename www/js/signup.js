$(document).ready(function () {
    $("#signup").click(function(){
        var username = $("#newUsername").val();
        var password = $("#inputNewPassword").val();
        //var passcode = $("inputNewPassCode").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        //localStorage.setItem("passcode", passcode);
        localStorage.setItem("points", 0);
        window.location = "index.html";

    });
});