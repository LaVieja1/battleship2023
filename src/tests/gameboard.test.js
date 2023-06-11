import Gameboard from "../modules/gameboard.js";

describe('Gameboard', () => {
    describe('Board', () => {
        const gameboard = Gameboard();

        test('Empty board', () => {
            const actual = gameboard.getBoard().every((square) => square === null);
            const expected = false;
            expect(actual).toBe(expected);
        });

        test('Board row', () => {
            const actual = gameboard.getBoard().length;
            const expected = 10;
            expect(actual).toBe(expected);
        });

        test('Board column', () => {
            const actual = gameboard.getBoard()[0].length;
            const expected = 10;
            expect(actual).toBe(expected);
        });
    });


})