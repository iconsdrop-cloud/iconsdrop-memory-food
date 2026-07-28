const icons = [

    "pizza.png",
    "burger.png",
    "coffee.png",
    "apple.png",
    "broccoli.png",
    "donut.png"

];


let cards = [];

let firstCard = null;
let secondCard = null;

let lock = false;

let moves = 0;

let matched = 0;

let seconds = 0;

let timer;



const board = document.getElementById("game-board");



function startGame(){

    board.innerHTML="";

    moves = 0;
    matched = 0;
    seconds = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("timer").textContent = seconds;


    clearInterval(timer);

    timer = setInterval(()=>{

        seconds++;

        document.getElementById("timer").textContent = seconds;

    },1000);



    cards = [...icons, ...icons];


    cards.sort(()=>Math.random()-0.5);



    cards.forEach(icon=>{


        const card = document.createElement("div");

        card.classList.add("card");


        card.innerHTML = `

            <img src="${icon}" alt="icon">

        `;


        card.dataset.icon = icon;


        card.onclick = flipCard;


        board.appendChild(card);


    });


}



function flipCard(){


    if(lock) return;

    if(this.classList.contains("matched")) return;

    if(this === firstCard) return;


    this.classList.add("flipped");



    if(!firstCard){

        firstCard=this;

        return;

    }


    secondCard=this;


    moves++;

    document.getElementById("moves").textContent=moves;



    checkMatch();


}




function checkMatch(){


    if(firstCard.dataset.icon === secondCard.dataset.icon){


        firstCard.classList.add("matched");

        secondCard.classList.add("matched");


        matched +=2;


        resetCards();


        if(matched === cards.length){

            endGame();

        }


    }

    else {


        lock=true;


        setTimeout(()=>{


            firstCard.classList.remove("flipped");

            secondCard.classList.remove("flipped");


            resetCards();


        },1000);


    }


}




function resetCards(){

    firstCard=null;

    secondCard=null;

    lock=false;

}




function endGame(){


    clearInterval(timer);


    document.getElementById("final-time").textContent=seconds;

    document.getElementById("final-moves").textContent=moves;


    document.getElementById("win-message").classList.remove("hidden");


}



function restartGame(){

    document.getElementById("win-message").classList.add("hidden");

    startGame();

}



startGame();
