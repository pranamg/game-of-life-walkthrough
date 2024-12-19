const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 10;
const GITHUB_COLORS = {
    level0: '#9be9a8',
    level1: '#40c463',
    level2: '#30a14e',
    level3: '#216e39'
};
let width, height;
let grid;

function initializeGrid() {
    width = Math.floor(window.innerWidth / CELL_SIZE);
    height = Math.floor(window.innerHeight / CELL_SIZE);
    canvas.width = width * CELL_SIZE;
    canvas.height = height * CELL_SIZE;
    
    grid = Array(height).fill().map(() => 
        Array(width).fill().map(() => Math.random() < 0.3)
    );
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newY = (y + i + height) % height;
            const newX = (x + j + width) % width;
            if (grid[newY][newX]) count++;
        }
    }
    return count;
}

function getColor(neighbors) {
    if (neighbors <= 1) return GITHUB_COLORS.level0;
    if (neighbors <= 3) return GITHUB_COLORS.level1;
    if (neighbors <= 5) return GITHUB_COLORS.level2;
    return GITHUB_COLORS.level3;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (grid[y][x]) {
                const neighbors = countNeighbors(x, y);
                ctx.fillStyle = getColor(neighbors);
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
            }
        }
    }
}

function update() {
    const newGrid = grid.map((row, y) => 
        row.map((cell, x) => {
            const neighbors = countNeighbors(x, y);
            return neighbors === 3 || (cell && neighbors === 2);
        })
    );
    grid = newGrid;
}

function gameLoop() {
    update();
    draw();
}

window.addEventListener('resize', initializeGrid);
initializeGrid();
setInterval(gameLoop, 500);  // Update every 0.5 seconds
