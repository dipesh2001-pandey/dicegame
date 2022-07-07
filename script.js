'use strict';
// selecting elements
let rules = true;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsopenclosemodal = document.querySelector('.close-modal');
//reading rules
const openclmodal = function (rules) {
  console.log('Button Clicked');
  if (rules) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  } else {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
};
const closemodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//starting conditions
let currentscore = 0,
  active_player = 0,
  playing = true,
  score = [0, 0];
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  document.querySelector(`.winner--0`).classList.add('hidden');
  document.querySelector(`.winner--1`).classList.add('hidden');
  (currentscore = 0), (active_player = 0), (playing = true), (score = [0, 0]);
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
overlay.addEventListener('click', closemodal);
btnsopenclosemodal.addEventListener('click', () => {
  openclmodal(rules);
  rules = !rules;
});
//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${active_player}`).textContent =
        currentscore;
    } else {
      switch_player();
    }
  }
});
const switch_player = function () {
  document.getElementById(`current--${active_player}`).textContent = 0;
  currentscore = 0;
  active_player = active_player === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
btnHold.addEventListener('click', function () {
  if (playing) {
    score[active_player] += currentscore;
    document.getElementById(`score--${active_player}`).textContent =
      score[active_player];
    if (score[active_player] > 100) {
      playing = false;

      diceEl.classList.add('hidden');
      document
        .querySelector(`.winner--${active_player}`)
        .classList.remove('hidden');
      document
        .querySelector(`.player--${active_player}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active_player}`)
        .classList.remove('player--active');
    } else {
      switch_player();
    }
  }
});

btnNew.addEventListener('click', init);
