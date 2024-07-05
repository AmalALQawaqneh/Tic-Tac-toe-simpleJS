const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleClick = (e) => {
    const index = e.target.getAttribute('data-index');
    
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        message.textContent = 'Draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
};

const resetGame = () => {
    currentPlayer = 'X';
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    isGameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
