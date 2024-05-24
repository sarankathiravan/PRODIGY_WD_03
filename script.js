document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const result = document.getElementById("result");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const currentPlayerDisplay = document.getElementById("current-player");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", restartGame);

    function handleCellClick(e) {
        const index = e.target.getAttribute("data-index");

        if (gameState[index] || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer);

        if (checkWinner()) {
            endGame(false);
        } else if (gameState.every(cell => cell)) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentPlayerDisplay.textContent = currentPlayer;
            currentPlayerDisplay.className = currentPlayer;
        }
    }

    function checkWinner() {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function endGame(draw) {
        if (draw) {
            message.textContent = "It's a draw!";
        } else {
            message.textContent = `${currentPlayer} wins!`;
            document.querySelector('.container').classList.add(currentPlayer === 'X' ? 'winner' : 'loser');
        }

        result.classList.remove("hidden");
    }

    function restartGame() {
        currentPlayer = "X";
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
        result.classList.add("hidden");
        document.querySelector('.container').classList.remove('winner', 'loser');
        currentPlayerDisplay.textContent = currentPlayer;
        currentPlayerDisplay.className = currentPlayer;
    }
});
