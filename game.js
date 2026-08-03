function startMemoryGame(){

    const home = document.getElementById("home-screen");
    const game = document.getElementById("game-screen");
    bestCombo = localStorage.getItem("bestCombo") || 0;

    home.classList.add("fade-out");


    setTimeout(()=>{

        home.classList.add("hidden");

        game.classList.remove("hidden");

        startGame();

    },600);

}


const icons = [
    "pizza.png",
    "coffee.png",
    "burger.png",
    "apple.png",
    "donut.png",
    "avocado.png",
    "beer mug.png",
    "broccoli.png",
    "chocolate muffin.png",
    "cookie.png",
    "croissant.png",
    "croque monsieur.png",
    "fish.png",
    "french fries.png",
    "fried Egg.png",
    "hot dog.png",
    "iced tea.png",
    "mussel.png",
    "onion.png",
    "pear.png",
    "pickles jar.png",
    "pineapple.png",
    "popcorn.png",
    "wine glass.png",
    "ravioli.png",
    "salad.png"
];


const wrongSound = new Audio("sounds/wrong.mp3");
const comboSound = new Audio("sounds/combo.mp3");
const clearLevelSound = new Audio("sounds/clear_level.mp3");
const gameOverSound = new Audio("sounds/game_over.mp3");

let cards = [];

let firstCard = null;

let secondCard = null;

let lock = false;

let moves = 0;

let availableMoves = 10;

let matched = 0;

let seconds = 0;

let combo = 0;

let bestCombo = 0;

let score = 0;

let timer;

let round = 1;

let gameOver = false;

const board = document.getElementById("game-board");



function startGame(){

gameOver = false;
    board.innerHTML = "";


    moves = 0;
    availableMoves = 10;
    matched = 0;

    seconds = 0;
    score = 0;
    combo = 0;
    round = 1;

    firstCard = null;

    secondCard = null;

    lock = false;

    document.getElementById("timer").textContent = seconds;
    document.getElementById("combo").textContent = combo;
    document.getElementById("score").textContent = score;
    document.getElementById("moves").textContent = availableMoves;
updateMovesDanger();
    clearInterval(timer);

    timer = setInterval(()=>{

        seconds++;

        document.getElementById("timer").textContent = seconds;

    },1000);


let selectedIcons = getRandomIcons(6);

cards = [...selectedIcons, ...selectedIcons];
  

    cards.sort(()=>Math.random()-0.5);


    cards.forEach(icon=>{


        const card = document.createElement("div");


        card.classList.add("card");



card.innerHTML = `

    <img src="images/${icon}" alt="icon">

`;



        card.dataset.icon = icon;



        card.onclick = flipCard;



        board.appendChild(card);



    });


}

/*
=================================
        CARD LOGIC
=================================
*/


function flipCard(){

if(gameOver) return;
    if(lock) return;

    if(this.classList.contains("matched")) return;

    if(this === firstCard) return;


    this.classList.add("flipped");

    if(!firstCard){


        firstCard = this;
        return;


    }



    secondCard = this;

 availableMoves--;
 document.getElementById("moves").textContent = availableMoves;
updateMovesDanger();
checkMatch();

}


function checkMatch(){


if(firstCard.dataset.icon === secondCard.dataset.icon){

        lock = true;
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matched += 2;
        availableMoves++;

        document.getElementById("moves").textContent = availableMoves;
updateMovesDanger();
        combo++;
        document.getElementById("combo").textContent = combo;
comboSound.currentTime = 0;

if(combo === 1){

    comboSound.volume = 0.3;
    comboSound.playbackRate = 1;

}

else if(combo === 2){

    comboSound.volume = 0.6;
    comboSound.playbackRate = 1.1;

}

else if(combo >= 3){

    comboSound.volume = 0.8;
    comboSound.playbackRate = 1.2;

}

    comboSound.currentTime = 0;
    comboSound.play();


        let bonusMoves = 0;

        if (combo >= 2) {

            bonusMoves = combo - 1;

            availableMoves += bonusMoves;

            document.getElementById("moves").textContent = availableMoves;
updateMovesDanger();

        }

        let points = 100 * combo;

        score += points;

        document.getElementById("score").textContent = score;

        showComboNotification(points);

if(combo > bestCombo){

    bestCombo = combo;

    localStorage.setItem("bestCombo", bestCombo);

    document.getElementById("best-combo").textContent = bestCombo;
showBestNotification(combo);

}

        setTimeout(()=>{

    resetCards();

},300);



if (matched >= cards.length) {
clearLevelSound.currentTime = 0;
    clearLevelSound.play();

     showRoundNotification();

    return;

}

        }



    else {

wrongSound.currentTime = 0;
wrongSound.play();

        lock = true;

combo = 0;

document.getElementById("combo").textContent = combo;


score -= 50;
if(score < 0){

    score = 0;

}

document.getElementById("score").textContent = score;

playWrongAnimation(firstCard);
playWrongAnimation(secondCard);

        setTimeout(()=>{


            firstCard.classList.remove("flipped");


            secondCard.classList.remove("flipped");



            resetCards();
if(availableMoves <= 0){

    const movesDisplay = document.getElementById("moves");

movesDisplay.innerHTML = `
    <img src="images/cross.png" class="danger-icon">
`;
    movesDisplay.classList.remove("moves-danger");
    movesDisplay.classList.add("moves-empty");



    setTimeout(()=>{

        gameOver = true;
  gameOverSound.currentTime = 0;
        gameOverSound.play();
        endGame();

    },800);

}

        },600);



    }



}



function resetCards(){


    firstCard = null;


    secondCard = null;


    lock = false;


}


function playWrongAnimation(card){

    card.classList.remove("wrong");

    void card.offsetWidth;

    card.classList.add("wrong");

}

/*
=================================
        END GAME
=================================
*/


function endGame(){

gameOver = true;
    clearInterval(timer);


document.getElementById("final-time").textContent = seconds;
document.getElementById("final-moves").textContent = moves;
document.getElementById("final-score").textContent = score;
document.getElementById("final-combo").textContent = bestCombo;


    document

    .getElementById("win-message")

    .classList

    .remove("hidden");



}






/*
=================================
        RESTART GAME
=================================
*/


function restartGame(){

    document
    .getElementById("win-message")
    .classList
    .add("hidden");


    clearInterval(timer);

    startGame();

}
function showComboNotification(points){


    const icon = document.getElementById("combo-icon");
    const notification = document.getElementById("combo-notification");


    notification.classList.remove(
        "combo-blue",
        "combo-green",
        "combo-gold"
    );


    if(combo >= 5){

        icon.src = "images/trophy.png";

        notification.classList.add("combo-gold");

    }


    else if(combo >= 3){

        icon.src = "images/sparks.png";

        notification.classList.add("combo-green");

    }


    else{

        icon.src = "images/fire.png";

        notification.classList.add("combo-blue");

    }


    document.getElementById("combo-value").textContent = combo;


    document.getElementById("combo-points").textContent =
        "+" + points + " points";


    notification.classList.remove("hidden");


    setTimeout(()=>{

        notification.classList.add("show");

    },10);



    setTimeout(()=>{


        notification.classList.remove("show");


        setTimeout(()=>{

            notification.classList.add("hidden");

        },300);


    },1200);


}

function nextRound(){
   
    round++;

    document.getElementById("round").textContent = round;

    matched = 0;

    firstCard = null;
    secondCard = null;
    lock = false;

    board.innerHTML = "";

    let selectedIcons = getRandomIcons(6);

cards = [...selectedIcons, ...selectedIcons];

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(icon => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${icon}" alt="icon">
        `;

        card.dataset.icon = icon;

        card.onclick = flipCard;

        board.appendChild(card);

    });

}

function showRoundNotification(){

    const notification = document.getElementById("round-notification");
    const value = document.getElementById("round-value");

    value.textContent = "Round " + (round + 1);

    notification.classList.remove("hidden");

    setTimeout(()=>{

        notification.classList.add("show");

    },10);


    setTimeout(()=>{

        notification.classList.remove("show");


        setTimeout(()=>{

            notification.classList.add("hidden");

            nextRound();

        },350);


    },1200);

}

function getRandomIcons(number){

    let shuffled = [...icons];

    shuffled.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, number);

}

function updateMovesDanger(){

   const movesDisplay = document.getElementById("moves");
    if(availableMoves <= 3){

        movesDisplay.classList.add("moves-danger");

    } else {

        movesDisplay.classList.remove("moves-danger");

    }

}
