$(document).ready(function () {
    $("#signup").click(function(){
        var username = $("#newUsername").val();
        var password = $("#inputNewPassword").val();
        //var passcode = $("inputNewPassCode").val();

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        //localStorage.setItem("passcode", passcode);

        //initial setup...
        localStorage.setItem("points", 0);


        var store = {
            bow: {
                image: "images/icons/bow-tie.png",
                top: "61px",
                left: "9px",
                width: "167px",
                height: "80px",
                points: 10

            },
            hat: {
                image: "images/icons/hat.png",
                top: "61px",
                left: "15px",
                width: "116px",
                height: "67px",
                points: 50              
            },
            necklace: {
                image: "images/icons/necklace.png",
                top: "71px",
                left: "30px",
                width: "167px",
                height: "100px",
                points: 100         
            }
        };

        closet = {};
        
        localStorage.setItem("closet", JSON.stringify(closet));
        localStorage.setItem("store", JSON.stringify(store));



        //
        window.location = "index.html";

    });
});