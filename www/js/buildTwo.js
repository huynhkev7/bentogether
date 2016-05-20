$(document).ready(function () {
    var colors = ["rgb(170, 221, 255)", "#2ecc71", "#e67e22", "#1abc9c", "#f1c40f"];
    var colorIndex = 0;
    //add points to current user
    //get current user
    var currentUser = localStorage.getItem("currentUser");
    //get current User's bio
    var currentClonedElement = null;

    var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));

  var activeDropZones  = {

  };


	var selectedItem = null;
  var selectedTab = "small";

	var food = JSON.parse(localStorage.getItem(["currentGroceries"]));
    //filter out to selected
    $.each(food, function(key, value){
        //if not selected delete it
        if(!value["toggled"]){
            delete food[key]
        };
    });

    //new version
    var points = parseInt(listOfChildren[currentUser]["points"]);

    $("#backNav").click(function(){
        window.location = "createMeal.html";
    });

    $("#points").text(points);

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

    function createFoodItems(foodType){
        $itemContainer = $("#itemContainer div");
        $.each(food, function(key, value){
            //var foodTemplate = '<div class="item" style="float: left"><img src="' + value["imageSrc"] + '" value="' + key +  '" class="img-item" width=40 /></div>';
            var foodTemplate = $('<div class="item drag-element-source drag-element" value="' + key + '" ><img src=' + value["imageSrc"] +  ' class="img-item" width=40 /></div>');
            foodTemplate.css("float", "left");
            $itemContainer.append(foodTemplate);
        });
    };
/* DRAG FEATURES */
        // var associatedDropZones  =  {
        //   primaryDropZone: $(dropzoneElement).attr("id"),
        //   leftSide: sides["left"],
        //   rightSide: sides["right"],
        //   leftDiagonal: diagonals["diagonalLeft"],
        //   rightDiagonal: diagonals["diagonalRight"],
        //   topBottom: topBottom
        // };
  function updateUI(currentDropZone, neighborDropZone, draggableElement){
    //alert("entering updateUI: " + currentDropZone);
    console.log(currentDropZone);
    var foodName = $(draggableElement).attr("value");
    var foodSrc = food[foodName]["imageSrc"]; 
    var foodTemplate = '<img src=' + foodSrc +  ' class="img-item img-responsive" width=65 />'
    $("#" + currentDropZone).css("background-color", colors[colorIndex]);
    $("#" + currentDropZone).attr("value", foodName);
    $("#" + currentDropZone).append(foodTemplate);
    $.each(neighborDropZone, function(index, value){
      $("#" + value).css("background-color", colors[colorIndex]);
      $("#" + value).append(foodTemplate);
    });
    colorIndex++;

    //delete clone
    $(draggableElement).remove();
  };

  function addToActiveDropZones(currentDropzone, draggableElement){
    var found = true;
    //validating...
    if($.isEmptyObject(activeDropZones)){
      console.log("enteirngfFirst");
      $.each(currentDropzone, function(key,value){
        activeDropZones[key] = value;
        console.log(key);
        updateUI(key, value, draggableElement);
      });
    }else{
      $.each(currentDropzone, function(key, value){
        //check current key to all keys
        if(!(key in activeDropZones)){
          if(value.length == 0){
            found = false;
          }else{
            console.log("checking key to key...");
            $.each(activeDropZones, function(activeKey, activeValue){
              console.log("checking main to neighbors..");
              //check main key to all neighbors, if not in then continue
              console.log(($.inArray( key , activeValue )));
              console.log(($.inArray( activeKey , value )));
              if(($.inArray( key , activeValue )) == -1 && ($.inArray( activeKey , value ) == -1)){
                //check neighbor to neighbor, if not in then notFound is true
               if(activeValue.length == 0){
                found = false;
               }else{
                 $.each(value, function(index, currentValue){
                  // console.log("checking neighbors to neighbors");
                  // console.log("current value: " + currentValue);
                  // console.log("comparing to array: ");
                  // console.log(activeValue);
                  if(($.inArray(currentValue, activeValue)) == -1){
                    found = false;
                  }else{
                    found = true;
                  }
                 });
               }
              }else{
                //alert("did not pass!");
                found = true;
                //console.log("found is: " + found);
              }
            });
          }

        }
      });
      //if not found then add it to activeDrop
      if(!found){
        $.each(currentDropzone, function(key,value){
          activeDropZones[key] = value;
          updateUI(key, value,draggableElement);
        });
      }else{
        alert("Sorry, one of pods already in use");
        //delete clone
        $(draggableElement).remove();        
      };

    };
  
    console.log("activeDrop");
    console.log(activeDropZones);
  };
  function topBottomNeighbor($droppedElement, rowType){
    //if neighbor is in first row... check bottom
    if(rowType == "topRow"){
      var neighborIndex = $droppedElement.index() + 3;
    }
    //if neighbor is in second row... check top
    else{
      var neighborIndex = $droppedElement.index() - 3;
    };
    var neighborElement = $($(".pod").get(neighborIndex)).attr("id");
    console.log(neighborElement);
    //alert("neighbor selected is: "  + neighborIndex);
    return neighborElement;
  };

  function getSideNeighbors($droppedElement,rowType){
    //get next() and previous() elements
    $previousNeighbor = $droppedElement.prev();
    $nextNeighbor = $droppedElement.next();
    //if the side neighbor is not in the same row as dropzone, then null it!
    if($previousNeighbor != null && !$previousNeighbor.hasClass(rowType)){
      $previousNeighbor = null;
    }

    if($nextNeighbor != null && !$nextNeighbor.hasClass(rowType)){
      $nextNeighbor = null;
    }
    
    return {
      left: ($previousNeighbor != null) ? $previousNeighbor.attr("id") : null,
      right:($nextNeighbor != null) ? $nextNeighbor.attr("id") : null
    };
  };

  function getDiagonals(topBottomElement , oppositeRowType){
    console.log("getting diagonals from element " + topBottomElement);
    var $topBottomElement = $(topBottomElement);
    var diagonals = getSideNeighbors($topBottomElement, oppositeRowType);
    return {
      diagonalLeft: diagonals["left"],
      diagonalRight: diagonals["right"]
    };
  };
// target elements with the "draggable" class
    interact('.drag-element').draggable({
      'manualStart' : true,      
      'onmove' : function (event) {

        var target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
        // translate the element
        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

      },
      'onend' : function (event) {
        console.log('Draggable: ', event);
        //console.log(event);
        currentClonedElement.remove();
      }
    }).on('move', function (event) {

      var interaction = event.interaction;

      // if the pointer was moved while being held down
      // and an interaction hasn't started yet
      if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.classList.contains('drag-element-source')) {

        var original = event.currentTarget;
        
        // create a clone of the currentTarget element
        var clone = event.currentTarget.cloneNode(true);

        // Remove CSS class using JS only (not jQuery or jQLite) - http://stackoverflow.com/a/2155786/4972844
        clone.className = clone.className.replace(/\bdrag-element-source\b/,'');
          
        // insert the clone to the page
        // TODO: position the clone appropriately
        console.log($(original).position());
        var originPosition = $(original).position();

        $("#buttonContainer").append($(clone));
       $(clone).css({
          "position": "absolute",
          "top": originPosition["top"],
          "left": originPosition["left"]
         });
        // start a drag interaction targeting the clone
        currentClonedElement = $(clone);
        interaction.start({ name: 'drag' }, event.interactable, clone);

      } else {

        interaction.start({ name: 'drag' }, event.interactable, event.currentTarget);

      }

    });

interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.item',
  // Require a 75% element overlap for a drop to be possible
  overlap: .60,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    // dropzoneElement.classList.add('drop-target');
    // draggableElement.classList.add('can-drop');
    // draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    // event.target.classList.remove('drop-target');
    // event.relatedTarget.classList.remove('can-drop');
    // event.relatedTarget.textContent = 'Dragged out';
    //alert("removed!");
  },
  ondrop: function (event) {
    //console.log("droppping...");
    event.relatedTarget.textContent = 'Dropped';
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;
        //alert($(dropzoneElement).hasClass("topRow"));
        var rowType = $(dropzoneElement).hasClass("topRow") ? "topRow" : "bottomRow";
        var oppositeRowType = (rowType == "topRow") ? "bottomRow" : "topRow";
        var topBottom = topBottomNeighbor($(dropzoneElement), rowType);
        var sides = getSideNeighbors($(dropzoneElement), rowType);
        var diagonals = getDiagonals("#" + topBottom, oppositeRowType);
        // console.log("topBottom...");
        // console.log(topBottom);
        // console.log("sides...");
        // console.log(sides);
        // console.log("diagonals...");
        // console.log(diagonals);
        var associatedDropZones  =  {
          primaryDropZone: $(dropzoneElement).attr("id"),
          leftSide: sides["left"],
          rightSide: sides["right"],
          leftDiagonal: diagonals["diagonalLeft"],
          rightDiagonal: diagonals["diagonalRight"],
          topBottom: topBottom
        };
        var currentDropzone = {};
        //construct key value...
        if(selectedTab == "small"){
          currentDropzone[associatedDropZones["primaryDropZone"]] = [];
        }else if(selectedTab == "medium"){
          currentDropzone[associatedDropZones["primaryDropZone"]] = [associatedDropZones["topBottom"]];
        }else{
          currentDropzone[associatedDropZones["primaryDropZone"]] = [associatedDropZones["topBottom"]]
          if(associatedDropZones["leftSide"] != null){currentDropzone[associatedDropZones["primaryDropZone"]].push(associatedDropZones["leftSide"])};
          if(associatedDropZones["rightSide"] != null){currentDropzone[associatedDropZones["primaryDropZone"]].push(associatedDropZones["rightSide"])};
          if(associatedDropZones["leftDiagonal"] != null){currentDropzone[associatedDropZones["primaryDropZone"]].push(associatedDropZones["leftDiagonal"])};
          if(associatedDropZones["rightDiagonal"] != null){currentDropzone[associatedDropZones["primaryDropZone"]].push(associatedDropZones["rightDiagonal"])};
        }
        console.log(currentDropzone);
        addToActiveDropZones(currentDropzone, draggableElement);
        
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;


    $(".controls").click(function(){
        $(".controls").css("background-color", "white");
        $(this).css("background-color", "#ADF");
        selectedTab = $(this).attr("value");
        //alert("Selected Tab: " + selectedTab);
    });

    $("#login").click(function(){
      //go through all keys of activeDropzones and get food items selected
      var foodsApproved = {};
      $.each(activeDropZones, function(key, value){
        var foodName = $("#" + key).attr("value");
        var foodInfo = food[foodName];
        foodsApproved[foodName] = foodInfo;
      });

      document.getHTML= function(who, deep){
          if(!who || !who.tagName) return '';
          var txt, ax, el= document.createElement("div");
          el.appendChild(who.cloneNode(false));
          txt= el.innerHTML;
          if(deep){
              ax= txt.indexOf('>')+1;
              txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
          }
          el= null;
          return txt;
      }      

      console.log("food Approved are...");
      console.log(foodsApproved);
      var clone = document.getHTML(document.getElementById("bentoBox").cloneNode(true), true);
      console.log(clone);
      listOfChildren[currentUser]["pendingMeal"] = clone;


      //get meal date and add meal
      listOfChildren[currentUser]["validateMeal"] = foodsApproved;
      localStorage.removeItem("listOfChildren");
      localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));

      console.log(listOfChildren);
      window.location = "approve.html";
    });
    //new version
    $("#points").text(points);
    //attachAccessory();
    //pick what color of pet
    //$("#petContainer").append('<img src="' + listOfChildren[currentUser]["pet"] + '" class="img-responsive" width=400 />')    
    createFoodItems();
   	$("#small").css("background-color", "#ADF");
});
