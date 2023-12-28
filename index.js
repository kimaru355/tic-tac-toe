const board = require('./board');
const buttons = document.querySelectorAll('.userChoice');

let game = new board.Board();

buttons.forEach((userChoice) => {
    userChoice.addEventListener('click', () => {
        if (userChoice.textContent !== '') {
            return;
        }
        let choices = game.getChoices();
        if (choices.contains(+userChoice.id)) {
            userChoice.textContent = 'X';
            game.add(+userChoice.id);
            choices.splice(choices.indexOf(+userChoice.id), 1);
            choices.forEach((choice) => {
                let remChoices = game.getChoices();
                if (!remChoices.includes(choice)) {
                    let pcChoice = document.querySelector(`#${choice}`);
                    pcChoice.textContent = 'O';
                }
            });
        }
    });
});