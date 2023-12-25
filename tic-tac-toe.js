let allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getPC () {
    while (True) {
        let pc = Math.ceil(Math.random() * 9);
        if (allowedNumbers.includes(pc)) {
            break;
        }
    }
}

function playGame (user) {
    removeUsed(used);
    let pc = getPC();
}

function ticTacToe (user) {
    if (user === 'X') {
        return allowedNumbers;
    } else if (user === 'O') {
        return allowedNumbers;
    } else if (allowedNumbers.includes(user)) {
        playGame(user);
        return allowedNumbers;
    } else {
        return null;
    }
}