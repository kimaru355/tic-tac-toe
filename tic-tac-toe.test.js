import ticTacToe from ('./tic-tac-toe');

describe('ticTacToe', () => {
    test('should be defined', () => {
    expect(ticTacToe).toBeDefined();
    });
    test('accepts sign and returns array', () => {
        expect(ticTacToe('X')).toBeInstanceOf(Array);
    });
    test('accepts sign and returns array with length 9', () => {
        expect(ticTacToe('X').length).toBe(9);
    });
    test('accepts sign and returns 9 unique characters between 1-9', () => {
        expect(ticTacToe('X')).toEqual(expect.arrayContaining([1,2,3,4,5,6,7,8,9]));
    });
    test('return null when sign is not X or O or when number not between 1-9 passed', () => {
        expect(ticTacToe('X', 'X')).toBeNull();
    });
});