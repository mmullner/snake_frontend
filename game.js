const socket = io('https://snake1-kgp4.onrender.com');
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = { body: [], direction: { x: 1, y: 0 } };

// Initialisiere das Spiel
socket.on("init", (data) => {
    snake = data.snake;
    drawGame();
});

// Aktualisiere die Spielstände
socket.on("gameUpdate", (data) => {
    snake = data.snake;
    drawGame();
});

// Event-Listener für Tasteneingaben
document.addEventListener("keydown", (e) => {
    socket.emit("keyPress", e.key);
});

// Spiel-Update zeichnen
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Schlange zeichnen
    snake.body.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "blue" : "green";
        ctx.fillRect(segment[1] * 20, segment[0] * 20, 20, 20);
    });
}
