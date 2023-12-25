let allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let userSign;
let pcSign;

function removeUsed (used) {
    allowedNumbers.splice(allowedNumbers.indexOf(used), 1);
}

function getPC () {
    while (True) {
        let pc = Math.ceil(Math.random() * 9);
        if (allowedNumbers.includes(pc)) {
            break;
        }
    }
}

function playGame (user) {
    removeUsed(user);
    let pc = getPC();
    removeUsed(pc);
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
    } else if (allowedNumbers.includes(user)) {
        playGame(user);
        return allowedNumbers;
    } else {
        return null;
    }
}

export default ticTacToe;