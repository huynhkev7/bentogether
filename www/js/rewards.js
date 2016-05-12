$(document).ready(function () {
	var selectedItem = null;
	if(JSON.parse(localStorage.getItem("store")) == null){
		var store = {
			bow: {
				image: "images/icons/bow-tie.png",
				top: "61px",
				left: "9px",
				width: "167px",
				height: "80px"

			},
			hat: {
				image: "images/icons/hat.png",
				top: "61px",
				left: "15px",
				width: "116px",
				height: "67px"
			},
			necklace: {
				image: "images/icons/necklace.png",
				top: "71px",
				left: "30px",
				width: "167px",
				height: "100px"
			}
		};

		localStorage.setItem("store", JSON.stringify(store));
	}
    
	var store = JSON.parse(localStorage.getItem("store"));

	var closet = JSON.parse(localStorage.getItem("closet"));
	if(!closet){
		closet = {};
		localStorage.setItem("closet", JSON.stringify(closet));
		
	}
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

    function createCloset(){
    	
    	$("#itemContainer > div").empty();
    	$("#itemContainer > div").append($("<div class='item' style='float: left'></div>"));
    	$.each(JSON.parse(localStorage.getItem("closet")), function(key, value){
    		console.log(JSON.parse(localStorage.getItem("closet")));
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
    			var template = '<div class="item" style="float: left"><img src="' + value["image"] + '" value="' + key +  '" class="img-item" width=40 /></div>';
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

    //add item from store to closet
    // $("#itemContainerStore").on("click", ".item", function(){
    // 	var itemName = $(this).find(".img-item").attr("value");
    // 	//if not in closet then add it and remove from store
    // 	if(closet[itemName] == null){

    // 		closet[itemName] = store[itemName];
    // 		localStorage.removeItem("closet");
    // 		localStorage.setItem("closet", JSON.stringify(closet));

    // 		delete store[itemName];
    // 		localStorage.removeItem("store");
    // 		localStorage.setItem("store", JSON.stringify(store));

    // 		$("#itemContainer > div").append($(this));	

    // 		console.log(JSON.parse(localStorage.getItem("closet")));
    // 		console.log(JSON.parse(localStorage.getItem("store")));
    // 	}
    // });

    console.log($("#closet"));


    function applyAccessory(){
    	console.log("applying accessory...");
    	//if item is selected then put it on pet
    	if(selectedItem != null){
    		var itemName = selectedItem.find(".img-item").attr("value");
    		console.log("item name is: " + itemName);
    		//check if item is in closet or store...
    		if(selectedItem.parent().parent().is("#itemContainerStore")){
    			var item = store[itemName];
    		}else{
    			var item = closet[itemName];
    		}
    		console.log("item is:");
    		console.log(item);
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
    		console.log("item template: ");
    		console.log(accessoryTemplate);
    		$("#accessory").empty();
    		$("#accessory").append(accessoryTemplate);
    	}else{
    		$("#accessory").empty();    		
    	};	
    };

    //highlight/unlight and select item. Test out item on pet
    $("#customizeFooter").on("click", '.item', function(){
    	if(selectedItem == null){
    		console.log("null");
    		selectedItem = $(this);
    		selectedItem.css("opacity", ".5");
    	}else if($(this).find(".img-item").attr("value") && $(this).find(".img-item").attr("value") != selectedItem.find(".img-item").attr("value")){
    		//clear previous selected item
    		console.log("the different");
    		selectedItem.css("opacity", "1");
    		selectedItem = $(this);
    		selectedItem.css("opacity", ".5");

    	}else{
    		console.log("the same");
    		selectedItem.css("opacity", "1");
    		selectedItem = null;
    	}
    	console.log("about to enter accessory function...");
    	applyAccessory();
    });

    //when user clicks done.. if item is in store, add it to closet
    $("#done").click(function(){
    	console.log(selectedItem);
    	if(selectedItem != null){
    		//if in store, then add it to closet
    		if(selectedItem.parent().parent().is("#itemContainerStore")){
    			var itemName = selectedItem.find(".img-item").attr("value");
	    		closet[itemName] = store[itemName];
	    		localStorage.removeItem("closet");
	    		localStorage.setItem("closet", JSON.stringify(closet));

	    		delete store[itemName];
	    		localStorage.removeItem("store");
	    		localStorage.setItem("store", JSON.stringify(store));
	    		createCloset();
	    		createStore();

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
    attachAccessory();
    createCloset();
    createStore();
});




// var stars = JSON.parse(localStorage.getItem('stars'));

// document.getElementById('red').onclick = function() {
//     if (stars < 250) {
//         return;
//     }
//     localStorage.setItem('stars', stars - 250);
//     localStorage.setItem('red', 'true');
//     updateUI();
// }

// function updateUI() {
//     document.getElementById('stars').innerHTML = JSON.parse(localStorage.getItem('stars'));
// }

// updateUI();