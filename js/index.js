import { createPlayer  } from "./gameLogic.js";
import { Gameboard  } from "./gameLogic.js";
import { GameController } from "./gameLogic.js";
import { DisplayController } from "./gameUI.js";

// Crear jugadores
const player1 = createPlayer('Player X', 'X');
const player2 = createPlayer('Player O', 'O');
GameController.setPlayers(player1, player2);

// Inicializar juego
const startGame = () => {
    GameController.resetGame();
    DisplayController.clearBoard();
    DisplayController.renderBoard(Gameboard.getBoard());
    DisplayController.renderGameStatus('next', GameController.getCurrentPlayer().getName());
    DisplayController.hidePlayButton();
    DisplayController.enableBoard();
};

// Manejar click en celda
const handleCellClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const result = GameController.playRound(index);

    if (GameController.isGameOver(result)) {
        DisplayController.disableBoard();
        DisplayController.showPlayButton();
    }
    DisplayController.renderGameStatus(result, GameController.getCurrentPlayer().getName())
    DisplayController.renderBoard(Gameboard.getBoard());
};

// Conectar listeners
DisplayController.getPlayButton().addEventListener('click', startGame);
DisplayController.getCellElements().forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Mostrar mensaje inicial
DisplayController.renderGameStatus('main')
