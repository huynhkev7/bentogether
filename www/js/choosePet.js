$(document).ready(function () {

    //add points to current user
    //get current user
    var currentUser = localStorage.getItem("currentUser");
    //get current User's bio
    var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));


	var selectedItem = null;

    //new version
    //var points = parseInt(listOfChildren[currentUser]["points"]);

    
    //create list of pets
    function listOfPets(){
        console.log("creating list of pets");
        var pets = JSON.parse(localStorage.getItem("storedPets"));
        console.log(pets);
        var petList = $("#itemContainer div");
        $.each(pets, function(key, value){

            var petTemplate = '<div class="item" value="' + value["hatched"] +'" ><img src="' + value["egg"] + '" class="img-item" width=35 /></div>';
            petList.append(petTemplate);
        });        

        //init to red dino
        $("#petContainer").append('<img src="images/dino2_red.png" class="img-responsive" width=400 />')
        selectedItem = "images/dino2_red.png";

    };

    $("#backNav").click(function(){
        window.location = "menu.html";
    });


    $("#itemContainer div").on("click", ".item", function(){
        selectedItem = $(this).attr("value");
        $("#petContainer").empty();
        $("#petContainer").append('<img src="' + selectedItem + '" class="img-responsive" width=400 />');
    });

    $("#done").click(function(){
        if(selectedItem != null){ 
            listOfChildren[currentUser]["pet"] = selectedItem;
            localStorage.removeItem(listOfChildren);
            localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
            alert("Congratulatons! You have recieved your pet :)");
            window.location = "createDino.html";
        };
        
    });
    //new version
    //$("#points").text(points);

    listOfPets();
});
