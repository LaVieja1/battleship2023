import { randCoords, SHIP_TYPES } from "./helpers.js";

const Gameboard = () => {
    // Crear el tablero 10x10, coordenadas[row][col];
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    let placedShips = [];
    const areAllShipsPlaces = () => placedShips.length === SHIP_TYPES.length;

    const adjustCoords = (y0, x0, i, direction) => {
        //Default - Horizontal
        let x = x0 + i;
        let y = y0;
        if (direction === 'vertical') {
            x = x0;
            y = y0 + i;
        }
        return [y, x];
    };

    //Coloca el barco en las coordenadas (y, x);
    const placeShip = (ship, y0, x0) => {
        const direction = ship.getDirection();
        //Verifica si esta fuera del tablero o choca con otro barco
        const valid = checkValid(ship.length, direction, y0, x0);
        if (valid) {
            for (let i = 0; i < ship.length; i++) {
                const [y, x] = adjustCoords(y0, x0, i, direction);
                //Coloca el barco en el index
                board[y][x] = { ship, index: i };
            }
            //Lo agrega a placedShips
            placedShips.push(ship);
            return valid;
        } else {
            return valid;
        }
    };

    const checkValid = (length, direction, y0, x0) => {
        const cells = [];
        for (let i = 0; i < length; i++) {
            const [y, x] = adjustCoords(y0, x0, i, direction);
            //Verifica si y/x esta fuera del tablero
            if (y < 10 && x < 10) {
                cells.push(board[y][x]);
            } else {
                return false;
            }
        }
        return cells.every((cell) => cell === null);
    };

    const autoPlace = (ship) => {
        const [y, x] = randCoords();
        const changeOrient = Math.random() > 0.5;
        if (changeOrient) ship.changeDirection();
        const placed = placeShip(ship, y, x);
        if (!placed) autoPlace(ship); //Si no se puede colocar, se usa la recursion buscar otro lugar en el tablero
    };

    const autoPlaceFleet = (fleet) => {
        for (const ship in fleet) {
            autoPlace(fleet[ship]);
        }
    };

    const receiveAttack = (y, x) => {
        //Determina si el ataque golpea un barco o no
        if (board[y][x] === null) {
            //Graba el disparo fallado
            board[y][x] = 'miss';
        } else if (board[y][x].ship) {
            //Llama a la funcion hit en el barco correcto
            board[y][x].ship.hit(board[y][x].index);
            //Graba el disparo acertado con 'hit'
            board[y][x] = 'hit';
        }
        return board[y][x];
    };

    const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk());

    const reset = () => {
        board = Array(10).fill(null).map(() => Array(10).fill(null));
        placedShips = [];
    };

    return {
        getBoard,
        placeShip,
        areAllShipsPlaces,
        autoPlaceFleet,
        receiveAttack,
        areAllShipsSunk,
        reset,
    };
};

export default Gameboard;