import { SHIP_TYPES, randCoords, createFleet } from "./helpers.js";

const Player = (type = 'human') => {
    let fleet = createFleet(SHIP_TYPES);

    const getType = () => type;
    const getFleet = () => fleet;

    //Ataca al tablero del enemigo en las coordenadas [y][x]
    const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

    const autoAttack = (enemyBoard) => {
        const [y, x] = randCoords();
        const cell = enemyBoard.getBoard()[y][x];
        if (cell === 'miss' || cell === 'hit') {
            //Intenta otra vez con una celda que no haya sido atacada aun
            autoAttack(enemyBoard);
        } else {
            //Ataca a una celda valida
            enemyBoard.receiveAttack(y, x);
        }
    };

    const resetFleet = () => (fleet = createFleet(SHIP_TYPES));

    return { getType, getFleet, attack, autoAttack, resetFleet };
};

export default Player;