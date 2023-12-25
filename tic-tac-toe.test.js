const ticTacToe = require('./tic-tac-toe');

function generateNumber (allowedNumbers) {
    let randomNumber = Math.floor(Math.random() * allowedNumbers.length);
    return allowedNumbers[randomNumber];
};

describe('ticTacToe', () => {
    test('should be defined', () => {
    expect(ticTacToe).toBeDefined();
    });
    test('should be a function', () => {
        expect(typeof ticTacToe).toBe('function');
    });
    test('accepts X, O or number betweeen 1-9', () => {
        expect(ticTacToe('X')).toBeInstanceOf(Array);
        expect(ticTacToe('O')).toBeInstanceOf(Array);
        expect(ticTacToe(1)).toBeInstanceOf(Array);
        expect(ticTacToe('a')).toBeNull();
        expect(ticTacToe(0)).toBeNull();
        expect(ticTacToe(10)).toBeNull();
        expect(ticTacToe(-1)).toBeNull();
    });
    test('accepts sign and returns array with length 9', () => {
        expect(ticTacToe('X').length).toBe(9);
    });
    test('accepts sign and returns 9 unique characters between 1-9', () => {
        expect(ticTacToe('X')).toEqual(expect.arrayContaining([1,2,3,4,5,6,7,8,9]));
    });
    test('return null when more than 1 argument is passed', () => {
        expect(ticTacToe('X', 'X')).toBeNull();
        expect(ticTacToe(3, 4)).toBeNull();
    });
    test('return null when nothing is passed', () => {
        expect(ticTacToe()).toBeNull();
    });
});