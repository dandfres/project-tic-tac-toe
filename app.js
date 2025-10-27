function createTable(edge) {
    let size = edge;
    const table = [];

    const fillTable = () => {
        table.length = 0;
        for (let i = 0; i < size; i++) {
            const row = []
            for (let j = 0; j < size; j++) {
                row.push('[ ]');
            }
            table.push(row)
        }
    }
    fillTable();

    return {
        getTable: () => table,
        drawTable: () => {
            console.clear();
            let header = '  ';
            for (let j = 0; j < table.length; j++) {
                header += ` ${j} `;
            }
            console.log(header)
            for (let i = 0; i < table.length; i++) {
                let line = `${i} `;
                for (let j = 0; j < table.length; j++) {
                    line += table[i][j]
                }
                console.log(line)
            }
        },
        resetTable: function(newSize = size) {
            size = newSize;
            fillTable();
            this.drawTable()
        }
    };
}

function createGame(player1, player2, edge) {
    const grid = createTable(edge);
    let currentPlayer = 'x';
    let isPlaying;
    return {
        playTurn: (x, y) => {
            if (grid.getTable()[x][y] === '[x]' || grid.getTable()[x][y] === '[o]') {
                alert('Esa celda esta ocupada!')
                return false
            };
            grid.getTable()[x][y] = `[${currentPlayer}]`;
            grid.drawTable()
            return true;
        },
        resetTable: (size) => {
            grid.resetTable(size)
        },
        start: function() {
            grid.drawTable()
            isPlaying = true;
            while (isPlaying) {
                let coords = (prompt(`Turno de '${currentPlayer}'\nIngrese las coordenadas:`));
                if (!coords) {
                    alert(`Entrada cancelada. Termina el juego.`);
                    return;
                }
                const [x, y] = coords.split(',').map(Number);
                if (
                    isNaN(x) || isNaN(y) ||
                    x < 0 || x >= edge ||
                    y < 0 || y >= edge
                    ) {
                    alert(`Coordenadas invalidas. Intente de nuevo.`)
                    continue
                };
                const validMove = this.playTurn(x, y);
                if (!validMove) continue;

                if (this.checkWin()) {
                    alert(`Gano ${currentPlayer}!`);
                    return;
                } else if(this.isBoardFull()){
                    alert(`Esto es un empate!`)
                    return;
                } else {currentPlayer = currentPlayer === 'x' ? 'o' : 'x'}
            }
        },
        checkWin: function() {
            const table = grid.getTable();
            const size = table.length;
            let state = 'in game';
            // validate rows
            for (let i = 0; i < size; i++) {
                if (table[i].every(cell => cell === `[${currentPlayer}]`)) state = `gana ${currentPlayer}`;
            }
            // validate columns
            for (let j = 0; j < size; j++) {
                let columnWin = true;
                for (let i = 0; i < size; i++) {
                    // index reversed
                    if (table[i][j] !== `[${currentPlayer}]`) {
                        columnWin = false;
                        break;
                    }
                }
                if (columnWin) state = `gana ${currentPlayer}`;
            }
            
            // validate main diagonal
            if (table.every((row, i) => row[i] === `[${currentPlayer}]`)) return true;
            // validate secondary diagonal
            if (table.every((row, i) => row[size - 1 - i] === `[${currentPlayer}]`)) return true;
        },
        isBoardFull: function() {
            const table = grid.getTable();
            return table.every(row => 
                row.every(cell => cell !== `[ ]`)
            )
        }
    }
}

const game1 = createGame('sebastian', 'hilary', 3);
