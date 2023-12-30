const buttons = document.querySelectorAll('.userChoice');

class Board {
    constructor () {
        this.gameWon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        this.userChoices = [];
        this.pcChoices = [];
        this.pcChoice = 0;
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
        this.won = false;
        this.winner = '';
    }

    playPC () {
        let choice;
        while (true) {
            choice = Math.ceil(Math.random() * 9);
            if (this.allowedChoices.includes(choice)) {
                this.pcChoice = choice;
                this.pcChoices.push(choice);
                // console.log(`PC chose: ${choice}`);
                break;
            }
        }
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
    }

    getChoices () {
        return this.allowedChoices;
    }

    add (choice) {
        // console.log(`Choices: ${this.allowedChoices}`);
        // console.log(`User chose: ${choice}`);
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.checkWin('user');
        if (this.won) {
            return;
        }
        this.playPC();
        this.checkWin('pc');
        // console.log(`User choices: ${this.userChoices}`);
        // console.log(`PC choices: ${this.pcChoices}`);
    }

    checkWin (player) {
        let counter = 0;
        this.gameWon.forEach((win) => {
            if (player === 'user') {
                counter = 0;
                this.userChoices.forEach((choice) => {
                    if (win.includes(choice)) {
                        counter += 1;
                        // console.log(`${choice} is in ${win} counter: ${counter}`);
                    }
                })
                if (counter === 3) {
                    this.winner = 'user';
                    this.won = true;
                }
            } else if (player === 'pc') {
                counter = 0;
                this.pcChoices.forEach((choice) => {
                    if (win.includes(choice)) {
                        counter += 1;
                        // console.log(`${choice} is in ${win} counter: ${counter}`);
                    }
                })
                if (counter === 3) {
                    this.winner = 'pc';
                    this.won = true;
                }
            }
        })
    }

    reset () {
        this.userChoices = [];
        this.pcChoices = [];
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
        this.won = false;
        this.pcChoice = 0;
    }
}

let game = new Board();

function newGame () {
    alert(game.winner);
    let div = document.createElement('div');
    let p = document.createElement('p');
    let main = document.querySelector('main');
    let closeButton = document.createElement('button');

    div.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-gray-900', 'bg-opacity-50', 'flex', 'flex-col', 'justify-center', 'items-center');
    p.classList.add('text-5xl', 'text-white');
    closeButton.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded', 'mt-4', 'text-2xl');

    p.textContent = game.winner === 'user' ? 'You won!' : 'You lost';
    closeButton.textContent = 'Close';
    div.appendChild(p);
    div.appendChild(closeButton);
    main.appendChild(div);

    closeButton.addEventListener('click', () => {
        main.removeChild(div);
        buttons.forEach((button) => {
            button.textContent = '';
            button.classList.remove('text-4xl');
        });
        game.reset();
    });
}

buttons.forEach((userChoice) => {
    userChoice.addEventListener('click', () => {
        if (userChoice.textContent !== '') {
            return;
        }
        let choices = game.getChoices();
        // console.log(game.getChoices());
        // console.log(`You chose ${userChoice.id}`)
        if (choices.includes(+userChoice.id)) {
            userChoice.classList.add('text-4xl')
            userChoice.textContent = 'X';
            game.add(+userChoice.id);
            if (game.won) {
                newGame();
                return;
            }
            // console.log(game.pcChoice);
            let showPcChoice = document.getElementById(game.pcChoice);
            showPcChoice.classList.add('text-4xl');
            showPcChoice.textContent = 'O';
            if (game.won) {
                newGame();
            }
        }
    });
});