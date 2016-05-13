$(document).ready(function () {
    $("#signup").click(function(){
        var username = $("#newUsername").val();
        var password = $("#inputNewPassword").val();
        //var passcode = $("inputNewPassCode").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        var pets = {
            "red":  {
                egg: "images/red_egg.png",
                hatched: "images/dino2_red.png"
            },
            "blue": {
                egg: "images/egg_unhatched.png",
                hatched: "images/dino_blue.png"
            }
        };

        localStorage.setItem("storedPets", JSON.stringify(pets));
        
        window.location = "index.html";

    });
});