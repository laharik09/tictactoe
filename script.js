const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const winnerText = document.getElementById('winner-text');
const restartBtn = document.getElementById('restart-btn');

let isXTurn = true;

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

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerText.textContent = '';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    cell.textContent = currentClass;
    cell.classList.add(currentClass.toLowerCase());

    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin(currentClass) {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(draw, winner = '') {
    if (draw) {
        winnerText.textContent = "It's a Draw!";
    } else {
        winnerText.textContent = `${winner} Wins! 🎉`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartBtn.addEventListener('click', startGame);

startGame();