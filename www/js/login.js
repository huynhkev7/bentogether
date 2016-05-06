$(document).ready(function () {
    $("#login").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username);
        var authUsername = localStorage.getItem("username");
        var authPassword = localStorage.getItem("password");
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
        window.location = 'signup.html';
    });  

});