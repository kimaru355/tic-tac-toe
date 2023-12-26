const buttons = document.querySelectorAll('.userChoice')

let allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let userSign;
let pcSign;

buttons.forEach(userChoice => {
    addEventListener('click', () => {
        ticTacToe(userChoice.id);
    })
})

function removeUsed (player, choice) {
    allowedNumbers.splice(allowedNumbers.indexOf(choice), 1);
    board.splice(board.indexOf(choice), 1, player);
}

function getPC () {
    while (True) {
        let pc = Math.ceil(Math.random() * 9);
        if (allowedNumbers.includes(pc)) {
            return pc;
        }
    }
}

function playGame (user) {
    removeUsed(userSign, user);
    let pc = getPC();
    removeUsed(pcSign, pc);
    displayBoard();
}

function ticTacToe (user) {
    if (user === 'X') {
        userSign = 'X';
        pcSign = 'O';
        return allowedNumbers;
    } else if (user === 'O') {
        userSign = 'O';
        pcSign = 'X';
        return allowedNumbers;
    } else if (allowedNumbers.includes(+user)) {
        playGame(user);
        return allowedNumbers;
    } else {
        return null;
    }
}

module.exports = ticTacToe;