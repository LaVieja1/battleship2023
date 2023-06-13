/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game.js */ \"./src/modules/game.js\");\n/* harmony import */ var _views_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/base.js */ \"./src/views/base.js\");\n\n\n\n// Event Listeners\n\n// 1. Event Listener para el tipo de juego / singleplayer\nlet gameType = 'singleplayer';\nlet game = (0,_modules_game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(gameType);\n\n// 1.1 Render empty grids\ngame.renderGrids();\n// 1.2 Render Fleet + EventListeners para drag n drop\ngame.renderFleet();\n\n// 2. EventListener para autoPlace button o drag n drop\n_views_base_js__WEBPACK_IMPORTED_MODULE_1__.elements. autoPlaceBtn.addEventListener('click', (e) => {\n    game.autoPlace();\n    console.log('AutoPlaced Player Feet');\n});\n\n// 3. EventListener para startGame\n_views_base_js__WEBPACK_IMPORTED_MODULE_1__.elements.startBtn.addEventListener('click', (e) => {\n    game.startGame();\n    console.log('GAME START');\n});\n\n// 4. EvenetListener para playAgain\n_views_base_js__WEBPACK_IMPORTED_MODULE_1__.elements.playAgainBtn.addEventListener('click', (e) => {\n    game.playAgain();\n    console.log('PLAY AGAIN');\n});\n\nconsole.log('ayiyi');\n\n//# sourceURL=webpack://battleship2023/./src/index.js?");

/***/ }),

/***/ "./src/modules/drag.js":
/*!*****************************!*\
  !*** ./src/modules/drag.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _views_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/base.js */ \"./src/views/base.js\");\n/* harmony import */ var _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/gameboardView.js */ \"./src/views/gameboardView.js\");\n\n\n\nconst Drag = (p1, p1Board) => {\n    let draggedShip;\n    let draggedShipIndex;\n\n    // DRAG N DROP (p1 only)\n    const getDraggedShipIndex = (e) => \n        (draggedShipIndex = Number(e.target.dataset.index));\n\n    const dragStart = (e) => {\n        draggedShip = e.target;\n    };\n\n    const dragDrop = (e) => {\n        const cell = e.target;\n        const p1Ship = p1.getFleet()[draggedShip.dataset.ship];\n        const isHorizontal = p1Ship.getDirection() === 'horizontal';\n\n        // GET / Adjust coordenadas segun isHorizontal con draggedShipIndex\n        const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);\n        const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);\n\n        // Colocar el barco y recibir el resultado\n        const outcome = p1Board.placeShip(p1Ship, y, x);\n        if (outcome) {\n            // Actulizar grilla\n            _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].renderGrid(_views_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p1Grid, p1Board, p1.getType());\n            addDragAndDropEventListeners();\n            // Eliminar grilla\n            draggedShip.parentElement.removeChild(draggedShip);\n            // Mostrar START Button / Ocultar fleet-info si todos los barcos son colodados\n            if (p1Board.areAllShipsPlaced()) {\n                _views_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.startBtn.classList.add('show');\n                _views_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.add('hide');\n                _views_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.remove('show');\n            }\n        }\n    };\n\n    const dragOver = (e) => e.preventDefault();\n    const dragEnter = (e) => e.preventDefault();\n    const dragLeave = () => {};\n    const dragEnd = () => {};\n\n    const addDragAndDropEventListeners = () => {\n        const ships = document.querySelectorAll('.ship');\n        const cells = _views_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p1Grid.childNodes;\n\n        // Añadir eventListeners para drag/drop events\n        for (const ship of ships) {\n            // EventListener para saber que index esta siendo draggeado\n            ship.addEventListener('mousedown', getDraggedShipIndex);\n            ship.addEventListener('dragstart', dragStart);\n            ship.addEventListener('dragend', dragEnd);\n        }\n        for (const cell of cells) {\n            cell.addEventListener('dragover', dragOver);\n            cell.addEventListener('dragenter', dragEnter);\n            cell.addEventListener('dragleave', dragLeave);\n            cell.addEventListener('drop', dragDrop);\n        }\n    };\n\n    return { addDragAndDropEventListeners };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drag);\n\n//# sourceURL=webpack://battleship2023/./src/modules/drag.js?");

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/modules/gameboard.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/modules/player.js\");\n/* harmony import */ var _drag_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag.js */ \"./src/modules/drag.js\");\n/* harmony import */ var _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/gameboardView.js */ \"./src/views/gameboardView.js\");\n/* harmony import */ var _views_base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/base.js */ \"./src/views/base.js\");\n\n\n\n\n\n\n// INICIO\n\nconst Game = (type) => {\n    //Crear jugadores\n\n    const p1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('human');\n    let p2;\n    \n    if (type === 'singleplayer') {\n        p2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('computer');\n    } else {\n        p2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('human');\n    }\n\n    //Crear tableros\n\n    const p1Board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    const p2Board = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    // Crear drag para drag and drop\n    const drag = (0,_drag_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(p1, p1Board);\n\n    //Resetear el juego\n\n    const resetGame = () => {\n        p1.resetFleet();\n        p2.resetFleet();\n        p1Board.reset();\n        p2Board.reset();\n    };\n\n    const addRotateEventListeners = () => {\n        const ships = document.querySelectorAll('.ship');\n        ships.forEach((ship) => {\n            ship.addEventListener('dblclick', (e) => {\n                const shipElement = e.target.parentElement;\n                const ship = p1.getFleet()[shipElement.dataset.ship];\n                ship.changeDirection();\n                shipElement.classList.toggle('vertical');\n            });\n        });\n    };\n\n    const renderFleet = () => {\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderFleet(p1.getFleet());\n        drag.addDragAndDropEventListeners();\n        addRotateEventListeners();\n    };\n\n    // EventListener para p1 'human' player\n\n    const addGridEventListeners = () => {\n        if (p2.getType === 'human')\n            _views_base_js__WEBPACK_IMPORTED_MODULE_4__.elements.p1Grid.addEventListener('click', ctrlAttack);\n        _views_base_js__WEBPACK_IMPORTED_MODULE_4__.elements.p2Grid.addEventListener('click', ctrlAttack);\n    };\n\n    // ctrlAttack function para eventListeners\n\n    const ctrlAttack = (e) => {\n        const cell = e.target;\n        if (cell.classList.contains('grid-cell')) {\n            // 1. Consigue las coordenadas de la celda\n            const y = cell.dataset.y;\n            const x = cell.dataset.x;\n\n            // 2. Verifica que la celda no haya sido atacada\n            const boardCell = p2Board.getBoard()[y][x];\n            if (boardCell !== 'miss' && boardCell !== 'hit') {\n                // 3. Hace el ataque para p1 'human' y p2 'computer'\n                p1.attack(y, x, p2Board);\n                p2.autoAttack(p1Board);\n\n                // 4. Actualiza el tablero para que el ataque se muestre\n                renderGrids();\n            }\n            // 5. Verifica si todos los barcos fueron hundidos\n            if (p1Board.areAllShipsSunk() || p2Board.areAllShipsSunk()) {\n                let winner = '';\n                if (p1Board.areAllShipsSunk()) {\n                    winner = 'Gana la computadora!';\n                } else if (p2Board.areAllShipsSunk()) {\n                    winner = 'Ganaste!';\n                }\n                // 6. Desahibilita los eventListeners para atacar\n                _views_base_js__WEBPACK_IMPORTED_MODULE_4__.elements.p2Grid.removeEventListener('click', ctrlAttack);\n                // 7. Muestra al ganador / boton de Jugar otra vez\n                _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderWinner(winner);\n            }\n        }\n    };\n\n    // Render Grids / Update Grids\n\n    const renderGrids = () => {\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGrid(_views_base_js__WEBPACK_IMPORTED_MODULE_4__.elements.p1Grid, p1Board, p1.getType());\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].renderGrid(_views_base_js__WEBPACK_IMPORTED_MODULE_4__.elements.p2Grid, p2Board, p2.getType());\n    };\n\n    const autoPlace = () => {\n        p1Board.reset();\n        p1Board.autoPlaceFleet(p1.getFleet());\n        renderGrids();\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].autoplace();\n    };\n\n    const startGame = () => {\n        addGridEventListeners();\n        if (p2.getType() === 'computer') p2Board.autoPlaceFleet(p2.getFleet());\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].startGame();\n    };\n\n    const playAgain = () => {\n        resetGame();\n        renderGrids();\n        _views_gameboardView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].playAgain();\n        renderFleet();\n    };\n\n    return {\n        renderGrids,\n        renderFleet,\n        autoPlace,\n        startGame,\n        playAgain,\n    };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://battleship2023/./src/modules/game.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ \"./src/modules/helpers.js\");\n\n\nconst Gameboard = () => {\n    // Crear el tablero 10x10, coordenadas[row][col];\n    let board = Array(10).fill(null).map(() => Array(10).fill(null));\n    const getBoard = () => board;\n\n    let placedShips = [];\n    const areAllShipsPlaces = () => placedShips.length === _helpers_js__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES.length;\n\n    const adjustCoords = (y0, x0, i, direction) => {\n        //Default - Horizontal\n        let x = x0 + i;\n        let y = y0;\n        if (direction === 'vertical') {\n            x = x0;\n            y = y0 + i;\n        }\n        return [y, x];\n    };\n\n    //Coloca el barco en las coordenadas (y, x);\n    const placeShip = (ship, y0, x0) => {\n        const direction = ship.getDirection();\n        //Verifica si esta fuera del tablero o choca con otro barco\n        const valid = checkValid(ship.length, direction, y0, x0);\n        if (valid) {\n            for (let i = 0; i < ship.length; i++) {\n                const [y, x] = adjustCoords(y0, x0, i, direction);\n                //Coloca el barco en el index\n                board[y][x] = { ship, index: i };\n            }\n            //Lo agrega a placedShips\n            placedShips.push(ship);\n            return valid;\n        } else {\n            return valid;\n        }\n    };\n\n    const checkValid = (length, direction, y0, x0) => {\n        const cells = [];\n        for (let i = 0; i < length; i++) {\n            const [y, x] = adjustCoords(y0, x0, i, direction);\n            //Verifica si y/x esta fuera del tablero\n            if (y < 10 && x < 10) {\n                cells.push(board[y][x]);\n            } else {\n                return false;\n            }\n        }\n        return cells.every((cell) => cell === null);\n    };\n\n    const autoPlace = (ship) => {\n        const [y, x] = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.randCoords)();\n        const changeOrient = Math.random() > 0.5;\n        if (changeOrient) ship.changeDirection();\n        const placed = placeShip(ship, y, x);\n        if (!placed) autoPlace(ship); //Si no se puede colocar, se usa la recursion buscar otro lugar en el tablero\n    };\n\n    const autoPlaceFleet = (fleet) => {\n        for (const ship in fleet) {\n            autoPlace(fleet[ship]);\n        }\n    };\n\n    const receiveAttack = (y, x) => {\n        //Determina si el ataque golpea un barco o no\n        if (board[y][x] === null) {\n            //Graba el disparo fallado\n            board[y][x] = 'miss';\n        } else if (board[y][x].ship) {\n            //Llama a la funcion hit en el barco correcto\n            board[y][x].ship.hit(board[y][x].index);\n            //Graba el disparo acertado con 'hit'\n            board[y][x] = 'hit';\n        }\n        return board[y][x];\n    };\n\n    const areAllShipsSunk = () => placedShips.every((ship) => ship.isSunk());\n\n    const reset = () => {\n        board = Array(10).fill(null).map(() => Array(10).fill(null));\n        placedShips = [];\n    };\n\n    return {\n        getBoard,\n        placeShip,\n        areAllShipsPlaces,\n        autoPlaceFleet,\n        receiveAttack,\n        areAllShipsSunk,\n        reset,\n    };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n//# sourceURL=webpack://battleship2023/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SHIP_LENGTHS: () => (/* binding */ SHIP_LENGTHS),\n/* harmony export */   SHIP_TYPES: () => (/* binding */ SHIP_TYPES),\n/* harmony export */   createFleet: () => (/* binding */ createFleet),\n/* harmony export */   randCoords: () => (/* binding */ randCoords)\n/* harmony export */ });\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ \"./src/modules/ship.js\");\n\n\nconst SHIP_TYPES = [\n    'carrier',\n    'battleship',\n    'cruiser',\n    'submarine',\n    'destroyer',\n];\n\nconst SHIP_LENGTHS = {\n    carrier: 5,\n    battleship: 4,\n    cruiser: 3,\n    submarine: 3,\n    destroyer: 2,\n};\n\nconst rand = (size = 10) => Math.floor(Math.random() * size);\n\nconst randCoords = (size = 10) => [rand(size), rand(size)];\n\nconst createFleet = (types) => {\n    //Crea un objeto de Ships\n    //fleet = {carrier: {id: 'carrier', length: 5, ...}, ...otherShip}\n    const fleet = {};\n    types.forEach((type) => (fleet[type] = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(type)));\n    return fleet;\n}\n\n//# sourceURL=webpack://battleship2023/./src/modules/helpers.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ \"./src/modules/helpers.js\");\n\n\nconst Player = (type = 'human') => {\n    let fleet = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_helpers_js__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES);\n\n    const getType = () => type;\n    const getFleet = () => fleet;\n\n    //Ataca al tablero del enemigo en las coordenadas [y][x]\n    const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);\n\n    const autoAttack = (enemyBoard) => {\n        const [y, x] = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.randCoords)();\n        const cell = enemyBoard.getBoard()[y][x];\n        if (cell === 'miss' || cell === 'hit') {\n            //Intenta otra vez con una celda que no haya sido atacada aun\n            autoAttack(enemyBoard);\n        } else {\n            //Ataca a una celda valida\n            enemyBoard.receiveAttack(y, x);\n        }\n    };\n\n    const resetFleet = () => (fleet = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createFleet)(_helpers_js__WEBPACK_IMPORTED_MODULE_0__.SHIP_TYPES));\n\n    return { getType, getFleet, attack, autoAttack, resetFleet };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship2023/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ \"./src/modules/helpers.js\");\n\n\nconst Ship = (type) => {\n    const id = type;\n    const length = _helpers_js__WEBPACK_IMPORTED_MODULE_0__.SHIP_LENGTHS[type];\n    let direction = 'horizontal';\n\n    const getDirection = () => direction;\n    const changeDirection = () => {\n        direction === 'horizontal'\n            ? (direction = 'vertical')\n            : (direction = 'horizontal');\n    };\n\n    const hits = Array(length).fill(null);\n    const hit = (i) => (hits[i] = 'hit');\n    const getHits = () => hits;\n\n    const isSunk = () => hits.every((h) => h === 'hit');\n\n    return { id, length, hit, getHits, isSunk, getDirection, changeDirection };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship2023/./src/modules/ship.js?");

/***/ }),

/***/ "./src/views/base.js":
/*!***************************!*\
  !*** ./src/views/base.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   elements: () => (/* binding */ elements)\n/* harmony export */ });\nconst elements = {\n    p1Gameboard: document.querySelector('.p1-gameboard'),\n    p2Gameboard: document.querySelector('.p2-gameboard'),\n    p1Grid: document.querySelector('.p1-grid'),\n    p2Grid: document.querySelector('.p2-grid'),\n    infoContainer: document.querySelector('.info-container'),\n    infoText: document.querySelector('.info-text'),\n    autoPlaceBtn: document.querySelector('.fleet-autoplace'),\n    playAgainBtn: document.querySelector('.play-again'),\n    startBtn: document.querySelector('.start'),\n    fleetContainer: document.querySelector('.fleet-container'),\n    fleetDraggable: document.querySelector('.fleet-draggable'),\n    fleetInfo: document.querySelector('.fleet-info')\n};\n\n//# sourceURL=webpack://battleship2023/./src/views/base.js?");

/***/ }),

/***/ "./src/views/gameboardView.js":
/*!************************************!*\
  !*** ./src/views/gameboardView.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/views/base.js\");\n\n\nconst gameboardView = (() => {\n    const renderCell = (y, x, status) =>\n        `<div class=\"grid-cell cell-${y}-${x} ${status}\" data-y='${y}' data-x='${x}'></div>`;\n    \n    const clearGrid = (parent) => {\n        parent.textContent = '';\n    };\n\n    const renderGrid = (parent, gameboard, type) => {\n        clearGrid(parent);\n        const board = gameboard.getBoard();\n        const length = board.length;\n        let grid = '';\n\n        for (let i = 0; i < length; i++) {\n            for (let j = 0; j < length; j++) {\n                let status = board[i][j];\n                if (status === null) {\n                    status = '';\n                } else if (status.ship) {\n                    if (type === 'human') {\n                        status = status.ship.id;\n                    } else {\n                        status = '';\n                    }\n                }\n                grid += renderCell(i, j, status);\n            }\n        }\n        parent.insertAdjacentHTML('afterbegin', grid);\n    };\n\n    const renderFleet = (fleet) => {\n        for (const ship in fleet) {\n            //Crea un ship container movible\n            const container = document.createElement('div');\n            container.classList.add('ship', `${fleet[ship].id}-container`);\n            container.setAttribute('draggable', true);\n            container.dataset.ship = `${fleet[ship].id}`;\n            //Crea inner ship divs\n            let divs = '';\n            for (let i = 0; i < fleet[ship].length; i++) {\n                divs += `<div class=${fleet[ship].id} data-index='${i}'></div>`;\n            }\n            container.insertAdjacentHTML('afterbegin', divs);\n            _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetDraggable.prepend(container);\n        }\n    };\n\n    const autoplace = () => {\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.startBtn.classList.add('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.add('hide');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.remove('show');\n        //Elimina todos los barcos de fleetDraggable\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetDraggable.textContent = '';\n    };\n\n    const startGame = () => {\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p1Gameboard.classList.toggle('grid-disabled');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('grid-disable');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('hide');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.startBtn.classList.remove('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.autoPlaceBtn.classList.remove('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.classList.toggle('slide-out');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.classList.toggle('slide-in');\n    };\n\n    const renderWinner = (winner) => {\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.infoContainer.classList.toggle('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.infoText.textContent = `${winner.toUpperCase()}`;\n    };\n\n    const playAgain = () => {\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.infoContainer.classList.toggle('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p1Gameboard.classList.toggle('grid-disabled');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('grid-disabled');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('hide');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.p2Gameboard.classList.toggle('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.toggle('hide');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetInfo.classList.toggle('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.autoPlaceBtn.classList.add('show');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.classList.toggle('slide-in');\n        _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.fleetContainer.classList.toggle('slide-out');\n    };\n\n    return {\n        renderGrid,\n        renderFleet,\n        autoplace,\n        startGame,\n        renderWinner,\n        playAgain,\n    };\n\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardView);\n\n//# sourceURL=webpack://battleship2023/./src/views/gameboardView.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;