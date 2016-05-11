$(document).ready(function () {

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
        
        //get end of month, exact day
        


        var numberOfDaysInMonth = daysInMonth(currentMonth + 1, 2016);
        var numberOfWeeks = parseInt(numberOfDaysInMonth / 7);
        var currentDay = 1;
        var currentWeek = 1;
        var tableElement = $("#table");
        $("#monthTitle").text(monthNames[currentMonth]);
        //delete all week rows
        $(".week").remove();
        //number of rows
        for(var i = 0; i < numberOfWeeks; i++){
            //for each week...
            currentWeek++;
            var tableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
            for(var j = 0; j < 7; j++){
                var tableColumnElement = $("<th class='day'>" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;
            }
            tableElement.append(tableRowElement);
        }
        //add remaining days...
        if(numberOfDaysInMonth - (currentDay - 1) > 0){
            console.log("entering");
            currentWeek++;
            var tableRowElement = $("<tr class='week' id='week_" + currentWeek + "' ></tr>");
            var tempDays = currentDay;
            for(var i = 0; i < numberOfDaysInMonth - (tempDays - 1); i++){
                var tableColumnElement = $("<th class='day'>" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;                
            }
            tableElement.append(tableRowElement);
        }

        $(".day").click(function(){
            if (confirm('Did you want to create a meal on this day?')) {
                // Save it!
                window.location = "build.html";
            } else {
                // Do nothing!
            }                  
        });
    }


});