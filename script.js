const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentPlayer = 0;
let currentScore = 0;
let scores = [0, 0];
let winner = -1;

let currentScoreEl1 = document.querySelector('#current-score--0');
let currentScoreEl2 = document.querySelector('#current-score--1');
let scoreEl1 = document.querySelector('#score--0');
let scoreEl2 = document.querySelector('#score--1');

const confettiEl = document.querySelector('.confetti');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const img = document.querySelector('.img--dice');

// Initialize the game. Reset all values
const init = () => {
  console.log('called init');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  winner = -1;
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;

  currentScoreEl1.textContent = 0;
  currentScoreEl2.textContent = 0;

  // when the button is clicked before gameover
  !img.classList.contains('invisible') ? img.classList.add('invisible') : null;
};

// Call with a page load
init();

// New Game - Reset value
btnNew.addEventListener('click', function () {
  if (winner === 0) {
    player1El.classList.remove('player--winner');
    confettiEl.classList.add('invisible');
  } else if (winner === 1) {
    player2El.classList.remove('player--winner', 'player--active');
    confettiEl.classList.add('invisible');
    player1El.classList.add('player--active');
  } else {
    // when the button is clicked before gameover
    player1El.classList.add('player--active');
    player2El.classList.remove('player--active');
  }
  init();
});

// Change player
const changePlayer = () => {
  // Reset current score
  currentScore = 0;

  // Change player & active background
  currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1);
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

// Roll a dice button
btnRoll.addEventListener('click', function () {
  // Roll a dice
  let dice = Math.trunc(Math.random() * 6) + 1;

  // Change the image of dice
  img.src = `./images/dice-${dice}.png`;
  img.alt = `dice ${dice}`;
  img.classList.remove('invisible');

  if (dice !== 1) {
    // Display/update current scores
    currentScore += dice;
    currentPlayer === 0
      ? (currentScoreEl1.textContent = currentScore)
      : (currentScoreEl2.textContent = currentScore);
  } else {
    //Change player if the dice was 1
    changePlayer();
  }
});

// Game Over
const gameover = () => {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  img.classList.add('invisible');

  //visual change
  const playerEl = document.querySelector(`.player--${winner}`);
  playerEl.classList.add('player--winner');
  confettiEl.classList.remove('invisible');
};

// Hold button
btnHold.addEventListener('click', function () {
  // Add current scores to a total score
  if (currentPlayer === 0) {
    scores[0] += currentScore;
    scoreEl1.textContent = scores[0];
    currentScoreEl1.textContent = 0;
  } else {
    scores[1] += currentScore;
    scoreEl2.textContent = scores[1];
    currentScoreEl2.textContent = 0;
  }

  // Check a winner
  if (scores[0] >= 10) {
    winner = 0;
    player1El.classList.add('player--active');
    gameover();
  } else if (scores[1] >= 10) {
    winner = 1;
    player1El.classList.remove('player--active');
    gameover();
  } else {
    changePlayer();
  }
});
