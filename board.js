class Board {
    constructor () {
        this.gameWon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        this.userChoices = [];
        this.pcChoices = [];
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
        this.won = false;
    }

    playPC () {
        let choice;
        while (true) {
            choice = Math.ceil(Math.random() * 9);
            if (this.allowedChoices.includes(choice)) {
                console.log(`PC chose: ${choice}`);
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

class AdvancedBoard extends Board {
    //
}

game = new Board();
while (true) {
    let choices = game.getChoices();
    // console.log(`Choices: ${choices}`);
    let choice = Math.ceil(Math.random() * 9);
    if (choices.includes(choice)) {
        // console.log(`chose: ${choice}`);
        game.add(choice);
        if (game.won === true || choices.length === 0) {
            break;
        }
    }
}

module.exports = Board;