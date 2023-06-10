import { randCoords, SHIP_TYPES } from "./helpers.js";

const Gameboard = () => {
    // Crear el tablero 10x10, coordenadas[row][col];
    let board = Array(10).fill(null).map(() => Array(10).fill(null));
    const getBoard = () => board;

    return {
        getBoard,
    };
}

export default Gameboard;