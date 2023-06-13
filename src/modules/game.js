import Gameboard from './gameboard.js';
import Player from './player.js';
import Drag from './drag.js';
import gameboardView from '../views/gameboardView.js';
import { elements } from '../views/base.js';

// INICIO

const Game = (type) => {
    //Crear jugadores

    const p1 = Player('human');
    let p2;
    
    if (type === 'singleplayer') {
        p2 = Player('computer');
    } else {
        p2 = Player('human');
    }

    //Crear tableros

    const p1Board = Gameboard();
    const p2Board = Gameboard();

    // Crear drag para drag and drop
    const drag = Drag(p1, p1Board);

    //Resetear el juego

    const resetGame = () => {
        p1.resetFleet();
        p2.resetFleet();
        p1Board.reset();
        p2Board.reset();
    };

    const addRotateEventListeners = () => {
        const ships = document.querySelectorAll('.ship');
        ships.forEach((ship) => {
            ship.addEventListener('dblclick', (e) => {
                const shipElement = e.target.parentElement;
                const ship = p1.getFleet()[shipElement.dataset.ship];
                ship.changeDirection();
                shipElement.classList.toggle('vertical');
            });
        });
    };

    const renderFleet = () => {
        gameboardView.renderFleet(p1.getFleet());
        drag.addDragAndDropEventListeners();
        addRotateEventListeners();
    };

    // EventListener para p1 'human' player

    const addGridEventListeners = () => {
        if (p2.getType === 'human')
            elements.p1Grid.addEventListener('click', ctrlAttack);
        elements.p2Grid.addEventListener('click', ctrlAttack);
    };

    // ctrlAttack function para eventListeners

    const ctrlAttack = (e) => {
        const cell = e.target;
        if (cell.classList.contains('grid-cell')) {
            // 1. Consigue las coordenadas de la celda
            const y = cell.dataset.y;
            const x = cell.dataset.x;

            // 2. Verifica que la celda no haya sido atacada
            const boardCell = p2Board.getBoard()[y][x];
            if (boardCell !== 'miss' && boardCell !== 'hit') {
                // 3. Hace el ataque para p1 'human' y p2 'computer'
                p1.attack(y, x, p2Board);
                p2.autoAttack(p1Board);

                // 4. Actualiza el tablero para que el ataque se muestre
                renderGrids();
            }
            // 5. Verifica si todos los barcos fueron hundidos
            if (p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()) {
                let winner = '';
                if (p1Board.areAllShipsSunk()) {
                    winner = 'Gana la computadora!';
                } else if (p2Board.areAllShipsSunk()) {
                    winner = 'Ganaste!';
                }
                // 6. Desahibilita los eventListeners para atacar
                elements.p2Grid.removeEventListener('click', ctrlAttack);
                // 7. Muestra al ganador / boton de Jugar otra vez
                gameboardView.renderWinner(winner);
            }
        }
    };

    // Render Grids / Update Grids

    const renderGrids = () => {
        gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
        gameboardView.renderGrid(elements.p2Grid, p2Board, p2.getType());
    };

    const autoPlace = () => {
        p1Board.reset();
        p1Board.autoPlaceFleet(p1.getFleet());
        renderGrids();
        gameboardView.autoplace();
    };

    const startGame = () => {
        addGridEventListeners();
        if (p2.getType() === 'computer') p2Board.autoPlaceFleet(p2.getFleet());
        gameboardView.startGame();
    };

    const playAgain = () => {
        resetGame();
        renderGrids();
        gameboardView.playAgain();
        renderFleet();
    };

    return {
        renderGrids,
        renderFleet,
        autoPlace,
        startGame,
        playAgain,
    };
};

export default Game;