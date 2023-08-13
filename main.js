const rulesBtn = document.getElementById("rules");
const hideRulesBtn = document.getElementById("hide-rules");
const rulesSec = document.getElementById("rules-section");

const newGameBtn = document.getElementById("new-game");

const rollDiceBtn = document.getElementById("roll");
const diceContainer = document.getElementById("dice-container");
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const dice4 = document.getElementById("dice4");
const dice5 = document.getElementById("dice5");
const dice6 = document.getElementById("dice6");

const holdBtn = document.getElementById("hold");

const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");
let activePlayer = 1;

const p1TotalScore = document.getElementById("p1-total-score");
const p2TotalScore = document.getElementById("p2-total-score");

const p1EndMsg = document.getElementById("p1-end-msg");
const p2EndMsg = document.getElementById("p2-end-msg");

const p1CurrentScore = document.getElementById("p1-current-score");
const p2CurrentScore = document.getElementById("p2-current-score");
let currentScore = 0;

let newBtnClicked = false;

rulesBtn.addEventListener('click', function(){
  rulesSec.style.display = "flex";
  rulesBtn.style.display = "none";
  newGameBtn.style.display = "none";
  diceContainer.style.display = "none";
  p1.style.display = "none";
  p2.style.display = "none";
  rollDiceBtn.style.display = "none";
  holdBtn.style.display = "none";
});

hideRulesBtn.addEventListener('click', function(){
  rulesSec.style.display = "none";
  rulesBtn.style.display = "";
  newGameBtn.style.display = "";
  diceContainer.style.display = "";
  p1.style.display = "";
  p2.style.display = "";
  returnRollDiceBtn();
  holdBtn.style.display = "flex";
    
  if((totalScore[activePlayer - 1] >= 100) || (!newBtnClicked)){
    rollDiceBtn.style.display = "none";
    holdBtn.style.display = "none";
  }
});

newGameBtn.addEventListener('click', function(){
  newBtnClicked = true;
  p1TotalScore.textContent = 0;
  p2TotalScore.textContent = 0;
  totalScore = [0, 0];
  currentScore = 0;
  p1CurrentScore.textContent = currentScore;
  p2CurrentScore.textContent = currentScore;
  p1EndMsg.style.opacity = "0";
  p2EndMsg.style.opacity = "0";
  activePlayer = 1;
  p1.classList.remove('player-not-active');
  p2.classList.add('player-not-active');
  returnRollDiceBtn();
  rollDiceBtn.textContent = `P${activePlayer} ROLLS`;
  holdBtn.style.display = "flex";
  p2.style.borderLeft = "none";
  document.getElementById("p1-end-msg").style.animation = "";
  document.getElementById("p2-end-msg").style.animation = "";
  hideDice();
});

function hideDice(){
  dice1.style.display = "none";
  dice2.style.display = "none";
  dice3.style.display = "none";
  dice4.style.display = "none";
  dice5.style.display = "none";
  dice6.style.display = "none";
};

function returnRollDiceBtn(){
  rollDiceBtn.style.display = "flex";
};

function switchPlayer(){
  currentScore = 0;
  document.getElementById(`p${activePlayer}-current-score`).textContent = currentScore;
  //below make the relevant player active. So if player one is active, it then makes player 2 active otherwise player one is active
  activePlayer = activePlayer === 1? 2 : 1;
//below adds/removed the class player-not-active depending on if it already has it or not
  p1.classList.toggle('player-not-active'); 
  p2.classList.toggle('player-not-active');
  rollDiceBtn.textContent = `P${activePlayer} ROLLS`;
};

rollDiceBtn.addEventListener('click', function(){
  hideDice();
  const diceRolled = Math.floor(Math.random()* 6) + 1;
  rollDiceBtn.textContent = "ROLL";
  console.log(diceRolled);
  document.getElementById(`dice${diceRolled}`).style.display = "grid";
  if(diceRolled != 1){
  currentScore += diceRolled;
  document.getElementById(`p${activePlayer}-current-score`).textContent = currentScore;
  }else{
    rollDiceBtn.style.display = "none";
    setTimeout(hideDice, 700);
    setTimeout(returnRollDiceBtn, 700);
    setTimeout(switchPlayer, 700);
  }
});

let totalScore = [0, 0];

holdBtn.addEventListener('click', function(){
  hideDice();
  totalScore[activePlayer - 1] += currentScore;
  document.getElementById(`p${activePlayer}-total-score`).textContent = totalScore[activePlayer - 1];
  if(totalScore[activePlayer - 1] >= 100){
    currentScore = 0;
    document.getElementById(`p${activePlayer}-current-score`).textContent = currentScore;
    document.getElementById(`p${activePlayer}-end-msg`).style.opacity = "1";
    document.getElementById(`p${activePlayer}-end-msg`).style.animation = "1s 3 flash";
    p1.classList.remove('player-not-active'); 
    p2.classList.remove('player-not-active');
    p2.style.borderLeft = "2px solid pink";
    rollDiceBtn.style.display = "none";
    holdBtn.style.display = "none";
  }else{
   switchPlayer() 
  }
});