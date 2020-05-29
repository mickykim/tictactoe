/**
 * Gameboard module that will have information related to the tictactoe game.
 * 
 * TODO: Figure out what the board needs to do vs the player
 * @param 
 */
const gameBoard = ( () => {
    //Private variables

    let currentPlayer = undefined;
    let players = [];
    //!Board x and y coordinates are swapped compared to the DOM due to double array structure.
    let board = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0]
    ];

    //Private methods

    /**
     * Adds a visual representation of the player marker on the DOM
     * @param x X-coordinate of the marked location
     * @param y Y-coordinate of the marked location
     * @param marker Marker of the current player
     */
    const markDOM = (x, y) => {
        let markedSquare = document.querySelector(`#square${x}${y}`);
        markedSquare.style.backgroundColor = currentPlayer.getMarker();

    }

    /**
     * Record players action
     * @param x X-coordinate of the marked location
     * @param y Y-coordinate of the marked location
     * @param marker Marker of the current player
     */
    const markBoard = (x, y) => {
        const marker = currentPlayer.getMarker();
        //Need to swap x with y due to the difference in the coordinate system in the double array vs the DOM.
        if(board[y][x] === 0) {
            markDOM(x, y, marker);
            board[y][x] = marker;
        } else {
            alert("Choose an empty square grid");
        }
    }
    
    const checkWinner = (x, y) => {
        let playerWin = false;
        console.log(board);

        //Horizontal check
        if(board[y].every(value => value === board[y][0])){
            playerWin = true;
        }

        //Vertical check
        for(let i = 0; i < board.length; i++) {
            if(board[y][x] === board[i][x]){
                playerWin = true;
            } else {
                playerWin = false;
                break;
            }
        }

        //Diagonal check
        //TODO: Make it work on any board size dimension
        if(x === y) {
            if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                playerWin = true;
            }
            
        }
        if(Math.abs(x - y) === 2){
            if(board[2][0] === board[1][1] && board[2][0] === board[0][2]){
                playerWin = true;
            }
        }

        //Do stuff if the player wins
        if(playerWin) {
            currentPlayer.increaseScore();
            alert(`${currentPlayer.getMarker()} wins!`);
            return true;
        }

        return false;
        
    }

    const changeTurn = () => {
        if(currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    const clearBoard = () => {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        let containerDiv = document.querySelector('.container');
        containerDiv.textContent = '';

    }

    //Getters and Setters

    const getBoard = () => {
        return board;
    }

    //Public methods

    const createDOMBoard = (x = 3, y = 3) => {
        //Clear previous game board if it exists.
        clearBoard();

        const containerDiv = document.querySelector('.container');
        
        for(let y_coor = 0; y_coor < y; y_coor++) {
            let boardRow = document.createElement('div');
            boardRow.id = `boardRow${y_coor}`;
            
            for(let x_coor = 0; x_coor < x; x_coor++) {
                let boardSquare = document.createElement('div');
                boardSquare.id = `square${x_coor}${y_coor}`;
                boardSquare.addEventListener('click', function() {
                    markBoard(x_coor, y_coor);
                    if(!checkWinner(x_coor, y_coor)){
                        changeTurn();
                    }
                
                });
                boardRow.appendChild(boardSquare);
            }
            containerDiv.appendChild(boardRow);
        }

    }

    const setPlayers = (player1, player2) => {
        players = [player1, player2];
        currentPlayer = players[0];
    }
    
    return {createDOMBoard, getBoard, setPlayers};
})()

/**
 * Player factory for creating the players that will play the game.
 * 
 * @param marker: the type of marker to select a spot in the game
 */
const playerFactory = (playerMarker) => {
    //Private variables
    const marker = playerMarker;
    let playerScore = 0;
    
    //Public methods
    const getMarker = () => {
        return marker;
    }

    const increaseScore = () => {
        playerScore++;
    }

    const getScore = () => {
        return playerScore;
    }
    return {getMarker, increaseScore, getScore};
}

//Global variables

//Main
console.log("Hello!");
gameBoard.createDOMBoard();
let player1 = playerFactory('purple');
let player2 = playerFactory('blue');
gameBoard.setPlayers(player1, player2 );