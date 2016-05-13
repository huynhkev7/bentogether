$(document).ready(function () {

    //add points to current user
    //get current user
    var currentUser = localStorage.getItem("currentUser");
    //get current User's bio
    var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));
    
    /* old version
    var points = parseInt(localStorage.getItem("points"));
    $("#points").text(points);
    */

    //new version
    var points = parseInt(listOfChildren[currentUser]["points"]);
    $("#points").text(points);
    

    $("#createMeal").click(function(){
        window.location = "calendar.html";
    });

    $("#prepareMeal").click(function(){
        window.location = "prepare.html";
    });

    $("#customize").click(function(){
        window.location = "rewards.html";
    });
    $("#backNav").click(function(){
        window.location = "menu.html";
    });

    function attachAccessory(){
        if(listOfChildren[currentUser]["accessory"] != null){
            var item = listOfChildren[currentUser]["accessory"];
            $.each(item, function(key, item){
                var imageSrc = item["image"];
                var leftPos = item["left"];
                var topPos = item["top"];
                var width = item["width"];
                var height = item["height"];
                var accessoryTemplate = $("<img src=" + imageSrc + " />");
                accessoryTemplate.css({
                    'top': topPos,
                    'left': leftPos,
                    'width': width,
                    'height': height,
                    'position': 'absolute'              
                });
                $("#accessory").empty();
                $("#accessory").append(accessoryTemplate); 
            });
        
        }
    };


    attachAccessory();  
     
    //pick what color of pet
    $("#petContainer").append('<img src="' + listOfChildren[currentUser]["pet"] + '" class="img-responsive" width=400 />')    

});