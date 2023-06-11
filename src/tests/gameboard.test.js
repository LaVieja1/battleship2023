import Gameboard from "../modules/gameboard.js";
import Ship from "../modules/ship.js";

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

    describe('Place horizontal ship', () => {
        const gameboard = Gameboard();
        const ship = Ship('cruiser');
        gameboard.placeShip(ship, 3, 2);

        test('Placed ship at starter coord index: 0', () => {
            const actual = gameboard.getBoard()[3][2];
            expect(actual).toEqual({ ship, index: 0 })
        });

        test('Placed ship at coord index: 1', () => {
            const actual = gameboard.getBoard()[3][3];
            expect(actual).toEqual({ ship, index: 1 });
        });

        test('Placed ship at final coord index: 2', () => {
            const actual = gameboard.getBoard()[3][4];
            expect(actual).toEqual({ ship, index: 2 });
        });
    });

    describe('Place vertical ship', () => {
        const gameboard = Gameboard();
        const ship = Ship('submarine');
        ship.changeDirection();
        gameboard.placeShip(ship, 3, 2);

       
        test('Placed ship at starter coord index: 0', () => {
            const actual = gameboard.getBoard()[3][2];
            expect(actual).toEqual({ ship, index: 0 })
        });

        test('Placed ship at coord index: 1', () => {
            const actual = gameboard.getBoard()[4][2];
            expect(actual).toEqual({ ship, index: 1 });
        });

        test('Placed ship at final coord index: 2', () => {
            const actual = gameboard.getBoard()[5][2];
            expect(actual).toEqual({ ship, index: 2 });
        }); 
    });

    
})