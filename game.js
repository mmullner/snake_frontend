// Setup the game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

// Connect to the backend via Socket.IO
const socket = io('https://snake1-kgp4.onrender.com:3000');  // Ersetze dies mit deiner Server-URL, wenn es auf Render.com läuft

// Snake Game Variables
let players = {};
let food = {};

// Listen for game state updates from the backend
socket.on('init', (data) => {
  players[socket.id] = data.snake;
  food = data.food;
});

socket.on('newPlayer', (data) => {
  players[data.id] = data.snake;
});

socket.on('gameUpdate', (gameState) => {
  players = gameState.players;
  food = gameState.food;
  drawGame();
});

socket.on('gameOver', (data) => {
  alert(`${data.winner} wins!`);
  console.log('Scores:', data.scores);
});

// Listen for key events to control the snake
document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowUp") socket.emit('keyPress', 'ArrowUp');
  if (event.key === "ArrowDown") socket.emit('keyPress', 'ArrowDown');
  if (event.key === "ArrowLeft") socket.emit('keyPress', 'ArrowLeft');
  if (event.key === "ArrowRight") socket.emit('keyPress', 'ArrowRight');
});

// Function to draw the game state
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw players' snakes
  for (const playerId in players) {
    const snake = players[playerId];
    snake.body.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? 'green' : 'lime';  // Head is green, body is lime
      ctx.fillRect(segment[0] * 20, segment[1] * 20, 20, 20);
    });
  }
}
