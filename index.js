const buttons = document.querySelectorAll('.userChoice');
const modeButtons = document.querySelectorAll('a');

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
                break;
            }
        }
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
    }

    add (choice) {
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.checkWin('user');
        if (this.won || this.allowedChoices.length === 0) {
            return;
        }
        this.playPC();
        this.checkWin('pc');
    }

    checkWin (player) {
        let counter = 0;
        this.gameWon.forEach((win) => {
            if (player === 'user') {
                counter = 0;
                this.userChoices.forEach((choice) => {
                    if (win.includes(choice)) {
                        counter += 1;
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
        this.pcChoice = 0;
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
        this.won = false;
        this.winner = '';
    }
}

class AdvancedBoard extends Board {
    constructor() {
        super();
        this.mode = 'baby';
    }

    add (choice) {
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.advancedCheckWin();
    }

    blockWin (choice) {
        this.pcChoice = choice;
        this.pcChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
    }

    advancedCheckWin () {
        let counter = 0;
        let notCounted = 0;
        let resolved = false;
        this.gameWon.forEach((win) => {
            if (resolved === true) {
                return;
            }
            counter = 0;
            this.userChoices.forEach((choice) => {
                if (win.includes(choice)) {
                    counter += 1;
                }
            })
            if (counter === 3) {
                resolved = true;
                this.winner = 'user';
                this.won = true;
            } else if (counter === 2 && this.allowedChoices.length !== 0) {
                win.forEach((choice) => {
                    if (!this.userChoices.includes(choice)) {
                        notCounted = choice;
                    }
                });
                if (this.allowedChoices.includes(notCounted)) {
                    resolved = true;
                    this.blockWin(notCounted);
                }
            } else if (this.allowedChoices.length === 0) {
                resolved = true;
                this.won = true;
                this.winner = 'draw';
            }
        });
        if (resolved === false) {
            this.playPC();
            this.checkWin('pc');
        }
    }
}

let game = new Board();

modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let activeMode = document.querySelector('.active');
        activeMode.classList.remove('active');
        activeMode.classList.remove('border-4', 'border-white');
        activeMode.classList.add('border', 'border-slate-500');
        button.classList.add('active');
        button.classList.remove('border', 'border-slate-500');
        button.classList.add('border-4', 'border-white');
        if (button.id !== 'baby') {
            game = new AdvancedBoard();
        } else {
            game = new Board();
        }
    });
});

function newGame () {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let main = document.querySelector('main');
    let closeButton = document.createElement('button');

    div.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-gray-900', 'bg-opacity-50', 'flex', 'flex-col', 'justify-center', 'items-center');
    p.classList.add('text-5xl', 'text-white');
    closeButton.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded', 'mt-4', 'text-2xl');

    if (game.winner !== 'draw') {
        p.textContent = game.winner === 'user' ? 'You won!' : 'You lost';
    } else {
        p.textContent = "It's a tie!";
    }
    closeButton.textContent = 'Close';
    div.appendChild(p);
    div.appendChild(closeButton);
    main.appendChild(div);

    closeButton.addEventListener('click', () => {
        main.removeChild(div);
        buttons.forEach((button) => {
            button.textContent = '';
        });
        game.reset();
    });
}

buttons.forEach((userChoice) => {
    userChoice.addEventListener('click', () => {
        if (userChoice.textContent !== '') {
            return;
        }
        userChoice.textContent = 'X';
        game.add(+userChoice.id);
        if (game.winner === 'user' || game.winner === 'draw' || game.allowedChoices.length === 0) {
            newGame();
            return;
        }
        let showPcChoice = document.getElementById(game.pcChoice);
        showPcChoice.textContent = 'O';
        if (game.won) {
            newGame();
        }
    });
});