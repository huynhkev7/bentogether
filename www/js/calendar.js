$(document).ready(function () {

    //add points to current user
    //get current user
    var currentUser = localStorage.getItem("currentUser");
    //get current User's bio
    var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));


    var points = parseInt(listOfChildren[currentUser]["points"]);
    $("#points").text(points);    
    
    var dateSelected = null;
    var previousDateSelected = null;

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]; 
    var date = new Date();
    //0-based months
    var currentMonth = date.getMonth();

    //get child name
    var queryString = new Array();

    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    // if (queryString["name"] != null) {
    //    $("#calendar-title").text("Calendar for: " + queryString["name"]);
    // }
  

    buildCalendar(currentMonth);

    //decrement current month
    $("#leftControl").click(function(){
        currentMonth--;
        buildCalendar(currentMonth);
    });

    //increment current month
    $("#rightControl").click(function(){
        currentMonth++;
        buildCalendar(currentMonth);
    });

    //get how many days in the month
    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }  

    function firstDayOfMonth(month, year){
        return new Date(year, month).getDay();
    }

    //create the calendar
    function buildCalendar(currentMonth){
        //get start of month, exact day
        var firstDayOfWeek = firstDayOfMonth(currentMonth, 2016);
        //get previous month's days
        var previousMonthDays = daysInMonth(currentMonth, 2016);
        //get end of month, exact day
    

        var numberOfDaysInMonth = daysInMonth(currentMonth + 1, 2016);
        var numberOfWeeks = parseInt(numberOfDaysInMonth / 7);
        var previousMonth = 6;
        var currentDay = 1;
        var currentWeek = 1;
        var tableElement = $("#table");
        $("#monthTitle").text(monthNames[currentMonth]);
        //delete all week rows
        $(".week").remove();
        //number of rows
        //do the first week
            //for each week...
        //subtract 6 - firstDayOfWeek and get the start
        //if you get six you iterate the whole week, 0 place
        //if you get 0 then you start at the end, 6 place holders
        //5 then you start on monday, 1 placeholder
        currentWeek++;
        var firstTableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
        var difference = previousMonth - firstDayOfWeek;
        var originalDifference = 5 - difference;
        console.log("diffeence: " + originalDifference);
        var tempPlace = 6;
        while(tempPlace > difference){
            // console.log("diffeence: " + originalDifference);
            var tableColumnElement = $("<th class='day' style='color:grey' value='" + (currentMonth - 1) + "/" +  (previousMonthDays - originalDifference) + "/2016' >" + (previousMonthDays - originalDifference) + "</th>");
            firstTableRowElement.append(tableColumnElement);
            originalDifference--;
            tempPlace--;
        }
        while(tempPlace >= 0){
            tableColumnElement = $("<th class='day' value='" + currentMonth + "/" + currentDay + "/2016" + "' >" + currentDay + "</th>");
            currentDay++;  
            tempPlace--;
            firstTableRowElement.append(tableColumnElement);         
        }

        tableElement.append(firstTableRowElement);


        for(var i = 1; i < numberOfWeeks; i++){
            //for each week...
            currentWeek++;
            var tableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
            for(var j = 0; j < 7; j++){
                var tableColumnElement = $("<th class='day' value='" + currentMonth + "/" + currentDay + "/2016" + "' >" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;
            }
            tableElement.append(tableRowElement);
        }
        //add remaining days...
        var daysRemaining = numberOfDaysInMonth - (currentDay - 1);

        if(daysRemaining > 0 && daysRemaining <= 7){
            console.log("entering remaining days: " + (daysRemaining));
            currentWeek++;
            var tableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
            var tempDays = currentDay;
            for(var i = 0; i < numberOfDaysInMonth - (tempDays - 1); i++){
                var tableColumnElement = $("<th class='day' value='" + currentMonth + "/" + currentDay + "/2016" + "' >" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;                
            }
            for(var j = 1; j <= 7 - (numberOfDaysInMonth - (tempDays - 1)); j++){
                var tableColumnElement = $("<th class='day' value='" + (currentMonth + 1) + "/" + j + "/2016" + "'  style='color: grey'>" + j + "</th>");
                tableRowElement.append(tableColumnElement);              
            }            
            tableElement.append(tableRowElement);
        }else if(daysRemaining > 0 && daysRemaining > 7){
            console.log("entering remaining days: " + (daysRemaining));
            currentWeek++;
            var tableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");

            for(var i = 0; i <  7; i++){
                var tableColumnElement = $("<th class='day' value='" + currentMonth + "/" + currentDay + "/2016" + "' >" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;                
            }   
            tableElement.append(tableRowElement); 
            var tableRowTwoElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
            for(var i = 0; i < daysRemaining - 7; i++){
                var tableColumnElement = $("<th class='day' value='" + currentMonth + "/" + currentDay + "/2016" + "' >" + currentDay + "</th>");
                tableRowTwoElement.append(tableColumnElement);
                currentDay++;                
            }      
            for(var x = 1; x <= 7 - (daysRemaining - 7); x++){
                var tableColumnElement = $("<th class='day' value='" + (currentMonth + 1) + "/" + x + "/2016" + "'  style='color: grey'>" + x + "</th>");
                tableRowTwoElement.append(tableColumnElement);             
            }      

            tableElement.append(tableRowTwoElement);           
        }

        $(".day").click(function(){
                // Save it!
                if(!$(this).hasClass("dayActive")){
                    $(this).addClass("dayActive");
                    dateSelected = $(this).attr("value");
                    if(previousDateSelected != null){
                        previousDateSelected.removeClass("dayActive");    
                    }
                    previousDateSelected = $(this);

                };        
        });

        $("#selectDate").click(function(){
            mealObj = {};
            mealObj[dateSelected] = {};

            listOfChildren[currentUser]["meals"].push(mealObj);

            localStorage.removeItem("listOfChildren");
            localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
            window.location = "build.html";     
        });

        $("#backNav").click(function(){
            window.location = "createDino.html";
        });        
    }


});