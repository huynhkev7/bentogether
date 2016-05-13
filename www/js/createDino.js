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
        window.location = "rewards.html";
    });
    $("#backNav").click(function(){
        window.location = "menu.html";
    });

    function attachAccessory(){
        if(JSON.parse(localStorage.getItem("accessory")) != null){
            var item = JSON.parse(localStorage.getItem("accessory"));
            $.each(item, function(key, item){
                console.log("attachAccessory");
                console.log(item);
                var imageSrc = item["image"];
                console.log(imageSrc);
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
});