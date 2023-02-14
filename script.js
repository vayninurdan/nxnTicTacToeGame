let nValue = document.getElementById('nValue');
let startButton = document.getElementById('startButton');
let valueButton = document.getElementById('valueButton');
let message = document.getElementById('message');
let container = document.getElementById('container');
let nText = document.getElementById('nText');
let gameHeadingText = document.getElementById('gameHeadingText');
let backToLoginScreenBtn = document.getElementById('backToLoginScreenBtn');

let loginScreen = document.getElementById('loginScreen');
let gameScreen = document.getElementById('gameScreen');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

valueButton.addEventListener('click', getValueFromInput);
startButton.addEventListener('click', playTheGame);
backToLoginScreenBtn.addEventListener('click', function(){
    loginScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
});


function getValueFromInput(){
    // get value from input

    let n = nValue.value;
    nText.innerText = `N = ${n}`;
    nText.style.marginTop = '25px';
     if(n < 3){
      message.innerText = "ENTER A NUMBER OF 3 OR MORE !!!";
      message.style.color = 'red';
      message.style.marginTop = '25px';
     } else {
      message.innerText = "";
     }
}


function playTheGame(){
      // Hide the login screen and show the game screen
  loginScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  
  
  // Set focus to the gamepad element
  let gamepad = document.getElementById('gamepad');
  gamepad.focus();

     // Get the size of the game area from the input element
     n = nValue.value;
    
     // create array from n value


     // Apply styles to the game screen
    gameScreen.style.cssText = `
        background-color: var(--background);
        height: 300vh;
    `;
    gameHeadingText.style.cssText = `
        color: white; 
        display: flex;
        padding-top: 100px;
        justify-content: center;
    `;

    createGameBoard();
    printGameBoard();
}


function createGameBoard(){
   n = nValue.value;

  // Create an empty 2D array to represent the Tic Tac Toe game area
  let gameArea = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(0); // fill each cell with 0 initially
    }
    gameArea.push(row);
  }
}


function printGameBoard(n) {
    n = nValue.value;
    // Get the game board element from the HTML document
    let gameBoard = document.getElementById('gameBoard');
  
    // Clear the game board element of any existing content
    gameBoard.innerHTML = '';
  
    // Create a table element to hold the game board
    let table = document.createElement('table');
  
    // Add some styles to the table
    table.style.borderCollapse = 'collapse';
    table.style.margin = 'auto';
    table.style.marginTop = '60px';

  
    // Add the table to the game board element
    gameBoard.appendChild(table);
    gameBoard.appendChild(backToLoginScreenBtn);
    backToLoginScreenBtn.style.cssText=`
        display: flex;
        justify-content: center;
        align-items:center;
        margin: 0 auto;
        margin-top:50px;
        padding: 10px;
        border-radius: 10px;
        transition: 150ms transform;
        border: 2px solid #e6a714;
        background-color: transparent;
        color: #e6a714;
    `;
  
    // Create a two-dimensional array to represent the game board
    let board = [];
    for (let i = 0; i < n; i++) {
      board[i] = [];
      for (let j = 0; j < n; j++) {
        board[i][j] = '';
      }
    }
  
    // Loop through the rows of the game area and generate a table row for each row
    for (let i = 0; i < n ; i++) {
      let row = document.createElement('tr');
      table.appendChild(row);
  
      // Loop through the columns of the current row and generate a table cell for each column
      for (let j = 0; j < n; j++) {
        let cell = document.createElement('td');
  
        // Add some styles to the table cell
        cell.style.cssText = `
           width: 50px;
           height: 50px;
           border: 1px solid white;
           text-align: center;
           vertical-align: middle;
           font-size: 24px;
           font-weight: bold;
           cursor: pointer;
           color:white;
        `;

        // Add an event listener to the cell that will handle the user's move
        cell.addEventListener('click', function() {
          // Check if the cell is already taken
          if (board[i][j] !== '') {
            return;
          }
  
          // Update the board and the cell text content with the current player's symbol
          //board[i][j] = 'X'; // or 'O' for the other player
          //cell.textContent = 'X'; // or 'O' for the other player
          board[i][j] = currentPlayer;
          cell.textContent = currentPlayer;
          currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

  
          // TODO: Check if the game is over and display the result
        });
  
        // Add the table cell to the current row
        row.appendChild(cell);
      }
    }
  }
  

