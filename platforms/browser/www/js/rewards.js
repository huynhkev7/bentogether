$(document).ready(function () {
	var selectedItem = null;

	var store = JSON.parse(localStorage.getItem("store"));

	var closet = JSON.parse(localStorage.getItem("closet"));

    var points = parseInt(localStorage.getItem("points"));


    $("#backNav").click(function(){
        window.location = "createDino.html";
    });

    $("#points").text(points);
    $("#closet").css("background-color", "#48C8F3");
    $("#closet").css("color", "white");

    function attachAccessory(){
    	if(JSON.parse(localStorage.getItem("accessory")) != null){
    		var item = JSON.parse(localStorage.getItem("accessory"));
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

    function createCloset(){
    	
    	$("#itemContainer > div").empty();
    	$("#itemContainer > div").append($("<div class='item' style='float: left'></div>"));
    	$.each(JSON.parse(localStorage.getItem("closet")), function(key, value){
    		//if item is not in closet, then add it to store
			var template = '<div class="item" style="float: left"><img src="' + value["image"] + '" value="' + key +  '" class="img-item" width=40 /></div>';
			$("#itemContainer > div").append(template);
    	});
    };


    function createStore(){
    	$("#itemContainerStore > div").empty();
    	$.each(JSON.parse(localStorage.getItem("store")), function(key, value){
    		//if item is not in closet, then add it to store
    		if(closet[key] == null){
    			var template = '<div class="item" style="float: left"><span class="pointsRequired">' +  value["points"] + '</span><img src="images/star.png"  class="pointStar"width=30 /><img src="' + value["image"] + '" value="' + key +  '" class="img-item" width=40 /></div>';
    			$("#itemContainerStore > div").append(template);
    		}
    	});
    };

    $("#closet").click(function(){
    	if(!$(this).hasClass("controlActive")){
    		$(this).addClass("controlActive");
		    $(this).css("background-color", "#48C8F3");
		    $(this).css("color", "white");
		    $("#store").css("background-color", "white");
		    $("#store").css("color", "#48C8F3");	
		    $("#store").removeClass("controlActive");	 
		    $("#itemContainer").css("display", "block");
		    $("#itemContainerStore").css("display", "none");
    	}
    });

    $("#store").click(function(){
    	if(!$(this).hasClass("controlActive")){
    		$(this).addClass("controlActive");
		    $(this).css("background-color", "#48C8F3");
		    $(this).css("color", "white");
		    $("#closet").css("background-color", "white");
		    $("#closet").css("color", "#48C8F3");	
		    $("#closet").removeClass("controlActive");	 
		    $("#itemContainerStore").css("display", "block");
		    $("#itemContainer").css("display", "none");
    	}

    });

    function applyAccessory(){
    	//if item is selected then put it on pet
    	if(selectedItem != null){
    		var itemName = selectedItem.find(".img-item").attr("value");
    		//check if item is in closet or store...
    		if(selectedItem.parent().parent().is("#itemContainerStore")){
    			var item = store[itemName];
    		}else{
    			var item = closet[itemName];
    		}
    		var imageSrc = item["image"];
    		var leftPos = item["left"];
    		var topPos = item["top"];
    		var width = item["width"];
    		var height = item["height"];
    		var accessoryTemplate = $("<img src='" + imageSrc + "' />");
    		accessoryTemplate.css({
				'top': topPos,
				'left': leftPos,
				'width': width,
				'height': height,
				'position': 'absolute'    			
    		});
    		$("#accessory").empty();
    		$("#accessory").append(accessoryTemplate);
    	}else{
    		$("#accessory").empty();    		
    	};	
    };

    //highlight/unlight and select item. Test out item on pet
    $("#customizeFooter").on("click", '.item', function(){
    	if(selectedItem == null){
    		selectedItem = $(this);
    		selectedItem.css("opacity", ".5");
    	}else if($(this).find(".img-item").attr("value") && $(this).find(".img-item").attr("value") != selectedItem.find(".img-item").attr("value")){
    		//clear previous selected item
    		selectedItem.css("opacity", "1");
    		selectedItem = $(this);
    		selectedItem.css("opacity", ".5");

    	}else{
    		selectedItem.css("opacity", "1");
    		selectedItem = null;
    	}
    	applyAccessory();
    });

    //when user clicks done.. if item is in store, add it to closet
    $("#done").click(function(){
    	if(selectedItem != null){
    		//if in store, then add it to closet
    		if(selectedItem.parent().parent().is("#itemContainerStore")){
    			var itemName = selectedItem.find(".img-item").attr("value");
    			var currentPoints = parseInt(localStorage.getItem("points"));
    			if(currentPoints >= store[itemName]["points"]){

    				//update points
		    		localStorage.removeItem("points");
		    		localStorage.setItem("points", currentPoints - store[itemName]["points"]);

		    		//update closet
		    		closet[itemName] = store[itemName];
		    		localStorage.removeItem("closet");
		    		localStorage.setItem("closet", JSON.stringify(closet));

		    		//delete item from store
		    		delete store[itemName];
		    		localStorage.removeItem("store");
		    		localStorage.setItem("store", JSON.stringify(store));

		    		$("#points").text(parseInt(localStorage.getItem("points")));
		    		createCloset();
		    		createStore();    		
		    		alert("Congratulations! You have purchased this item!");		
    			}else{
    				alert("Sorry! Not enough points to get this item.");
    			}


    		}else{
    			//if in closet then finalize it in localStorage
    			alert("Accessory has been added to your pet!");
    			var itemName = selectedItem.find(".img-item").attr("value");
    			var accessoryObj = {};
    			accessoryObj[itemName] = closet[itemName];
    			localStorage.removeItem("accessory");
    			localStorage.setItem("accessory", JSON.stringify(accessoryObj));
    		}
    	}
    });
    
    $("#points").text(parseInt(localStorage.getItem("points")));
    attachAccessory();
    createCloset();
    createStore();
   	$("#itemContainerStore").css("display", "none");
});
