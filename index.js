const STATE_ENUMS = {
    EMPTY: 0,
    P1: 1,
    P2: 2
};

const PLAYER_NAMES = {
    [STATE_ENUMS.P1]: "Red",
    [STATE_ENUMS.P2]: "Blue"
};

class Game {
    constructor(size) {
        this.size = size;
        this.gameIsOver = false;
        this.currentPlayer = STATE_ENUMS.P1;
        this.totalMovesTaken = 0;
        this.boardState = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row[j] = STATE_ENUMS.EMPTY;
            }
            this.boardState[i] = row;
        }
        this.setHeader(`${PLAYER_NAMES[this.currentPlayer]}'s turn`);
        const restartButton = document.querySelector(".restartButton");
        restartButton.classList.remove("visible");
    }

    updateCell(row, col) {
        if (
            !this.gameIsOver &&
            this.boardState[row][col] === STATE_ENUMS.EMPTY
        ) {
            this.boardState[row][col] = this.currentPlayer;
            const cellElement = document.querySelector(
                `#row${row}-column${col}`
            );
            const currentPlayerClass =
                this.currentPlayer === STATE_ENUMS.P1 ? "P1" : "P2";
            cellElement.classList.add(currentPlayerClass);
            this.totalMovesTaken++;
            if (this.detectCurrentPlayerVictory()) {
                this.endGame();
                this.setHeader(`${PLAYER_NAMES[this.currentPlayer]} wins!!`);
            } else if (this.totalMovesTaken === this.size * this.size) {
                this.endGame();
                this.setHeader(`It's a tie!!`);
            } else {
                this.switchPlayer();
            }
        }
    }

    endGame() {
        this.gameIsOver = true;
        const restartButton = document.querySelector(".restartButton");
        restartButton.classList.add("visible");
    }

    switchPlayer() {
        this.currentPlayer =
            this.currentPlayer === STATE_ENUMS.P1
                ? STATE_ENUMS.P2
                : STATE_ENUMS.P1;
        this.setHeader(`${PLAYER_NAMES[this.currentPlayer]}'s turn`);
    }

    setHeader(text) {
        const header = document.querySelector(".header");
        header.innerHTML = text;
    }

    detectCurrentPlayerVictory() {
        return (
            this.detectDiagonalVictory() ||
            this.detectHorizontalVictory() ||
            this.detectVerticalVictory()
        );
    }

    detectHorizontalVictory() {
        for (let i = 0; i < this.size; i++) {
            let allPlayer = true;
            for (let j = 0; j < this.size; j++) {
                if (this.boardState[i][j] !== this.currentPlayer) {
                    allPlayer = false;
                    break;
                }
            }
            if (allPlayer) {
                return true;
            }
        }
        return false;
    }

    detectVerticalVictory() {
        for (let i = 0; i < this.size; i++) {
            let allPlayer = true;
            for (let j = 0; j < this.size; j++) {
                if (this.boardState[j][i] !== this.currentPlayer) {
                    allPlayer = false;
                    break;
                }
            }
            if (allPlayer) {
                return true;
            }
        }
        return false;
    }

    detectDiagonalVictory() {
        let allPlayer = true;
        for (let i = 0; i < this.size; i++) {
            if (this.boardState[i][i] !== this.currentPlayer) {
                allPlayer = false;
                break;
            }
        }
        if (allPlayer) {
            return true;
        }
        allPlayer = true;
        for (let i = 0; i < this.size; i++) {
            if (this.boardState[i][this.size - i - 1] !== this.currentPlayer) {
                allPlayer = false;
                break;
            }
        }
        return allPlayer;
    }
}

function createBoard(game) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (let i = 0; i < game.size; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        board.appendChild(row);
        for (let j = 0; j < game.size; j++) {
            const cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("id", `row${i}-column${j}`);
            row.appendChild(cell);
            cell.addEventListener("click", () => {
                game.updateCell(i, j);
            });
        }
    }
}

function restartGame() {
    const SIZE = 3;
    const game = new Game(SIZE);
    createBoard(game);
}

window.onload = function() {
    restartGame();
    const restartButton = document.querySelector(".restartButton");
    restartButton.addEventListener("click", function() {
        restartGame();
    });
};
