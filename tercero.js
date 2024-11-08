const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const backButton = document.getElementById('back-button');
const gameArea = document.getElementById('game-area');
const input = document.getElementById('input');
const levelElement = document.getElementById('level');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const progressElement = document.getElementById('progress');
const finalScoreElement = document.getElementById('final-score');

let words = [];
let score = 0;
let level = 1;
let lives = 3;
let gameInterval;

const wordLists = [
    ['Python', 'java', 'JavaScript', 'html', 'css'],
    ['Algorithm', 'database', 'Network', 'api', 'Framework'],
    ['Encryption', 'compiler', 'Debugging', 'frontend', 'Backend'],
    ['Virtualization', 'cloud', 'Blockchain', 'machine', 'Learning'],
    ['Cybersecurity', 'quantum', 'Robotics', 'augmented', 'Reality']
];

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
    score = 0;
    level = 1;
    lives = 3;
    words = [];
    updateStats();
    input.value = '';
    input.focus();
    gameInterval = setInterval(gameLoop, 50);
}

function gameLoop() {
    moveWords();
    if (Math.random() < 0.02) addWord();
}

function addWord() {
    if (words.length < 5) {
        const word = document.createElement('div');
        word.className = 'word';
        word.textContent = wordLists[level - 1][Math.floor(Math.random() * wordLists[level - 1].length)];
        word.style.left = `${Math.random() * (gameArea.clientWidth - 100)}px`;
        word.style.top = '-30px';
        word.style.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
        gameArea.appendChild(word);
        words.push(word);
    }
}

function moveWords() {
    words.forEach((word, index) => {
        const top = parseFloat(word.style.top) || 0;
        if (top > gameArea.clientHeight) {
            gameArea.removeChild(word);
            words.splice(index, 1);
            lives--;
            updateStats();
            if (lives <= 0) endGame();
        } else {
            word.style.top = `${top + (1 + level * 0.5)}px`;
        }
    });
}

function updateStats() {
    levelElement.textContent = level;
    scoreElement.textContent = score;
    livesElement.innerHTML = '❤️'.repeat(lives);
    progressElement.style.width = `${(score % 500) / 5}%`;
}

function checkInput() {
    const typedWord = input.value;
    words.forEach((word, index) => {
        if (word.textContent === typedWord) {
            gameArea.removeChild(word);
            words.splice(index, 1);
            score += typedWord.length * 10;
            input.value = '';
            updateStats();
            if (score >= level * 500 && level < 5) {
                level++;
            }
        }
    });
}

function endGame() {
    clearInterval(gameInterval);
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
backButton.addEventListener('click', () => window.history.back());
input.addEventListener('input', checkInput);

// Prevent spacebar from scrolling the page
window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});