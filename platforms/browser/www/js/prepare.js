$(document).ready(function () {
	//add points to current user
		//get current user
		var currentUser = localStorage.getItem("currentUser");
		//get current User's bio
		var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));

	//new version
	var points = parseInt(listOfChildren[currentUser]["points"]);
	$("#points").text(points);

	var currentTask = 0;
	// var selectedFood = {
	//     carrots: {
	//         nutrients: 100,
	//         carbohydrates: 0,
	//         sugar: 0,
	//         toggled: false,
	//         image: "images/foods/carrot.png"
	//     },
	//     apple: {
	//         nutrients: 0,
	//         carbohydrates: 0,
	//         sugar: 100,
	//         toggled: false,
	//         image: "images/foods/apple.png"
	//     },
	//     sandwhich: {
	//         nutrients: 50,
	//         carbohydrates: 50,
	//         sugar: 0,
	//         toggled: false,
	//         image: "images/foods/sandwich.png"
	//     },
	//     cookies: {
	//         nutrients: 0,
	//         carbohydrates: 10,
	//         sugar: 100,
	//         toggled: false,
	//         image: "images/foods/cookies.png"
	//     }	
	// };

	var selectedFood = null;
	$.each(listOfChildren[currentUser]["meals"], function(key, value){
		selectedFood = value;
	});
	console.log(selectedFood);
	var tasks = {
		sandwich: {
			task: "create sandwhich",
			points: 20,
			image: "images/foods/sandwich.png"	
		},
		apple: {
			task: "cut the apples",
			points: 10,
			image: "images/foods/apple.png"	
		},
		cookies: {
			task: null,
			points: null,
			image: "images/foods/cookies.png"	
		},
		carrots: {
			task: "cut carrots",
			points: 30,
			image: "images/foods/carrot.png"	
		},
		sushi: {
			task: "wrap the sushi",
			points: 100,
			image: "images/foods/sushi.png"
		},	
		soda: {
			task: null,
			points: null,
			image: "http://www.clipartlord.com/wp-content/uploads/2013/12/soda-can.png"			
		}
	};

	var selectedTasks = {

	};

	$("#backNav").click(function(){
		window.location = "createDino.html";
	});

	function updatePoints(newPoints){

		/* old version 
		localStorage.removeItem("points");
		localStorage.setItem("points", newPoints);
		$("#points").text(newPoints);
		*/
		//new version...
		listOfChildren[currentUser]["points"] = newPoints;
		localStorage.removeItem(listOfChildren);
		localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
		$("#points").text(newPoints);
	};

	function createTaskNumbers(){
		var currentTaskNumber = 2;
		$taskNumberListElement = $("#taskNumberList");
		//create task number for gathering ingredients
		$taskNumberListElement.append('<div class="col-xs-2"><div class="circle"><span class="taskNumber">1</span></div></div>');
		//create task numbers for making food...
		$.each(selectedFood, function(key, value){
			//if there is a task for the current food item then create a task number...
			console.log(key);
			if(tasks[key]["task"] != null){
				console.log(tasks[key]["task"]);
				selectedTasks[key] = tasks[key];
				var $taskNumberTemplate = '<div class="col-xs-2"><div value="' + key + '" class="circle"><span class="taskNumber">' + currentTaskNumber + '</span></div></div>';
				$taskNumberListElement.append($taskNumberTemplate);
				currentTaskNumber++;
			};
		});
		//create task number for building bento box
		$taskNumberListElement.append('<div class="col-xs-2"><div class="circle"><span class="taskNumber">' + currentTaskNumber + '</span></div></div>');
	}

	function gatherIngredients(){
		$(".circle:eq(" + currentTask + ")").addClass("circleActive");
		$("#taskPrompt").text("Get ingredients out.");
		//create the list of ingredients
		var $unorderedListElement = $("<ul class='list-unstyled'></ul>");
		$.each(selectedFood, function(key, value){
			$liElement = $('<li><img src=' + value["imageSrc"]  + ' width=60/>&nbsp;&nbsp;' + key + '</li>');
			$unorderedListElement.append($liElement);
		});
		$("#taskArea").append($unorderedListElement);
		$("#pointStar").text(10);
	};

	function buildBento(){
		$("#taskPrompt").text("Put food in bento box.");
		//create the list of ingredients
		var $content = $("<div class='col-xs-12'><img src='images/bentogether_screen_design.png' width=300 /></div>");
		$('#taskArea').empty();
		//$("#taskArea").append($content);

	    var clone = listOfChildren[currentUser]["pendingMeal"];
	    $("#taskArea").append(clone);		
		$("#pointStar").text(5);
	}

	function buildTask(currentFood){
		console.log(selectedTasks);
		console.log(currentFood);
		var prompt = selectedTasks[currentFood]["task"];
		// console.log(prompt);
		// console.log(selectedTasks[currentFood]);
		var points = selectedTasks[currentFood]["points"];
		var img = selectedTasks[currentFood]["image"];
		$("#taskPrompt").text(prompt);
		var $content = $("<div class='col-xs-12'><img src='" + img + "' width=300 /></div>");
		$('#taskArea').empty();
		$("#taskArea").append($content);	
		$("#pointStar").text(points);	
	};

	function buildMessage(){
		$("#taskPrompt").text("Would you like to send a message to " + localStorage.getItem("currentUser") + "?");
		var $content = $('<textarea class="form-control" rows="6"></textarea>');
		$('#taskArea').empty();
		$("#taskArea").append($content);	
		$("#approveFooter h3").text("");
		$("#buttonContainer").empty();
		$("#buttonContainer").append('<div class="col-xs-6 skip"><button type="button" value="no" class="btn btn-danger btn-lg btn-block">Skip</button></div>');			
	};
             

 	function finalizeTask(){
		$("#taskPrompt").text("You have just prepared this meal!");
		var $content = $("");
		$('#taskArea').empty();
		$("#taskArea").append($content);	
		//this will change later on... due to messages in specific user accounts
		if(listOfChildren[currentUser]["messages"][0] != null){
			var $contentTwo = $("<h3>With this message...</h3><div id='messageBox'>" + listOfChildren[currentUser]["messages"][0] + "</div>");			
			$("#taskArea").append($contentTwo);
		}
		$("#approveFooter h3").text("");
		$("#buttonContainer").empty();
		$("#buttonContainer").append('<div class="col-xs-6 done"><button type="button" value="no" class="btn btn-danger btn-lg btn-block">Done</button></div>');			
 	};  

	$(".approveButton").click(function(){
		//update the task number
		var buttonType = $(this).attr("value");

		if(buttonType == "yes"){
			points += parseInt($("#pointStar").text());
			console.log("points: " + points);
			updatePoints(points);
		};

		currentTask++;
		var currentTaskNumber = $(".circle:eq(" + (currentTask) + ")");
		$(".circle:eq(" + (currentTask - 1) + ")").removeClass("circleActive");
		currentTaskNumber.addClass("circleActive");
		//display food task
		if((currentTask + 1) == (Object.keys(selectedTasks).length + 2)) {
			console.log("entering");
			buildBento();
		}else if((currentTask + 1) <  (Object.keys(selectedTasks).length + 2) ){
			var currentFood = currentTaskNumber.attr("value");
			buildTask(currentFood);
		}else{
			buildMessage();
		}
		//if it is the last food task then build the last task		
	});	

	$()

	$("#buttonContainer").on('click', '.skip > button',function(){
		finalizeTask();
	});

	$("#buttonContainer").on('click', '.done > button',function(){
		//delete the meal plan from storage
		//go back to createDino.html
		window.location = "createDino.html";
	});

	$('#taskArea').on('keypress', 'textarea', function (e) {
	  if (e.which == 13) {
	  	var message = $("textarea").val();
	  	console.log(message);
	  	listOfChildren[currentUser]["messages"].push(message);
	  	console.log(listOfChildren[currentUser]["messages"]);
	  	localStorage.removeItem("listOfChildren");
	    localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
	    finalizeTask();
	    return false;    //<---- Add this line
	  }
	});

	$("#approveFooter h3").text("Is " + localStorage.getItem("currentUser") + " Involved?");

	createTaskNumbers();
	gatherIngredients();
});
