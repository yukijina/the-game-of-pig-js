const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentPlayer = 0;
let currentScore = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let scoreboard = document.querySelector(`#current-score--${currentPlayer}`);
let totalScoreboard = document.querySelector(`#score--${currentPlayer}`);
let winner;
const confettiEl = document.querySelector('.confetti');

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
// let scoreEl1 = document.querySelector('#score--0');
// let scoreEl2 = document.querySelector('#score--1');
// let currentScoreBoard1 = document.getElementById('current-score--0');
// let currentScoreBoard2 = document.getElementById('current-score--1');

// New Game
btnNew.addEventListener('click', function () {
  console.log('new game clicked');
});

const changePlayer = () => {
  // Reset current score
  currentScore = 0;
  scoreboard.textContent = 0;

  // Change player & active background
  currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1);
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');

  // Select current player's element. Get ready to update next player's el
  scoreboard = document.querySelector(`#current-score--${currentPlayer}`);
  totalScoreboard = document.querySelector(`#score--${currentPlayer}`);
};

// Click roll a dice button
btnRoll.addEventListener('click', function () {
  console.log(
    `current player ${currentPlayer}, total ${scorePlayer1}, ${scorePlayer2}`
  );
  // Roll a dice
  let dice = Math.trunc(Math.random() * 6) + 1;

  // Change the image of dice
  const img = document.querySelector('.img--dice');
  img.src = `./images/dice-${dice}.png`;

  if (dice !== 1) {
    // Display/update current scores
    currentScore += dice;
    scoreboard.textContent = currentScore;
  } else {
    //Change player if the dice was 1
    changePlayer();
  }
});

function gameover() {
  btnRoll.disabled = true;
  btnHold.disabled = true;
}

// Click hold button
btnHold.addEventListener('click', function () {
  // Add current scores to a total score
  if (currentPlayer === 0) {
    scorePlayer1 += currentScore;
    totalScoreboard.textContent = scorePlayer1;
  } else {
    scorePlayer2 += currentScore;
    totalScoreboard.textContent = scorePlayer2;
  }

  // Check a winner
  if (scorePlayer1 >= 10) {
    winner = 0;
    player1El.classList.add('player--winner');
    confettiEl.classList.remove('invisible');
    gameover();
  } else if (scorePlayer2 >= 10) {
    winner = 1;
    player2El.classList.add('player--winner');
    confettiEl.classList.remove('invisible');
    gameover();
  }
  changePlayer();
});
