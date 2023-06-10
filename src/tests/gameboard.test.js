import Gameboard from "../modules/gameboard.js";

describe('Gameboard', () => {
    describe('Board', () => {
        const gameboard = Gameboard();

        test('Empty board', () => {
            const actual = gameboard.getBoard().every((square) => square === null);
            const expected = false;
            expect(actual).toBe(expected);
        });


    })
})