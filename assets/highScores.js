var highScore = document.querySelector('#highScore');
var clear = document.querySelector('#clear');

var allScores = localStorage.getItem('allScores');
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement('li');
    createLi.setAttribute('class', 'scores');
    createLi.textContent = allScores[i].initials + ' ' + allScores[i].score;
    highScore.appendChild(createLi);
  }
}

clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
