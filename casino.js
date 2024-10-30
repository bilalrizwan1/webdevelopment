const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const scoreValue = document.getElementById('score-value');

let carPosition = 175; // Initial car position
let score = 0;
let obstacleSpeed = 2;
let isGameOver = false;

// Move the car left or right
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && carPosition > 0) {
        carPosition -= 15;
    } else if (event.key === 'ArrowRight' && carPosition < 350) {
        carPosition += 15;
    }
    car.style.left = carPosition + 'px';
});

// Move the obstacle
function moveObstacle() {
    if (isGameOver) return;

    const obstaclePosition = parseInt(obstacle.style.top) || 0;

    if (obstaclePosition >= 600) {
        score++;
        scoreValue.textContent = score;
        obstacle.style.top = '-100px';
        obstacle.style.left = Math.floor(Math.random() * 350) + 'px'; // Random horizontal position
    } else {
        obstacle.style.top = obstaclePosition + obstacleSpeed + 'px';
    }

    checkCollision();
    requestAnimationFrame(moveObstacle);
}

// Check for collisions
function checkCollision() {
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        carRect.x < obstacleRect.x + obstacleRect.width &&
        carRect.x + carRect.width > obstacleRect.x &&
        carRect.y < obstacleRect.y + obstacleRect.height &&
        carRect.y + carRect.height > obstacleRect.y
    ) {
        alert('Game Over! Your score: ' + score);
        isGameOver = true;
    }
}

// Start the game
function startGame() {
    moveObstacle();
}

startGame();
