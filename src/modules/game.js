import Gameboard from './gameboard.js';
import Player from './player.js';
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

    //Resetear el juego

    const resetGame = () => {
        p1.resetFleet();
        p2.resetFleet();
        p1Board.reset();
        p2Board.reset();
    };

    

}