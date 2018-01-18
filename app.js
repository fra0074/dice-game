/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Set the score

var chosedScore, chosedScoreNum;
var scoreButton = document.querySelector('#btnscore');

scoreButton.addEventListener('click', function() {

  chosedScore = document.querySelector('#scorebox').value;
  chosedScoreNum = Number(chosedScore);

  if (chosedScore === "")  {

    alert("wrong");
  }

  else{
  // document.querySelector('.scorediv').style.visibility = 'hidden';
  document.querySelector('.scorediv').classList.add('m-fadeOut');
  document.querySelector('.wrapper').style.visibility = 'visible';

  console.log(chosedScore);
}


});



// Initilize game

var playerScore, roundScore, activePlayer, activeGame, finalPlayer, diceTemp, dice, dice2;

function init() {

//finalPlayer = activePlayer + 1;
//document.getElementById('name-' + activePlayer).textContent = "Player " + finalPlayer;
document.getElementById('name-0').textContent = "Player 1";
document.getElementById('name-1').textContent = "Player 2";

playerScore = [0,0];
roundScore = 0;
activePlayer = 0;
activeGame = true;
diceTemp = [];

document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;
document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');

}

function nextPlayer() {
  diceTemp = [];
  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

}


// Call function to start the game

init();

// Roll Dice

var rollDice = document.querySelector('.btn-roll');




rollDice.addEventListener('click', function() {



  if (activeGame === true) {

    dice = Math.floor(Math.random() * 6 + 1);
    dice2 = Math.floor(Math.random() * 6 + 1);
   // var dice = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
   // var dice2 = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
   console.log('Primo dado ' + dice);
   console.log('Secondo dado ' + dice2);

   if ((dice === 6 || dice2 === 6) && (dice !== 1 && dice2 !== 1)) {

  // Counting the 6
  diceTemp.push(6);
  console.log('DadoTemp ' + diceTemp);
    // Exit if double 6
    if (diceTemp.length === 2) {
      console.log('Uscita ' + diceTemp);
      $('.message6').fadeIn(400, function(){
      $('.message6').fadeOut(800);
    });

      document.querySelector('.dice').src = 'dice-' + dice + '.png';
      document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
      document.querySelector('.dice').style.display = 'block';
      document.querySelector('.dice2').style.display = 'block';
      document.querySelector('#current-' + activePlayer).textContent = '0';
      playerScore[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();

    }
    else {
      // diceTemp.pop();
      document.querySelector('#current-' + activePlayer).textContent = 0;
      document.querySelector('.dice').src = 'dice-' + dice + '.png';
      document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
      document.querySelector('.dice').style.display = 'block';
      document.querySelector('.dice2').style.display = 'block';
      roundScore += dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  }

  else if ((dice !== 6 || dice2 !== 6) && (dice !== 1 && dice2 !== 1)) {

    diceTemp.pop();
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
    roundScore += dice + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }



  else if (dice === 1 || dice2 === 1)  {

    // var z = document.createElement('p');
    // z.setAttribute("id", "message")
    // z.innerHTML = 'hello';
    // document.querySelector('.wrapper').appendChild(z);
    // document.querySelector('#message').style.display = 'none';
    $('.message').fadeIn(400, function(){
      $('.message').fadeOut(800);
    });


    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice2').style.display = 'block';
    document.querySelector('#current-' + activePlayer).textContent = '0';
    nextPlayer();
  }

}
});



// Hold points
var hold = document.querySelector('.btn-hold');

hold.addEventListener('click', function() {

  playerScore[activePlayer]+= roundScore;
  document.querySelector('#score-' + activePlayer).textContent = playerScore[activePlayer];

  document.querySelector('#current-' + activePlayer).textContent = '0' ;
  roundScore = 0;

  if (playerScore[activePlayer] >= chosedScore) {
    document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
    // var finalPlayer = activePlayer + 1;
    document.getElementById('name-' + activePlayer).textContent = "Winner";
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    activeGame = false;


  }

  else {
    nextPlayer();
  }

});


// Start new game
var newGame = document.querySelector('.btn-new');

newGame.addEventListener('click', function() {
  init();
  location.reload();



} );


// document.addEventListener('keypress', function(e){
//   console.log(e.key);

// });


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


