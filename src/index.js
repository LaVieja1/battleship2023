import Game from "./modules/game.js";
import { elements } from "./views/base.js";

// Event Listeners

// 1. Event Listener para el tipo de juego / singleplayer
let gameType = 'singleplayer';
let game = Game(gameType);

// 1.1 Render empty grids
game.renderGrids();
// 1.2 Render Fleet + EventListeners para drag n drop
game.renderFleet();

// 2. EventListener para autoPlace button o drag n drop
elements. autoPlaceBtn.addEventListener('click', (e) => {
    game.autoPlace();
    console.log('AutoPlaced Player Feet');
});

// 3. EventListener para startGame
elements.startBtn.addEventListener('click', (e) => {
    game.startGame();
    console.log('GAME START');
});

// 4. EvenetListener para playAgain
elements.playAgainBtn.addEventListener('click', (e) => {
    game.playAgain();
    console.log('PLAY AGAIN');
});

console.log('ayiyi');