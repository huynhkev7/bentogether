$(document).ready(function () {
	var foods = {
	    carrots: {
	        nutrients: 100,
	        carbohydrates: 0,
	        sugar: 0,
	        toggled: false,
	        imageSrc : "https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=400%C3%97300&w=400&h=400&fm=png"
	    },
	    soda: {
	        nutrients: 0,
	        carbohydrates: 0,
	        sugar: 100,
	        toggled: false,
	        imageSrc : "https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=400%C3%97300&w=400&h=400&fm=png"
	    },
	    bread: {
	        nutrients: 50,
	        carbohydrates: 50,
	        sugar: 0,
	        toggled: false,
	        imageSrc: "https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=400%C3%97300&w=400&h=400&fm=png"
	    },
	    cookies: {
	        nutrients: 0,
	        carbohydrates: 10,
	        sugar: 100,
	        toggled: false,
	        imageSrc: "https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=400%C3%97300&w=400&h=400&fm=png"
	    },
	    fish: {
	        nutrients: 75,
	        carbohydrates: 75,
	        sugar: 0,
	        toggled: false,
	        imageSrc: "https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=400%C3%97300&w=400&h=400&fm=png"
	    }
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

	//add grocery items to the list.
	$.each( foods, function( key, value ) {
	  var food = key;
	  var thumbnail = value["imageSrc"];
	  $("#groceryContainer").append('<div class="col-sm-12 col-md-12 grocery-item"><div class="thumbnail"><img src=' + thumbnail +  ' alt="..."><div class="caption"><h3 class="foodName">' + food + '</h3><p>...</p><p><a href="#" value=' + food + ' class="btn btn-warning selectFoodButton" role="button">Unselected</a> <a href="#" class="btn btn-default" role="button">Button</a></p></div></div></div>');
	});    
    
	$(".selectFoodButton").each(function(index){
		$(this).click(function(){
			//toggle which grocery items are selected
			var foodName = $(this).attr("value");
			foods[foodName].toggled = !foods[foodName].toggled;
			if(foods[foodName].toggled){
				$(this).toggleClass("btn-warning btn-primary");
				$(this).text("Selected");
			}else{
				$(this).toggleClass("btn-primary btn-warning");
				$(this).text("Unselected");
			}
		});
	});

	$("#submitInitGroceries").click(function(){
		var selectedFoods = {};
		$.each( foods, function( key, value ) {
			if(value["toggled"]){
				selectedFoods[key] = value;
			}
		});
		alert("Saving groceries...");
		localStorage.setItem("currentGroceries", selectedFoods);
		window.location = "addChildren.html";
	});
    //add filtering feature to search bar
	filter("#searchGroceryBar");



});



