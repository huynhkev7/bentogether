var foods = {
    carrots: {
        nutrients: 100,
        carbohydrates: 0,
        sugar: 0,
        toggled: false
    },
    soda: {
        nutrients: 0,
        carbohydrates: 0,
        sugar: 100,
        toggled: false
    },
    bread: {
        nutrients: 50,
        carbohydrates: 50,
        sugar: 0,
        toggled: false
    },
    cookies: {
        nutrients: 0,
        carbohydrates: 10,
        sugar: 100,
        toggled: false
    },
    fish: {
        nutrients: 75,
        carbohydrates: 75,
        sugar: 0,
        toggled: false
    }
};

var list = document.getElementById('foods');
Object.keys(foods).forEach(function(food) {
    var button = document.createElement('button');
    console.log(food);
    button.innerHTML = food;
    
    var approvals = JSON.parse(localStorage.getItem('approvals'));
    var disapprovals = JSON.parse(localStorage.getItem('disapprovals'));

    setInterval(function(){ 
    console.log("approvals: " + approvals);
    console.log("disapprovals: " + disapprovals);
    }, 3000);
    
    if(approvals != null){
        if (approvals.indexOf(food) > -1) {
            button.style.background = 'green';
        }        
    }
    if(disapprovals != null){
        if (disapprovals.indexOf(food) > -1) {
            button.style.background = 'red';
        }
    }
        
    button.onclick = function() {
        if (getToggled() < 3 && !foods[this.innerHTML].toggled) {
            foods[this.innerHTML].toggled = !foods[this.innerHTML].toggled;
            updateUI();
            return;
        }
        if (foods[this.innerHTML].toggled) {
            foods[this.innerHTML].toggled = !foods[this.innerHTML].toggled;
            updateUI();
        }
    }

    list.appendChild(button);
});

function getToggled() {
    var count = 0;
    Object.keys(foods).forEach(function(food) {
        if (foods[food].toggled) {
            count++;
        }
    });
    return count;
}

function updateUI() {
    if (localStorage.getItem('red') == 'true') {
        document.getElementById('monster').style.background = 'red';
    }
    
    for (var i = 1; i <= 3; i++) {
        document.getElementById('chosen' + i).innerHTML = '';
    }
    
    var number = 1;
    
    var nutrientsScore = 1;
    var carbohydratesScore = 1;
    var sugarScore = 1;
    
    var toggled = [];
    Object.keys(foods).forEach(function(food) {
        if (foods[food].toggled) {
            toggled.push(food);
            document.getElementById('chosen' + number).innerHTML = food;
            number++;
            nutrientsScore += foods[food].nutrients;
            carbohydratesScore += foods[food].carbohydrates;
            sugarScore += foods[food].sugar;
        }
    });
    localStorage.setItem('toggled', JSON.stringify(toggled));
    
    var mealScore = nutrientsScore * carbohydratesScore / sugarScore;
    var monster = document.getElementById('monster');
    
    if (getToggled() < 3) {
        monster.src = '/images/egg_unhatched.png';
    }
    
    else if (mealScore < 100) {
        monster.src =  '/images/egg_unhatched.png';
    }
    
    else if (mealScore < 1000) {
        monster.src = '/images/egg_hatching.png';
    }
    
    else {
        monster.src = '/images/baby_dino2.png';
    }
}
//localStorage.clear()
updateUI();