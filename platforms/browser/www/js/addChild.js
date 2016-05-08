$(document).ready(function () {
    $("#addChildButton").click(function(){
        var numberOfChildren = $("form").length;
        var formTemplate = '<h3>Child #' + (numberOfChildren + 1) + '</h3> <div class="form-group"> <label for="childName">Child Name</label> <input type="childName" class="form-control childName" placeholder="Child name..."> </div><div class="form-group"> <label for="height">Height</label> <input type="height" class="form-control heightFeet" placeholder="height (feet)"> <input type="height" class="form-control heightInches" placeholder="height (inches)"> </div><div class="form-group"> <label for="allergies">Allergies (Comma seperated list)</label> <input type="allergies" class="form-control allergies" placeholder="Mangos, nuts, etc..."> </div><div class="form-group"> <label for="gender">Gender</label> <br/> <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" class="maleRadio" value="male"> Male </label> <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" class="femaleRadio" value="female"> Female </label> </div><div class="form-group"> <label for="lunchTime">Lunch Time</label> <input type="lunchTime" class="form-control timeHours" placeholder="Hour"> <input type="lunchTime" class="form-control timeMinutes" placeholder="Minute"> </div>';
        var newChildForm = $("<form id=" + "child-" + (numberOfChildren + 1) + " ></form>");
        newChildForm = newChildForm.append(formTemplate);
        $("#childList").append(newChildForm).append("<hr/>");    
    });

    //loop all child accounts and save it in localStorage
    $("#submitChildInfo").click(function(){
        var listOfChildren = {};
        $("form").each(function(){
            var childName = $(this).find("input.childName").val();
            var childBio = {
                heightFeet: $(this).find("input.heightFeet").val(),
                heightInches: $(this).find("input.heightInches").val(),
                allergies: $(this).find("input.allergies").val(),
                timeHours: $(this).find("input.timeHours").val(),
                timeMinutes: $(this).find("input.timeMinutes").val(),
                gender: $(this).find(".maleRadio").prop('checked') ? "male" : ($(this).find(".femaleRadio").prop('checked') ? "female" : null)
            };
            listOfChildren[childName] = childBio;
        });
        localStorage.setItem("listOfChildren", JSON.stringify(listOfChildren));
        alert("Saving all children bio...");
        window.location = "menu.html";
    });

});