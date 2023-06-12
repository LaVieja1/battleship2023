import Player from "../modules/player.js";
import Gameboard from "../modules/gameboard.js";

const player = Player('human');
const enemy = Player('computer');
const playerBoard = Gameboard();
const enemyBoard = Gameboard();

describe('Player type', () => {
    test('Human type', () => {
        const actual = player.getType();
        expect(actual).toBe('human');
    });

    test('Computer type', () => {
        const actual = enemy.getType();
        expect(actual).toBe('computer');
    });
});

describe('Player attack', () => {
    test('Attack enemy board', () => {
        player.attack(2, 3, enemyBoard);
        const actual = enemyBoard.getBoard()[2][3];
        expect(actual).toBe('miss');
    });
});

describe('Auto attack', () => {
    test('Attack enemy board', () => {
        enemy.autoAttack(playerBoard);
        const actual = playerBoard.getBoard().flat().every((cell) => cell === null);
        expect(actual).toBe(false);
    });
});

describe('Reset Fleet', () => {
    test('Player fleets with no reset are equal', () => {
        const fleet1 = player.getFleet();
        const fleet2 = player.getFleet();

        const actual = fleet1 === fleet2;
        expect(actual).toBe(true);
    });

    test('Player fleets after reset are NOT equal', () => {
        const fleet1 = player.getFleet();
        player.resetFleet();
        const fleet2 = player.getFleet();

        const actual = fleet1 === fleet2;
        expect(actual).toBe(false);
    });
});