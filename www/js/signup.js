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
            },
            "aqua": {
                egg: "images/Pets/b2.png",
                hatched: "images/Pets/b1.png"
            },
            "teal": {
                egg: "images/Pets/teal2.png",
                hatched: "images/Pets/teal1.png"                
            },
            "yellow": {
                egg: "images/Pets/yellow2.png",
                hatched: "images/Pets/yellow1.png"                
            },
            "orange": {
                egg: "images/Pets/orange2.png",
                hatched: "images/Pets/dino1.png"                
            },
            "pink": {
                egg: "images/Pets/pink2.png",
                hatched: "images/Pets/pink1.png"                
            },            
            "purple": {
                egg: "images/Pets/purple2.png",
                hatched: "images/Pets/purple1.png"                
            }, 
            "green": {
                egg: "images/Pets/green2.png",
                hatched: "images/Pets/green1.png"                
            }            
        };

        localStorage.setItem("storedPets", JSON.stringify(pets));
        
        window.location = "index.html";

    });
});