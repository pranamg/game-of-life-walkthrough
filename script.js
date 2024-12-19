/**
 * @typedef {Object} GameConfig
 * @property {number} CELL_SIZE - Size of each cell in pixels
 * @property {number} UPDATE_INTERVAL - Milliseconds between updates
 * @property {number} INITIAL_ALIVE_PROBABILITY - Chance of cell being alive
 * @property {Object} COLORS - Color scheme for different cell states
 */
const CONFIG = {
    CELL_SIZE: 10,
    UPDATE_INTERVAL: 500,
    INITIAL_ALIVE_PROBABILITY: 0.3,
    COLORS: {
        SPARSE: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-cell-sparse').trim(),
        MODERATE: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-cell-moderate').trim(),
        DENSE: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-cell-dense').trim(),
        CROWDED: getComputedStyle(document.documentElement)
            .getPropertyValue('--color-cell-crowded').trim()
    }
};

/**
 * @typedef {Object} GridState
 * @property {number} width - Grid width in cells
 * @property {number} height - Grid height in cells
 * @property {boolean[][]} cells - 2D array of cell states
 */
let gridState = {
    width: 0,
    height: 0,
    cells: []
};

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/**
 * Resizes the canvas to fit the window and updates grid dimensions
 * @throws {Error} If canvas context is not available
 */
function resizeCanvas() {
    if (!ctx) throw new Error('Canvas context not available');
    gridState.width = Math.floor(window.innerWidth / CONFIG.CELL_SIZE);
    gridState.height = Math.floor(window.innerHeight / CONFIG.CELL_SIZE);
    canvas.width = gridState.width * CONFIG.CELL_SIZE;
    canvas.height = gridState.height * CONFIG.CELL_SIZE;
}

function initializeGrid() {
    resizeCanvas();
    gridState.cells = Array(gridState.height).fill().map(() => 
        Array(gridState.width).fill().map(() => 
            Math.random() < CONFIG.INITIAL_ALIVE_PROBABILITY
        )
    );
}

function getWrappedCoordinates(x, y) {
    return {
        x: (x + gridState.width) % gridState.width,
        y: (y + gridState.height) % gridState.height
    };
}

/**
 * Counts living neighbors for a cell at given coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {number} Count of living neighbors (0-8)
 */
/**
 * Calculates the number of alive neighbors for a cell at the given coordinates.
 * Considers all 8 adjacent cells in a wrapped grid (cells at edges connect to opposite edge).
 * 
 * @param {number} x - The x-coordinate of the cell
 * @param {number} y - The y-coordinate of the cell
 * @returns {number} The count of alive neighboring cells (0-8)
 */
function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const coords = getWrappedCoordinates(x + j, y + i);
            if (gridState.cells[coords.y][coords.x]) count++;
        }
    }
    return count;
}

/**
 * Determines cell color based on neighbor count
 * @param {number} neighbors - Number of living neighbors
 * @returns {string} CSS color value
 */
function getCellColor(neighbors) {
    if (neighbors <= 2) return CONFIG.COLORS.SPARSE;
    if (neighbors <= 4) return CONFIG.COLORS.MODERATE;
    if (neighbors <= 6) return CONFIG.COLORS.DENSE;
    return CONFIG.COLORS.CROWDED;
}

function drawCell(x, y, neighbors) {
    ctx.fillStyle = getCellColor(neighbors);
    ctx.fillRect(
        x * CONFIG.CELL_SIZE, 
        y * CONFIG.CELL_SIZE, 
        CONFIG.CELL_SIZE - 1, 
        CONFIG.CELL_SIZE - 1
    );
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridState.height; y++) {
        for (let x = 0; x < gridState.width; x++) {
            if (gridState.cells[y][x]) {
                drawCell(x, y, countNeighbors(x, y));
            }
        }
    }
}

/**
 * Updates the game state according to Conway's rules
 * Rules:
 * 1. Any live cell with 2-3 neighbors survives
 * 2. Any dead cell with exactly 3 neighbors becomes alive
 * 3. All other cells die or stay dead
 */
function updateGrid() {
    const newGrid = gridState.cells.map((row, y) => 
        row.map((cell, x) => {
            const neighbors = countNeighbors(x, y);
            return neighbors === 3 || (cell && neighbors === 2);
        })
    );
    gridState.cells = newGrid;
}

/**
 * Main game loop function
 */
function gameLoop() {
    updateGrid();
    render();
}

// Cleanup function for event listeners
function cleanup() {
    window.removeEventListener('resize', initializeGrid);
    clearInterval(gameLoopInterval);
}

// Event listeners and initialization
window.addEventListener('resize', initializeGrid);
window.addEventListener('unload', cleanup);

initializeGrid();
const gameLoopInterval = setInterval(gameLoop, CONFIG.UPDATE_INTERVAL);