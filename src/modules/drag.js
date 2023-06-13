import { elements } from "../views/base.js";
import gameboardView from "../views/gameboardView.js";

const Drag = (p1, p1Board) => {
    let draggedShip;
    let draggedShipIndex;

    // DRAG N DROP (p1 only)
    const getDraggedShipIndex = (e) => 
        (draggedShipIndex = Number(e.target.dataset.index));

    const dragStart = (e) => {
        draggedShip = e.target;
    };

    const dragDrop = (e) => {
        const cell = e.target;
        const p1Ship = p1.getFleet()[draggedShip.dataset.ship];
        const isHorizontal = p1Ship.getDirection() === 'horizontal';

        // GET / Adjust coordenadas segun isHorizontal con draggedShipIndex
        const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
        const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

        // Colocar el barco y recibir el resultado
        const outcome = p1Board.placeShip(p1Ship, y, x);
        if (outcome) {
            // Actulizar grilla
            gameboardView.renderGrid(elements.p1Grid, p1Board, p1.getType());
            addDragAndDropEventListeners();
            // Eliminar grilla
            draggedShip.parentElement.removeChild(draggedShip);
            // Mostrar START Button / Ocultar fleet-info si todos los barcos son colodados
            if (p1Board.areAllShipsPlaced()) {
                elements.startBtn.classList.add('show');
                elements.fleetInfo.classList.add('hide');
                elements.fleetInfo.classList.remove('show');
            }
        }
    };

    const dragOver = (e) => e.preventDefault();
    const dragEnter = (e) => e.preventDefault();
    const dragLeave = () => {};
    const dragEnd = () => {};

    const addDragAndDropEventListeners = () => {
        const ships = document.querySelectorAll('.ship');
        const cells = elements.p1Grid.childNodes;

        // Añadir eventListeners para drag/drop events
        for (const ship of ships) {
            // EventListener para saber que index esta siendo draggeado
            ship.addEventListener('mousedown', getDraggedShipIndex);
            ship.addEventListener('dragstart', dragStart);
            ship.addEventListener('dragend', dragEnd);
        }
        for (const cell of cells) {
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('dragenter', dragEnter);
            cell.addEventListener('dragleave', dragLeave);
            cell.addEventListener('drop', dragDrop);
        }
    };

    return { addDragAndDropEventListeners };
};

export default Drag;