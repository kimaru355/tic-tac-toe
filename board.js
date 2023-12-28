class Board {
    constructor (userSign, pcSign) {
        this.gameWon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        this.userChoices = [];
        this.pcChoices = [];
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
    }

    playPC () {
        let choice;
        while (true) {
            choice = Math.ceil(Math.random() * 9);
            if (this.allowedChoices.includes(choice)) {
                break;
            }
        }
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        return choice;
    }

    add (choice) {
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.checkWin();
        this.pcChoices.push(this.playPC());
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
        this.reset();
    }

    reset () {
        this.userChoices = [];
        this.pcChoices = [];
        this.allowedChoices = [1,2,3,4,5,6,7,8,9];
    }
}

game1 = new Board();