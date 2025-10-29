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
        getBoard: () => board.forEach(row => console.log(row.join(''))),
        placeMarker: function(x, y, marker) {
            if (
                x < 0 || x >= board.length ||
                y < 0 || y >= board.length ||
                board[x][y] !== `[ ]`
                ) {
                return false;
            } else {
                board[x][y] = `[${marker}]`;
                return true;
            }
        },
        isFull: () => board.every(row => row.every(cell => cell !== `[ ]`)),
        isFull: () => board.flat().every(cell => cell !== `[ ]`),
        reset: () => board.forEach((row, r) => {
            row.forEach((_, c) => {
                board[r][c] = `[ ]`;
            })
        }),
    }
})();

const GameController = (function() {
    return {
        playRound: (x, y) => {},
        getCurrentPlayer: () => {},
        switchTurn: () => {},
        checkWinner: () => {},
        resetGame: () => {}
    }
})();