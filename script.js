const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentPlayer = 0;
let currentScore = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let scoreboardEl = document.querySelector(`#current-score--${currentPlayer}`);
let totalScoreboardEl = document.querySelector(`#score--${currentPlayer}`);
let winner;
const confettiEl = document.querySelector('.confetti');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const img = document.querySelector('.img--dice');
// let scoreEl1 = document.querySelector('#score--0');
// let scoreEl2 = document.querySelector('#score--1');
// let currentScoreBoard1 = document.getElementById('current-score--0');
// let currentScoreBoard2 = document.getElementById('current-score--1');

// New Game
btnNew.addEventListener('click', function () {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  const playerEl = document.querySelector(`.player--${winner}`);
  playerEl.classList.remove('player--winner');
  confettiEl.classList.add('invisible');

  currentPlayer = 0;
  currentScore = 0;
  scorePlayer1 = 0;
  scorePlayer2 = 0;

  let scoreEl1 = document.querySelector('#score--0');
  let scoreEl2 = document.querySelector('#score--1');
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
});

const changePlayer = () => {
  // Reset current score
  currentScore = 0;
  scoreboardEl.textContent = 0;

  // Change player & active background
  currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1);
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');

  // Select current player's element. Get ready to update next player's el
  scoreboardEl = document.querySelector(`#current-score--${currentPlayer}`);
  totalScoreboardEl = document.querySelector(`#score--${currentPlayer}`);
};

// Click roll a dice button
btnRoll.addEventListener('click', function () {
  console.log(
    `current player ${currentPlayer}, total ${scorePlayer1}, ${scorePlayer2}`
  );
  // Roll a dice
  let dice = Math.trunc(Math.random() * 6) + 1;

  // Change the image of dice
  img.src = `./images/dice-${dice}.png`;
  img.classList.remove('invisible');

  if (dice !== 1) {
    // Display/update current scores
    currentScore += dice;
    scoreboardEl.textContent = currentScore;
  } else {
    //Change player if the dice was 1
    changePlayer();
  }
});

function gameover() {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  img.classList.add('invisible');

  //visual change
  const playerEl = document.querySelector(`.player--${winner}`);
  playerEl.classList.add('player--winner');
  confettiEl.classList.remove('invisible');
}

// Click hold button
btnHold.addEventListener('click', function () {
  // Add current scores to a total score
  if (currentPlayer === 0) {
    scorePlayer1 += currentScore;
    totalScoreboardEl.textContent = scorePlayer1;
  } else {
    scorePlayer2 += currentScore;
    totalScoreboardEl.textContent = scorePlayer2;
  }

  // Check a winner
  if (scorePlayer1 >= 10) {
    winner = 0;
    gameover();
  } else if (scorePlayer2 >= 10) {
    winner = 1;
    gameover();
  }
  changePlayer();
});
