import Gameboard from "../modules/gameboard.js";
import Player from "../modules/player.js";
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

    describe('NOT Place out-of-bounds ship', () => {
        const gameboard = Gameboard();
        const carrier = Ship('carrier'); // 5 length

        test('out-of-bounds ship horizontal', () => {
            gameboard.placeShip(carrier, 7, 7); //[7,7],[7,8],[7,9],[7,10],[7,11] X
            const actual = gameboard.getBoard()[7][7];
            expect(actual).toEqual(null);
        });

        test('out-of-bounds ship vertical', () => {
            carrier.changeDirection();
            gameboard.placeShip(carrier, 7, 7); // [7,7],[8,7],[9,7],[10,7],[11,7] X
            const actual = gameboard.getBoard()[7][7];
            expect(actual).toEqual(null);
        });
    });

    describe('NOT Place if collision with another ship', () => {
        const gameboard = Gameboard();
        const carrier = Ship('carrier');
        const battleship = Ship('battleship');

        test('Collision with ship', () => {
            gameboard.placeShip(carrier, 2, 0); //[2,0],[2,1],[2,2],[2,3],[2,4]
            gameboard.placeShip(battleship, 2, 0); //[2,0],[2,1],[2,2],[2,3] X
            const actual = gameboard.getBoard()[2][0];
            expect(actual).toEqual({ ship: carrier, index: 0 }); //No coloca el battleship
        });

        test('Collision with ship 1 place', () => {
            gameboard.placeShip(carrier, 2, 0); //[2,0],[2,1],[2,2],[2,3],[2,4]
            battleship.changeDirection();
            gameboard.placeShip(battleship, 0, 2); // [0,2],[1,2],[2,2],[3,2] X
            const actual = gameboard.getBoard()[0][2];
            expect(actual).toEqual(null); //No coloca el battleship porque carrier ocupa [2,2]
          });
    });

    describe('All ships placed', () => {
        const gameboard = Gameboard();
        const carrier = Ship('carrier');
        const battleship = Ship('battleship');
        const cruiser = Ship('cruiser');
        const submarine = Ship('submarine');
        const destroyer = Ship('destroyer');

        test('No ships placed', () => {
            const actual = gameboard.areAllShipsPlaces();
            expect(actual).toBe(false);
        });

        test('Some ships placed', () => {
            gameboard.placeShip(carrier, 0 , 0);
            gameboard.placeShip(battleship, 1, 0);
            const actual = gameboard.areAllShipsPlaces();
            expect(actual).toBe(false);
        });

        test('Placed all ships', () => {
            gameboard.placeShip(cruiser, 2, 0);
            gameboard.placeShip(submarine, 3, 0);
            gameboard.placeShip(destroyer, 4, 0);
            const actual = gameboard.areAllShipsPlaces();
            expect(actual).toBe(true);
        });
    });

    describe('Auto place fleet', () => {
        const gameboard = Gameboard();
        const player = Player();
        const fleet = player.getFleet();
        gameboard.autoPlaceFleet(fleet);

        test('All ships placed', () => {
            const actual = gameboard.areAllShipsPlaces();
            expect(actual).toBe(true);
        });

        test('Number of cells matches all ships placed', () => {
            const actual = gameboard.getBoard().flat().filter((cell) => cell !== null)
                .length;
            expect(actual).toBe(17);
        });
    });

    describe('receive attack', () => {
        const gameboard = Gameboard();
        const carrier = Ship('carrier');
        const battleship = Ship('battleship');
        gameboard.placeShip(carrier, 2, 0); // [2,0],[2,1],[2,2],[2,3],[2,4]
        battleship.changeDirection();
        gameboard.placeShip(battleship, 3, 2); // [3,2],[4,2],[5,2],[6,2]

        test('Attack a carrier at index 0', () => {
            gameboard.receiveAttack(2, 0);
            const actual = carrier.getHits();
            expect(actual).toEqual(['hit', null, null, null, null]);
        });

        test('Attack a carrier at index 3', () => {
            gameboard.receiveAttack(2, 3);
            const actual = carrier.getHits();
            expect(actual).toEqual(['hit', null, null, 'hit', null]);
        });

        test('Miss', () => {
            gameboard.receiveAttack(0, 0);
            const actual = gameboard.getBoard()[0][0];
            expect(actual).toEqual('miss');
        });

        test('Hit a cell (2,0)', () => {
            const actual = gameboard.getBoard()[2][0];
            expect(actual).toEqual('hit');
        });

        test('Hit a cell (2,3)', () => {
            const actual = gameboard.getBoard()[2][3];
            expect(actual).toEqual('hit');
        });
    });

    describe('Are all ships sunk', () => {
        const gameboard = Gameboard();
        const submarine = Ship('submarine');
        const destroyer = Ship('destroyer');
        gameboard.placeShip(submarine, 2, 0); // [2,0],[2,1],[2,2]
        destroyer.changeDirection();
        gameboard.placeShip(destroyer, 3, 2); // [3,2],[4,2]

        test('NO Ship is sunk', () => {
            const actual = gameboard.areAllShipsSunk();
            expect(actual).toEqual(false);
        });

        test('1 Ship has sunk', () => {
            gameboard.receiveAttack(2, 0);
            gameboard.receiveAttack(2, 1);
            gameboard.receiveAttack(2, 2);
            const actual = gameboard.areAllShipsSunk();
            expect(actual).toEqual(false);
        });

        test('All ships have sunk', () => {
            gameboard.receiveAttack(3, 2);
            gameboard.receiveAttack(4, 2);
            const actual = gameboard.areAllShipsSunk();
            expect(actual).toEqual(true);
        });
    });

    
})