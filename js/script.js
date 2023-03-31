const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const playermessage = document.querySelector('.playermessage')

// line 1-6 using getElementbyID save the values of the board elements (winning message and restart button) and querySelector method return the first element in the doc. Used the square brackets to get the data-cell attribute. 
const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// making the game play
startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
    })
    isPlayer_0_Turn = false
    winningMessageElement.classList.remove('show')
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
        cell.textContent = ''
    })
    setBoardHoverClass()
}
// starting the game and X goes first and set player O to false 
function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayer_0_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
// handleclick is for the mouse click on the cells of the board. Currentclass saves the X or O who turn it is.
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Its's a draw!"
    } else if (checkWin(PLAYER_X_CLASS)) {
        winningMessageTextElement.innerText = `Player X WINS!`
    } else {
        winningMessageTextElement.innerText = `Player O WINS!`
    }
    winningMessageElement.classList.add('show')
}
// endgame function ends the game.     
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
}
// is draw function if no one wins.
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    cell.textContent = currentClass === PLAYER_X_CLASS ? 'X':'O'
}
function swapTurns() {
    isPlayer_0_Turn = !isPlayer_0_Turn
    playermessage.innerText = isPlayer_0_Turn ? 'Player O Turn' : 'Player X Turn'
}
//placemark function places the X or O in the cell. Swapturns function turns after the X or O is place in the cell. 
function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_O_CLASS)
    if (isPlayer_0_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS)
    } else {
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}
//Setboardhoverclass function the characters appear in cells while hovering over the cell. 
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
//checkwin function check if the board matches the winning combination.  