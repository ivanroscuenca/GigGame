'use strict';

// 2 ways : querySelector and getElementById. Selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

/*Ponemos los marcadores a 0 de los jugadores
// 2 ways : textContent and innerHTML
score0El.textContent = 0;
score1El.innerHTML = 0;

se puede hacer sin crear una clase con :
diceEl.style.visibility = 'hidden';*/

const init = function() {
    //Ponemos marcadores a 0
    score0El.textContent = 0;
    score1El.innerHTML = 0;

    current0El.textContent = 0;
    current1El.textContent = 0;

    //quitamos class player winner
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    //ponemos al jugador o como active player
    player1El.classList.add('player--active');
    player1El.classList.remove('player--active');
    //creamos una variable para almacenar current score
    currentScore = 0;

    //creamos una variable para saber el jugador actual
    activePlayer = 0;

    //creamos un array para acumular las puntuaciones totales de los 2
    scores = [0, 0];

    //creando una clase en CSS y añadiendole la nueva clase hidden
    diceEl.classList.add('hidden');

    //creamos boolean para jugar y parar el juego
    playing = true;
};

//hay que llamar a la función init para que cargue
init();

//create a function to switch players

const switchPlayer = function() {
    //switch the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Rolling dice functionality

btnRoll.addEventListener('click', function() {
    if (playing) {
        //1.Generating a random dice
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.Display dice
        //  eliminamos hidden para mostrar el dado
        diceEl.classList.remove('hidden');
        // manipulamos la imagen del dado y ponemos el numero que salga
        diceEl.src = `dice-${dice}.png`;

        //3.checked for rolled 1 : if true,
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            //ponemos el currentScore dependiendo de cada jugador
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
            //current0El.textContent = currentScore; // CHANGE LATER
        } else {
            /*switch next player
                                                                                                                                                                            if(activePlayer===0){
                                                                                                                                                                                activePlayer=1;
                                                                                                                                                                            }else {
                                                                                                                                                                                activePlayer=0;
                                                                                                                                                                            }
                                                                                                                                                                //ponemos el marcador a 0 cuando cambiamos de activePlayer
                                                                                                                                                                document.getElementById(`current--${activePlayer}`).textContent = 0;
                                                                                                                                                                activePlayer = activePlayer === 0 ? 1 : 0;
                                                                                                                                                                currentScore = 0;
                                                                                                                                                                //usamos metodo toggle para modificar la clase de player
                                                                                                                                                                player0El.classList.toggle('player--active');
                                                                                                                                                                player1El.classList.toggle('player--active');*/

            switchPlayer();
        }
    }
});

// ponemos evento al boton hold
btnHold.addEventListener('click', function() {
    if (playing) {
        //1.add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //2.check if the score is less than 100

        if (scores[activePlayer] >= 30) {
            //Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            //switch the next player
            switchPlayer();
        }
    }
});

// reset the game, llamamos a la function init

btnNew.addEventListener('click', init);