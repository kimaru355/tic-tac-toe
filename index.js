const board = require('./board');
const buttons = document.querySelectorAll('.userChoice');
const displayActions = document.querySelector('#displayActions');

function createElement(element) {
    return document.createElement(element);
}

let game = new board.Board();

buttons.forEach((userChoice) => {
    userChoice.addEventListener('click', () => {
        let choices = game.getChoices();
        if (choices.contains(+userChoice.id)) {
            game.add(+userChoice.id);
        }
    })
})