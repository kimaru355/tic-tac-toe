const buttons = document.querySelectorAll('.userChoice');
const displayActions = document.querySelector('#displayActions');

let allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let userSign;
let pcSign;

function createElement(element) {
    return document.createElement(element);
}

buttons.forEach(userChoice => {
    userChoice.addEventListener('click', () => {
        if (userChoice.id === 'X') {
            let checkChosen = document.querySelector('#O');
            if (checkChosen.classList.contains('bg-green-300')) {
                checkChosen.classList.toggle('bg-green-300');
                userSign = 'X';
                pcSign = 'O';
                userChoice.classList.toggle('bg-green-300');
            }
        } else if (userChoice.id === 'O') {
            let checkChosen = document.querySelector('#X');
            if (checkChosen.classList.contains('bg-green-300')) {
                checkChosen.classList.toggle('bg-green-300');
                userSign = 'O';
                pcSign = 'X';
                userChoice.classList.toggle('bg-green-300');
            }
        }
        // let p = createElement('p');
        // p.textContent = `You clicked ${userChoice.id}`;
        // displayActions.appendChild(p);
        // ticTacToe(userChoice.id);
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
    if (allowedNumbers.includeNs(+user)) {
        playGame(user);
        return allowedNumbers;
    } else {
        return null;
    }
}

module.exports = ticTacToe;