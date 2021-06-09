'use strict';

//DOM reference declarations
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Text content references
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Globally available variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function resetAndStartGame() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

//Switch player
function switchPlayer() {
    currentScore = 0; //Reset current score
    activePlayer = activePlayer === 0 ? 1 : 0; //Switch between active player

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice function
btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1; //Get a random number between 1 - 6 for dice

        diceEl.classList.remove('hidden'); //Make the dice visible

        diceEl.src = `dice-${dice}.png`; //Select the dice image based on random number for dice

        if (dice !== 1) {
            //If dice number is not 1, Add the dice number to current score for current player
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //If dice number is 1, Then the current user loses all score
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        //When user presses hold, add the current score to current player and switch player

        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 2) {
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', resetAndStartGame);

resetAndStartGame();
