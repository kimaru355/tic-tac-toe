const buttons = document.querySelectorAll('.userChoice');

class Board {
    constructor () {
        this.gameWon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        this.userChoices = [];
        this.pcChoices = [];
        this.pcChoice = 0;
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
        this.won = false;
    }

    playPC () {
        let choice;
        while (true) {
            choice = Math.ceil(Math.random() * 9);
            if (this.allowedChoices.includes(choice)) {
                this.pcChoice = choice;
                // console.log(`PC chose: ${choice}`);
                break;
            }
        }
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        return choice;
    }

    getChoices () {
        return this.allowedChoices;
    }

    add (choice) {
        // console.log(`Choices: ${this.allowedChoices}`);
        // console.log(`User chose: ${choice}`);
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.checkWin();
        this.pcChoices.push(this.playPC());
        this.checkWin();
        // console.log(`User choices: ${this.userChoices}`);
        // console.log(`PC choices: ${this.pcChoices}`);
    }

    checkWin () {
        let counter = 0;
        this.gameWon.forEach((win) => {
            this.userChoices.forEach((choice) => {
                counter = 0;
                if (win.includes(choice)) {
                    counter++;
                }
            })
            if (counter === 3) {
                this.won('user');
            }
            this.pcChoices.forEach((choice) => {
                counter = 0;
                if (win.includes(choice)) {
                    counter++;
                }
            })
            if (counter === 3) {
                this.won('pc');
            }
        })
    }

    won (winner) {
        if (winner === 'user') {
            console.log("You won!");
        } else {
            console.log("You lost!");
        }
        this.won = true;
        this.reset();
    }

    reset () {
        this.userChoices = [];
        this.pcChoices = [];
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
    }
}

let game = new Board();

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
            // console.log(game.pcChoice);
            let showPcChoice = document.getElementById(game.pcChoice);
            showPcChoice.classList.add('text-4xl');
            showPcChoice.textContent = 'O';
        }
    });
});