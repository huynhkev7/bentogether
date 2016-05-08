$(document).ready(function () {
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
        console.log(queryString);
        if (queryString["name"] != null) {
           $("#calendar-title").text("Calendar for: " + queryString["name"]);
        }


    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }    

    function buildCalendar(){
        var date = new Date();
        var currentMonth = date.getMonth();  
        var numberOfDaysInMonth = daysInMonth(currentMonth - 1, 2016);
        var numberOfWeeks = parseInt(numberOfDaysInMonth / 7);
        var currentDay = 1;
        var currentWeek = 1;
        var tableElement = $("#table");
        //number of rows
        for(var i = 0; i < numberOfWeeks; i++){
            //for each week...
            currentWeek++;
            var tableRowElement = $("<tr id='week_" + currentWeek + "' ></tr>");
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
            var tableRowElement = $("<tr id='week_" + currentWeek + "' ></tr>");
            for(var i = 0; i < numberOfDaysInMonth - (currentDay - 1); i++){
                var tableColumnElement = $("<th class='day'>" + currentDay + "</th>");
                tableRowElement.append(tableColumnElement);
                currentDay++;                
            }
            tableElement.append(tableRowElement);
        }

        $(".day").click(function(){
            if (confirm('Did you want to create a meal on this day?')) {
                // Save it!
            } else {
                // Do nothing!
            }                  
        });
    }

    buildCalendar();
});