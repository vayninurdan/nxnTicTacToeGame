let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
// let boxes = Array.from(document.getElementsByClassName('box')); 
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let inputValue = document.getElementById('inputValue');
let startButton = document.getElementById('startButton');
let message = document.getElementById('message');
let nText = document.getElementById('nText');
let loginScreen = document.getElementById('loginScreen');
let gameScreen = document.getElementById('gameScreen');
let restartButton = document.getElementById('restartButton'); 
let backToLoginScreen = document.getElementById('backToLoginScreen');

const O_TEXT = "0";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
gameScreen.classList.add('hidden');
loginScreen.classList.remove('hidden');


let value;
let spaces;
startButton.addEventListener('click', ()=> {
 value = inputValue.value;
 if(value < 3){
    nText.innerText = `N = ${value}`;
    nText.style.marginTop = '25px';
    message.innerText = "ENTER A NUMBER OF 3 OR MORE !!!";
    message.style.color = 'red';
    message.style.marginTop = '25px';
   } else {
    // Hide the login screen and show the game screen
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    playerText.style.display = 'block';
    playerText.style.marginBottom = '50px';
    // Buttons Styles
    restartButton.style.cssText = `
    display : flex;
    color : var(--orange);
    background-color: transparent;
    margin-top: 40px;
    `;
    backToLoginScreen.style.cssText = `
    display : flex;
    color : var(--orange);
    background-color: transparent;
    margin-top: 40px;
    `;
    message.innerText = "";
    createPlease(value);
   }
    spaces = Array(value*value).fill(null); 


});




function createPlease(){
    for(let i=0; i< value*value; i++){
        var box = document.createElement("div");
        box.className = "box";
        box.id = `${i}`;
        gameBoard.appendChild(box);
        console.log(box);
    }
    
    let boxes = Array.from(document.getElementsByClassName('box'));
    startGame(boxes,box);
    let columnTemplate = '';
    for (let i = 0; i < value; i++) {
    columnTemplate += 'auto ';
    }
    gameBoard.style.gridTemplateColumns = columnTemplate.trim();
  
}





const startGame = (boxes,box) => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e){
    console.log(spaces);
    const id = e.target.id; // Tıkladığımız kutunun id'sini alıyor.
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon(spaces) !== false){
            playerText.innerText = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        } 

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;


    }
    playerHasWon(spaces);
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function playerHasWon(spaces){
    for(const condition of winningCombos){
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c];
        } 
    }
    return false;
}

startGame();

