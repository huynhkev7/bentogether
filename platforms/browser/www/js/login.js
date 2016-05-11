$(document).ready(function () {
    $("#login").click(function(){
        var username = $("#username").val().toLowerCase();
        var password = $("#password").val().toLowerCase();
        console.log(username);
        var authUsername = localStorage.getItem("username").toLowerCase();
        var authPassword = localStorage.getItem("password").toLowerCase();
        if(authUsername != null && authPassword != null){
            if(username == authUsername && password == authPassword){
                window.location = 'menu.html';
            }else{
                alert("Your username or password did not match.");
            }
        }else{
            alert("Please create an account.");
        }        
    });

    $("#signup").click(function(){
        localStorage.clear();
        window.location = 'signup.html';
    });  

});