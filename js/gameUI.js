import { Gameboard, GameController } from "./gameLogic.js";

const DisplayController = (function () {

    // 🔗Referencias al DOM
    const statusElement = document.querySelector('.status');
    const boardElement = document.querySelector('.board');
    const cellElements = document.querySelectorAll('.cell');
    const playButton = document.querySelector('#play-btn');

    // 🧠Genera el mensaje segun el estado
    const renderGameStatus = (result, playerName) => {
        const messages = {
            invalid: '⚠️Invalid move, please try again.',
            win: `🎉Congratulations !!, ${playerName} wins.`,
            draw: '🤝Draw.',
            next: `⏭️${playerName}'s turn.`,
            main: '▶️Press button to begin.'
        };
        statusElement.textContent = messages[result];
        statusElement.setAttribute('data-game-status', result);
    };

    // 🧼Limpia el tablero visual
    const clearBoard = () => {
        cellElements.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
    };

    // 🎨Pinta el tablero segun el array de estado
    const renderBoard = (boardArray) => {
        boardArray.forEach((value, index) => {
            cellElements[index].textContent = value;
        });
    };
    
    // Play button
    const hidePlayButton = () => {
        playButton.style.display = 'none'
    }
    
    const showPlayButton = () => {
        playButton.style.display = 'block'
    }

    // 🚫Desactiva el tablero
    const disableBoard = () => {
        boardElement.classList.add('inactive');
    };

    // ✅Activa el tablero
    const enableBoard = () => {
        boardElement.classList.remove('inactive');
        playButton
    };

    // 🔍Devuelve las celdas
    const getCellElements = () => Array.from(cellElements);

    // 🔘Devuelve el boton play
    const getPlayButton = () => playButton;

    return {
        renderGameStatus,
        clearBoard,
        renderBoard,
        hidePlayButton,
        showPlayButton,
        disableBoard,
        enableBoard,
        getCellElements,
        getPlayButton
    }
})();

export { DisplayController}