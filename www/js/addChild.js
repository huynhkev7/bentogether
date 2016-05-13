$(document).ready(function () {

    var store = {
        bow: {
            image: "images/icons/bow-tie.png",
            top: "61px",
            left: "9px",
            width: "167px",
            height: "80px",
            points: 10

        },
        hat: {
            image: "images/icons/hat.png",
            top: "61px",
            left: "15px",
            width: "116px",
            height: "67px",
            points: 50              
        },
        necklace: {
            image: "images/icons/necklace.png",
            top: "71px",
            left: "30px",
            width: "167px",
            height: "100px",
            points: 100         
        }
    };

    var closet = {};

    $("#addChildButton").click(function(){
        var numberOfChildren = $("form").length;
        var formTemplate = '<h3>Child #' + (numberOfChildren + 1) + '</h3> <div class="form-group"> <label for="childName">Child Name</label> <input type="childName" class="form-control childName" placeholder="Child name..."> </div><div class="form-group"> <label for="height">Height</label> <input type="height" class="form-control heightFeet" placeholder="height (feet)"> <input type="height" class="form-control heightInches" placeholder="height (inches)"> </div><div class="form-group"> <label for="allergies">Allergies (Comma seperated list)</label> <input type="allergies" class="form-control allergies" placeholder="Mangos, nuts, etc..."> </div><div class="form-group"> <label for="gender">Gender</label> <br/> <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" class="maleRadio" value="male"> Male </label> <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" class="femaleRadio" value="female"> Female </label> </div><div class="form-group"> <label for="lunchTime">Lunch Time</label> <input type="lunchTime" class="form-control timeHours" placeholder="Hour"> <input type="lunchTime" class="form-control timeMinutes" placeholder="Minute"> </div>';
        var newChildForm = $("<form id=" + "child-" + (numberOfChildren + 1) + " ></form>");
        newChildForm = newChildForm.append(formTemplate);
        $("#childList").append(newChildForm).append("<hr/>");    
    });

    //loop all child accounts and save it in localStorage
    $("#submitChildInfo").click(function(){
        var childBio = {};
        var allergies = [];
        $("form").each(function(){
            childBio = {
                childName: $(this).find("input.childName").val(),
                heightFeet: $(this).find("input.heightFeet").val(),
                heightInches: $(this).find("input.heightInches").val(),
                weight: $(this).find("input.weight").val(),
                age: $(this).find("input.age").val(),
                points: 0,
                store: store,
                closet: closet,
                meals: [],
                accessory: null,
                messages: [],
                gender: $(this).find("#male").hasClass('genderActive') ? "male" : ($(this).find("#female").hasClass("genderActive") ? "female" : null)
            };
            //add allergies...
            $(".circleActive").each(function(){
                allergies.push($(this).next().text());
            });
            childBio["allergies"] = allergies;
        });

        //set to storage
        if(localStorage.getItem("listOfChildren") != null){
            var listOfChildren = JSON.parse(localStorage.getItem("listOfChildren"));
            listOfChildren[childBio["childName"]] = childBio;
        }else{
            var listOfChildren = {};
            listOfChildren[childBio["childName"]] = childBio;
        };
        localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
        window.location = "menu.html";
    });

    $("#backNav").click(function(){
        window.location = "menu.html";
    });

    $("#allergyList").on('click', '.circle', function(){
        console.log($(this));
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
           console.log($(this));
          console.log($(this).val());
          if (e.which == 13) {
            var allergyAnswer = $(this).val();
            $(this).after("<div class='allergy'>" + allergyAnswer + "</div>");
            $(this).remove();
            //$(".addAllergyRow").append("<div class='allergy'>" + allergyAnswer + "</div>");
            return false;    //<---- Add this line
          }
        });   
    });

    $("#male").click(function(){
        if(!$(this).hasClass("genderActive")){
            $(this).addClass("genderActive");
            $("#female").removeClass("genderActive");
        }
    });

    $("#female").click(function(){
        if(!$(this).hasClass("genderActive")){
            $(this).addClass("genderActive");
            $("#male").removeClass("genderActive");
        }
    });



});