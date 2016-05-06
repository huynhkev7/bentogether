function addStars() {
    var stars = JSON.parse(localStorage.getItem('stars')) || 0;
    localStorage.setItem('stars', stars + 100);
}