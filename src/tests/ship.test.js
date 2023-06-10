import Ship from "../modules/ship.js";

describe('Ships', () => {

    describe('Propiedades', () => {
        const ship = Ship('battleship');

        test('ID', () => {
            expect(ship.id).toBe('battleship');
        });

        test('Length', () => {
            expect(ship.length).toBe(4);
        });

        test('Direccion', () => {
            expect(ship.getDirection()).toBe('horizontal');
        });

        test('Cambiar dirrecion', () => {
            ship.changeDirection();
            expect(ship.getDirection()).toBe('vertical');
        });
    
    });

    describe('Function Hit', () => {
        const ship = Ship('submarine');

        test('No hits', () => {
            expect(ship.getHits()).toEqual([null, null, null]);
        });

        test('one hit', () => {
            ship.hit(2);
            expect(ship.getHits()).toEqual([null, null, 'hit']);
        });
    });

    describe('Function isSunk', () => {
        const ship = Ship('destroyer');

        test('not punk', () => {
            expect(ship.isSunk()).toBe(false);
        });
        
        test('hit but not sunk', () => {
            ship.hit(0);
            expect(ship.isSunk()).toBe(false);
        });

        test('sunk', () => {
            ship.hit(1);
            expect(ship.isSunk()).toBe(true);
        });
    });
});