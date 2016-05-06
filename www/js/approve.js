var toggled = JSON.parse(localStorage.getItem('toggled'));
var chosen = document.getElementById('chosen');

toggled.forEach(function(food) {
    var div = document.createElement('div');
    div.innerHTML = food;
    div.toggleState = 0;
    
    div.onclick = makeFunction(div)
    
    chosen.appendChild(div);
});

function makeFunction(div) {
    return function() {
        div.toggleState = (div.toggleState + 1) % 3;
        updateUI();
    }
}

function updateUI() {
    var approvals = [];
    var disapprovals = [];
    
    var children = chosen.children;
    
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        
        console.log(child.toggleState);
        
        if (child.toggleState === 0) {
            child.style.background = '#ccc';
        }
        if (child.toggleState === 1) {
            approvals.push(child.innerHTML);
            child.style.background = 'green';
        }
        if (child.toggleState === 2) {
            disapprovals.push(child.innerHTML);
            child.style.background = 'red';
        }
    }
    
    localStorage.setItem('approvals', JSON.stringify(approvals));
    localStorage.setItem('disapprovals', JSON.stringify(disapprovals));
}