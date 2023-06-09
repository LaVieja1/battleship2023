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

    
});