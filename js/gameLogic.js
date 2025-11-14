// FABRICA DE PLAYERS
function createPlayer(name, marker) {
    // Obtiene el nombre
    const getName = () => name;

    // Obtiene el simbolo
    const getMarker = () => marker;

    return {
        getName,
        getMarker
    }
}

// MODULO IIFE DEL TABLERO
const Gameboard = (function () {
    // Tablero array
    const board = Array(9).fill(null);

    // DEFINICION DE METODOS
    // Obtiene el tablero (array)
    const getBoard = () => board;

    // Posiciona el simbolo en el tablero (array)
    const placeMarker = (index, marker) => {
        if (index < 0 || index >= board.length || board[index] !== null) return false;
        board[index] = marker;
        return true
    };

    // Comprueba si el tablero esta lleno
    const isFull = () => board.every(cell => cell !== null);

    // Reinia el tablero
    const reset = () => board.forEach((_, index) => board[index] = null);

    return {
        getBoard,
        placeMarker,
        isFull,
        reset
    }
})();

// MODULO CONTROLADOR DEL JUEGO
const GameController = (function () {
    let p1, p2, currentPlayer;

    // DEFINICION DE METODOS
    // Establece los jugadores
    const setPlayers = (playerA, playerB) => {
        p1 = playerA;
        p2 = playerB;
        currentPlayer = p1;
    };

    // Obtiene el jugador actual
    const getCurrentPlayer = () => currentPlayer;

    // Cambia de jugador
    const switchTurn = () => currentPlayer = currentPlayer === p1 ? p2 : p1;

    // Juega el turno
    const playRound = (index) => {
        if (!Gameboard.placeMarker(index, currentPlayer.getMarker())) return 'invalid'
        if (checkWinner()) return 'win';
        if (Gameboard.isFull()) return 'draw';
        switchTurn();

        return 'next'
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winningCombos = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombos.some(combo =>
            combo.every((index) => board[index] === currentPlayer.getMarker())
        );
    };
    
    const isGameOver = (result) => ['win', 'draw'].includes(result);
    
    // const processTurn = () => {
    //     const coords = getCoordinates();
    //     if (coords.length !== 2) return
    //     const [x, y] = coords;
    //     return this.playRound(x, y)
    // };

    // const updateDisplay = (result) => {
    //     console.clear();
    //     DisplayController.renderBoard(Gameboard.getBoard());
    //     DisplayController.handleResult(result, getCurrentPlayer().getName())
    // };

    const resetGame = () => {
        Gameboard.reset();
        currentPlayer = p1;
    };    

    return {
        setPlayers,
        getCurrentPlayer,
        switchTurn,
        playRound,
        checkWinner,
        isGameOver,
        resetGame
    }
})();

export { createPlayer, Gameboard, GameController };