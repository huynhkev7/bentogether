$(document).ready(function () {

    //add points to current user
    //get current user
    var currentUser = localStorage.getItem("currentUser");
    //get current User's bio
    var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));

    //new version
    var points = parseInt(listOfChildren[currentUser]["points"]);

    var nutritionTable = {
        calories: 0,
        fat: 0,
        sodium: 0,
        carbs: 0,
        sugars: 0,
        protein: 0
    };
    function createNutritionTable(){
        $.each(listOfChildren[currentUser]["validateMeal"], function(foodName, foodValue){
            var carbs = foodValue["carbohydrates"]
                sugars = foodValue["sugar"]
                sodium = foodValue["sodium"]
                fat = foodValue["fat"]
                calories = foodValue["calories"]
                protein = foodValue["protein"]
            nutritionTable["calories"] += calories;  
            nutritionTable["fat"] += fat;
            nutritionTable["sodium"] += sodium;
            nutritionTable["carbs"] += carbs;
            nutritionTable["sugars"] += sugars;
            nutritionTable["protein"] += protein;
        });      

       $.each(nutritionTable, function(key, value){
        if(key == "calories"){
            $("#nutrition").append("<div class='col-xs-6 col-sm-6 col-md-6 nutritionLabel'>" + key + "</div><div class='col-xs-6 col-sm-6 col-md-6 nutritionValue'>" + value + "</div>");
        }else if(key == "sodium"){
            $("#nutrition").append("<div class='col-xs-6 col-sm-6 col-md-6 nutritionLabel'>" + key + "</div><div class='col-xs-6 col-sm-6 col-md-6 nutritionValue'>" + value + "mg</div>");
        }else{
            $("#nutrition").append("<div class='col-xs-6 col-sm-6 col-md-6 nutritionLabel'>" + key + "</div><div class='col-xs-6 col-sm-6 col-md-6 nutritionValue'>" + value + "g</div>");
        }
       });

       createGraph();
    };

    $("#backNav").click(function(){
        window.location = "buildTwo.html";
    });

    $("#reject").click(function(){
        window.location = "buildTwo.html";
    });

    $("#approve").click(function(){
      //get meal date and add meal
      $.each(listOfChildren[currentUser]["meals"], function(key, value){
        listOfChildren[currentUser]["meals"][key] = listOfChildren[currentUser]["validateMeal"];
        localStorage.removeItem("listOfChildren");
        localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
      });
      window.location = "createDino.html";
    });


    //chart.js stuff
    function createGraph(){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Fat", "Sodium", "Carbohydrates", "Sugar", "Protein"],
                datasets: [{
                    label: 'Nutritional Value (Grams)',
                    data: [nutritionTable["fat"], nutritionTable["sodium"] / 1000, nutritionTable["carbs"], nutritionTable["sugars"], nutritionTable["protein"]],
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)"                    
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    };


    //new version
    $("#points").text(points);
    var clone = listOfChildren[currentUser]["pendingMeal"];
    $("#bentoBoxCopy").append(clone);
    createNutritionTable();
});
