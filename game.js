const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const gameOverOverlay = document.getElementById('gameOver');
const overlayTitle = document.getElementById('overlayTitle');
const overlayMessage = document.getElementById('overlayMessage');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

let canvasWidth = 800;
let canvasHeight = 600;

function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;

    canvasWidth = Math.min(800, containerWidth);
    canvasHeight = Math.floor(canvasWidth * 0.75);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const paddleWidth = 100;
const paddleHeight = 15;
let paddleX = (canvasWidth - paddleWidth) / 2;

const ballRadius = 8;
let ballX = canvasWidth / 2;
let ballY = canvasHeight - 40;
let ballDX = 4;
let ballDY = -4;

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 85;
const brickHeight = 25;
const brickPadding = 10;
const brickOffsetTop = 60;
const brickOffsetLeft = 35;

let score = 0;
let lives = 3;
let gameRunning = true;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

const brickColors = [
    '#E74C3C',
    '#E67E22',
    '#F39C12',
    '#2ECC71',
    '#3498DB'
];

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
canvas.addEventListener('mousemove', mouseMoveHandler);
canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const rect = canvas.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    if (relativeX > 0 && relativeX < canvasWidth) {
        paddleX = relativeX - paddleWidth / 2;
        paddleX = Math.max(0, Math.min(canvasWidth - paddleWidth, paddleX));
    }
}

function touchStartHandler(e) {
    e.preventDefault();
}

function touchMoveHandler(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const relativeX = touch.clientX - rect.left;
    if (relativeX > 0 && relativeX < canvasWidth) {
        paddleX = relativeX - paddleWidth / 2;
        paddleX = Math.max(0, Math.min(canvasWidth - paddleWidth, paddleX));
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#2C3E50';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvasHeight - paddleHeight - 10, paddleWidth, paddleHeight, 8);
    ctx.fillStyle = '#2C3E50';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 6);
                ctx.fillStyle = brickColors[r];
                ctx.fill();
                ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 2;
                ctx.closePath();
                ctx.shadowColor = 'transparent';
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    ballX > b.x &&
                    ballX < b.x + brickWidth &&
                    ballY > b.y &&
                    ballY < b.y + brickHeight
                ) {
                    ballDY = -ballDY;
                    b.status = 0;
                    score += 10;
                    scoreElement.textContent = score;

                    if (score === brickRowCount * brickColumnCount * 10) {
                        showGameOver(true);
                    }
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (ballX + ballDX > canvasWidth - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }

    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvasHeight - ballRadius - 10) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            const hitPos = (ballX - paddleX) / paddleWidth;
            const angle = (hitPos - 0.5) * Math.PI * 0.6;
            const speed = Math.sqrt(ballDX * ballDX + ballDY * ballDY);
            ballDX = speed * Math.sin(angle);
            ballDY = -Math.abs(speed * Math.cos(angle));
        } else {
            lives--;
            livesElement.textContent = lives;

            if (lives === 0) {
                showGameOver(false);
            } else {
                ballX = canvasWidth / 2;
                ballY = canvasHeight - 40;
                ballDX = 4;
                ballDY = -4;
                paddleX = (canvasWidth - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvasWidth - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ballX += ballDX;
    ballY += ballDY;

    if (gameRunning) {
        requestAnimationFrame(draw);
    }
}

function showGameOver(won) {
    gameRunning = false;

    if (won) {
        overlayTitle.textContent = '¡Victoria!';
        overlayMessage.innerHTML = `¡Felicidades! Has completado todos los niveles.<br>Puntuación Final: <span id="finalScore">${score}</span>`;
        finalScoreElement.textContent = score;
    } else {
        overlayTitle.textContent = 'Game Over';
        overlayMessage.innerHTML = `Puntuación Final: <span id="finalScore">${score}</span>`;
        finalScoreElement.textContent = score;
    }

    gameOverOverlay.classList.add('active');
}

function resetGame() {
    gameOverOverlay.classList.remove('active');

    score = 0;
    lives = 3;
    scoreElement.textContent = score;
    livesElement.textContent = lives;

    ballX = canvasWidth / 2;
    ballY = canvasHeight - 40;
    ballDX = 4;
    ballDY = -4;
    paddleX = (canvasWidth - paddleWidth) / 2;

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].status = 1;
        }
    }

    gameRunning = true;
    draw();
}

restartBtn.addEventListener('click', resetGame);

draw();
