// Initial game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let xScore = 0;
let oScore = 0;

// Select DOM elements
const boardContainer = document.getElementById('board');
const turnText = document.getElementById('turnText');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const winningMessage = document.getElementById('winningMessage');
const winnerText = document.getElementById('winnerText');

// Initialize the game board dynamically
function initializeBoard() {
    boardContainer.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        boardContainer.appendChild(cell);
    });

    // Add click event listeners after rendering the board
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());  // Add class based on player
        e.target.textContent = currentPlayer;  // Display the player symbol (X or O)
        checkWinner();
        switchPlayer();
    }
}

// Switch players after each move
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnText.textContent = `Turn: ${currentPlayer}`;
}

// Check for winner
function checkWinner() {
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

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            winnerText.textContent = `Player ${board[a]} wins!`;
            winningMessage.classList.add('show');
            updateScore(board[a]);
            return;
        }
    }

    // Check for a draw
    if (!board.includes('') && gameActive) {
        gameActive = false;
        winnerText.textContent = 'It\'s a Draw!';
        winningMessage.classList.add('show');
    }
}

// Update score
function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
    } else if (winner === 'O') {
        oScore++;
        oScoreDisplay.textContent = oScore;
    }
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    initializeBoard();
    winningMessage.classList.remove('show');
    turnText.textContent = `Turn: ${currentPlayer}`;
}

// Initialize the board
initializeBoard();

// Particle.js settings for background
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 5,
            random: true,
            anim: { enable: true, speed: 10, size_min: 0.1, sync: false }
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' }
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});
