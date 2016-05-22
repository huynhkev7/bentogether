$(document).ready(function () {
	if(JSON.parse(localStorage.getItem("currentGroceries")) != null){
		var foods = JSON.parse(localStorage.getItem("currentGroceries"));
	}else{
		var foods = {
		    carrots: {
		        nutrients: 100,
		        carbohydrates: 6,
		        sugar: 2.9,
		        sodium: 42,
		        fat: .1,
		        protein: .6,
		        calories: 25,
		        toggled: false,
		        imageSrc : "images/foods/carrot.png"
		    },
		    soda: {
		        nutrients: 0,
		        carbohydrates: 25,
		        sugar: 25,
		        sodium: 31,
		        fat: 0,
		        protein: 0,
		        calories: 90,		        
		        toggled: false,
		        imageSrc : "http://www.clipartlord.com/wp-content/uploads/2013/12/soda-can.png"
		    },
		    sandwich: {
		        nutrients: 50,
		        carbohydrates: 26,
		        sugar: 15,
		        sodium: 804,
		        fat: 19,
		        protein: 16,
		        calories: 340,		        
		        toggled: false,
		        imageSrc: "images/foods/sandwich.png"
		    },
		    cookies: {
		        nutrients: 0,
		        carbohydrates: 8,
		        sugar: 4,
		        sodium: 55,
		        fat: 4.5,
		        protein: .9,
		        calories: 78,		        
		        toggled: false,
		        imageSrc: "images/foods/cookies.png"
		    },
		    sushi: {
		        nutrients: 75,
		        carbohydrates: 38,
		        sugar: 15,
		        sodium: 350,
		        fat: 7,
		        protein: 9,
		        calories: 255,		        
		        toggled: false,
		        imageSrc: "images/foods/sushi.png"
		    },
		    apple: {
		        nutrients: 75,
		        carbohydrates: 25,
		        sugar: 19,
		        sodium: 2,
		        fat: .3,
		        protein: .5,
		        calories: 95,		        
		        toggled: false,
		        imageSrc: "images/foods/apple.png"		    	
		    },
		    orange: {
		        nutrients: 45,
		        carbohydrates: 11,
		        sugar: 9,
		        sodium: 0,
		        fat: .1,
		        protein: .9,
		        calories: 45,		        
		        toggled: false,
		        imageSrc: "images/foods/orange.png"			    	
		    },
		    pizza: {
		        nutrients: 75,
		        carbohydrates: 36,
		        sugar: 3.8,
		        sodium: 640,
		        fat: 10,
		        protein: 12,
		        calories: 285,		        
		        toggled: false,
		        imageSrc: "images/foods/pizza.png"			    	
		    },
			broccili: {
		        nutrients: 75,
		        carbohydrates: 10,
		        sugar: 2.5,
		        sodium: 49,
		        fat: .5,
		        protein: 4.2,
		        calories: 50,		        
		        toggled: false,
		        imageSrc: "images/foods/broccoli.png"					
			},
			asparagus: {
		        nutrients: 75,
		        carbohydrates: .6,
		        sugar: .3,
		        sodium: 0,
		        fat: 0,
		        protein: .4,
		        calories: 3,		        
		        toggled: false,
		        imageSrc: "images/foods/asparagus.png"					
			},	
			cheese: {
		        nutrients: 75,
		        carbohydrates: .4,
		        sugar: .1,
		        sodium: 174,
		        fat: 9,
		        protein: 7,
		        calories: 113,		        
		        toggled: false,
		        imageSrc: "images/foods/cheese.png"					
			},	
			blueberries: {
		        nutrients: 75,
		        carbohydrates: 21,
		        sugar: 15,
		        sodium: 1,
		        fat: .5,
		        protein: 1.1,
		        calories: 85,		        
		        toggled: false,
		        imageSrc: "images/foods/blueberries.png"					
			},	
			eggs: {
		        nutrients: 75,
		        carbohydrates: .6,
		        sugar: .6,
		        sodium: 62,
		        fat: 5,
		        protein: 6,
		        calories: 78,		        
		        toggled: false,
		        imageSrc: "images/foods/eggs.png"					
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
        	alert("Sorry! Food selected not in database...");
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



