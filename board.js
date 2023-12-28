class Board {
    constructor (userSign, pcSign) {
        this.gameWon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        this.userSign = userSign;
        this.pcSign = pcSign;
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
    }
    add (choice) {
        this.userChoices.push(choice);
        this.allowedChoices.splice(this.allowedChoices.indexOf(choice), 1);
        this.pcChoices.push(this.playPC());
    }
}