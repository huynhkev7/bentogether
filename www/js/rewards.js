var stars = JSON.parse(localStorage.getItem('stars'));

document.getElementById('red').onclick = function() {
    if (stars < 250) {
        return;
    }
    localStorage.setItem('stars', stars - 250);
    localStorage.setItem('red', 'true');
    updateUI();
}

function updateUI() {
    document.getElementById('stars').innerHTML = JSON.parse(localStorage.getItem('stars'));
}

updateUI();