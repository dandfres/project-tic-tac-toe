function createPlayer(name, marker) {
    return {
        getName: () => name,
        getMarker: () => marker
    }
}

const Gameboard = (function() {
    const board = [
        ["[ ]", "[ ]", "[ ]"],
        ["[ ]", "[ ]", "[ ]"],
        ["[ ]", "[ ]", "[ ]"]
    ];
    return {
        getBoard: () => board,
        placeMarker: function(x, y, marker) {
            if (
                x < 0 || x >= board.length ||
                y < 0 || y >= board.length ||
                Number.isNaN(x) || Number.isNaN(y) ||
                board[x][y] !== `[ ]`) {
                return false;
            } else {
                board[x][y] = `[${marker}]`;
                return true;
            }
        },
        isFull: () => board.every(row => row.every(cell => cell !== `[ ]`)),
        reset: () => board.forEach((row, r) => {
            row.forEach((_, c) => board[r][c] = `[ ]`)
        }),
    }
})();

const DisplayController = (function() {
    return {
        renderBoard: (board) => console.log(board.map(row => row.join(' ')).join('\n')),
        showMessage: (msg) => console.log(msg),
        showTurn: (player) => console.log(`Turno de: ${player}.`),
        handleResult: function(result, player) {
            switch (result) {
                case 'invalid':
                    console.log('Movimiento invalido, intenta otra vez.');
                    break;
                case 'win':
                    console.log(`${player} gana esta partida!`)
                    break
                case 'draw':
                    console.log('Empate')
                    break;
                case 'next': 
                    console.log(`Turno de ${player}`)
                    break;
            }
        }
    }
})();


const player1 = createPlayer('Sebastian', 'X');
const player2 = createPlayer('Hilary', 'O');

const GameController = (function(p1, p2) {
    let currentPlayer = p1;
    return {
        getCurrentPlayer: () => currentPlayer,
        switchTurn: () => currentPlayer = currentPlayer === p1 ? p2 : p1,
        playRound: function(x, y) {
            if(!Gameboard.placeMarker(x, y, currentPlayer.getMarker())) return 'invalid'
            if (this.checkWinner()) return 'win';
            if (Gameboard.isFull()) return 'draw';

            this.switchTurn();
            return 'next'
        },
        checkWinner: () => {
            const board = Gameboard.getBoard();
            const winningCombos = [
                // Rows
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                // Colums
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                // Diagonals
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ];

            return winningCombos.some(combo => 
                combo.every(([x, y]) => board[x][y] === `[${currentPlayer.getMarker()}]`)
            );
        }, 
        resetGame: () => {
            Gameboard.reset();
            currentPlayer = p1;
        },
        getCoordinates: () => {
            const input = prompt(`${currentPlayer.getName()} ingrese sus coordenadas (formato: x, y):`);
            return input.split(',').map(Number)
        },
        initializeGame: function() {
            this.resetGame();
            DisplayController.renderBoard(Gameboard.getBoard());
        },
        processTurn: function() {
            const coords = this.getCoordinates();
            if (coords.length !== 2) return 
            const [x, y] = coords;
            return this.playRound(x, y)
        },
        updateDisplay: function(result) {
            console.clear();
            DisplayController.renderBoard(Gameboard.getBoard());
            DisplayController.handleResult(result, this.getCurrentPlayer().getName())
        },
        isGameOver: (result) => ['win', 'draw'].includes(result),
        startGame: function() {
            this.initializeGame()
            while (true) {
                const result = this.processTurn();
                this.updateDisplay(result)
                if (this.isGameOver(result)) break;
            }
        }
    }
})(player1, player2);