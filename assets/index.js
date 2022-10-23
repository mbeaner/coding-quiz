var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'THe condition in an if/else statement is enclosed with ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'questions',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var score = 0;
var timer = document.querySelector('.timer');
var start = document.querySelector('#start');
var questionsDiv = document.querySelector('.questions');
var main = document.querySelector('.main');
var creatOl = document.createElement('ol');
var questionIndex = 0;
var secondsLeft = 75;
var timerInterval = 0;
var penalty = 10;

function renderQuestions(questionIndex) {
  questionsDiv.innerHTML = '';
  creatOl.innerHTML = '';

  for (var i = 0; i < questions.length; i++) {
    var currentQuestion = questions[questionIndex].title;
    var currentChoices = questions[questionIndex].choices;
    questionsDiv.textContent = currentQuestion;
  }

  currentChoices.forEach(function (choice) {
    var createLi = document.createElement('li');
    createLi.setAttribute('class', 'choices');
    createLi.textContent = choice;
    questionsDiv.appendChild(creatOl);
    creatOl.appendChild(createLi);
    createLi.addEventListener('click', answerCheck);
  });
}

function answerCheck(e) {
  var selected = e.target;

  if (selected.matches('li')) {
    var createDiv = document.createElement('div');
    createDiv.setAttribute('id', 'newDiv');

    if (selected.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent = 'Correct!';
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = 'Wrong!';
    }
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    finished();
  } else {
    renderQuestions(questionIndex);
  }

  questionsDiv.appendChild(createDiv);
}

function finished() {
  questionsDiv.innerHTML = '';
  timer.innerHTML = '';

  var createH1 = document.createElement('h1');
  createH1.setAttribute('id', 'newH1');
  createH1.textContent = 'All Done!';
  questionsDiv.appendChild(createH1);

  var createP = document.createElement('p');
  createP.setAttribute('id', 'newP');
  // questionsDiv.appendChild(createP)

  if (secondsLeft >= 0) {
    score = score + secondsLeft;
    clearInterval(timerInterval);
    createP.textContent = 'Your final score is:' + score;
    questionsDiv.appendChild(createP);
  }

  var createLabel = document.createElement('label');
  createLabel.setAttribute('id', 'newLabel');
  createLabel.textContent = 'Enter initials';
  questionsDiv.appendChild(createLabel);

  var createInput = document.createElement('input');
  createInput.setAttribute('type', 'text');
  createInput.textContent = '';
  questionsDiv.appendChild(createInput);

  var createButton = document.createElement('button');
  createButton.setAttribute('type', 'submit');
  createButton.textContent = 'Submit';
  questionsDiv.appendChild(createButton);

  createButton.addEventListener('click', function () {
    var initials = createInput.value;

    if (initials === '') {
      alert('Enter initials');
    } else {
      var finalScore = {
        initials: initials,
        score: score,
      };
      var allScores = localStorage.getItem('allScores');
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem('allScores', newScore);
      window.location.replace('highScores.html');
    }
  });
}

start.addEventListener('click', function () {
  if (timerInterval === 0) {
    timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = 'Time:' + secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timerInterval);
        finished();
      }
    }, 1000);
  }
  renderQuestions(questionIndex);
});
