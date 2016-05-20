$(document).ready(function () {
	if(JSON.parse(localStorage.getItem("currentGroceries")) != null){
		var foods = JSON.parse(localStorage.getItem("currentGroceries"));
	}else{
		var foods = {
		    carrots: {
		        nutrients: 100,
		        carbohydrates: 0,
		        sugar: 0,
		        sodium: 80,
		        fat: 10,
		        protein: 13,
		        calories: 150,
		        toggled: false,
		        imageSrc : "images/foods/carrot.png"
		    },
		    soda: {
		        nutrients: 0,
		        carbohydrates: 0,
		        sugar: 100,
		        sodium: 50,
		        fat: 5,
		        protein: 2,
		        calories: 80,		        
		        toggled: false,
		        imageSrc : "http://www.clipartlord.com/wp-content/uploads/2013/12/soda-can.png"
		    },
		    sandwich: {
		        nutrients: 50,
		        carbohydrates: 50,
		        sugar: 0,
		        sodium: 20,
		        fat: 55,
		        protein: 10,
		        calories: 400,		        
		        toggled: false,
		        imageSrc: "images/foods/sandwich.png"
		    },
		    cookies: {
		        nutrients: 0,
		        carbohydrates: 10,
		        sugar: 100,
		        sodium: 30,
		        fat: 50,
		        protein: 4,
		        calories: 200,		        
		        toggled: false,
		        imageSrc: "images/foods/cookies.png"
		    },
		    sushi: {
		        nutrients: 75,
		        carbohydrates: 75,
		        sugar: 0,
		        sodium: 200,
		        fat: 25,
		        protein: 20,
		        calories: 150,		        
		        toggled: false,
		        imageSrc: "images/foods/sushi.png"
		    }
		};	
	};

	//filter search bar on grocery list
	function filter(element){
		$(element).keyup(function(){
			var value = $(this).val();
		    $("#groceryContainer > .grocery-item").each(function() {
		    	var foodName = $(this).find(".foodName").text();
		        if (foodName.search(value) > -1) {
		            $(this).show();
		        }
		        else {
		            $(this).hide();
		        }
		    }); 
		});
	}

    $("#allergyList").on('click', '.circle', function(){
        var foodName = $(this).next().text();
        if(foods[foodName] != null){
        	foods[foodName].toggled = !foods[foodName].toggled;
        }else{
        	alert("no matching food");
        };
        if($(this).hasClass("circleActive")){
            $(this).removeClass("circleActive");
        }else{
            $(this).addClass("circleActive");
        }
    });

    $("#addAllergyIcon").click(function(){
        var allergyTemplate = '<div class="row addAllergyRow"> <div class="circle col-xs-3"></div><input type="childName" class="form-control addAllergyInput' + ' placeholder="Allergy..."></div>';
        $("#allergyList").append(allergyTemplate);
         $('.addAllergyInput').keypress(function (e) {
          if (e.which == 13) {
            var allergyAnswer = $(this).val();
            $(this).after("<div class='allergy'>" + allergyAnswer + "</div>");
            $(this).remove();
           	foods[allergyAnswer] = {
	        	nutrients: null,
	        	carbohydrates: null,
	        	sugar: null,
	        	toggled: false,
	        	imageSrc : null       		
           	};
            //$(".addAllergyRow").append("<div class='allergy'>" + allergyAnswer + "</div>");
            return false;    //<---- Add this line
          }
        });   
    });

	//add grocery items to the list.
	$.each( foods, function( key, value ) {
	  var food = key;
	  var thumbnail = value["imageSrc"];
	  if(value["toggled"]){
	  	var foodTemplate = '<div class="row"><div class="circle circleActive col-xs-3"></div><div class="allergy">' + key + '</div></div>';
	  }else{
		var foodTemplate = '<div class="row"><div class="circle col-xs-3"></div><div class="allergy">' + key + '</div></div>';
	  };
	  $("#allergyList").append(foodTemplate);
	});    
    
	// $(".selectFoodButton").each(function(index){
	// 	$(this).click(function(){
	// 		//toggle which grocery items are selected
	// 		var foodName = $(this).attr("value");
	// 		foods[foodName].toggled = !foods[foodName].toggled;
	// 		if(foods[foodName].toggled){
	// 			$(this).toggleClass("btn-warning btn-primary");
	// 			$(this).text("Selected");
	// 		}else{
	// 			$(this).toggleClass("btn-primary btn-warning");
	// 			$(this).text("Unselected");
	// 		}
	// 	});
	// });

	$("#notification").click(function(){
		//var selectedFoods = {};
		//$.each( foods, function( key, value ) {
			//store all foods including ones that have been selected
			//if(value["toggled"]){
				//selectedFoods[key] = value;
			//}
		//});

		localStorage.removeItem("currentGroceries");
		localStorage.setItem("currentGroceries", JSON.stringify(foods));
		window.location = "menu.html";
	});
    //add filtering feature to search bar
	// filter("#searchGroceryBar");



});



