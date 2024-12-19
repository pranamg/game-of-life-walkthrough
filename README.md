# GitHub-Styled Game of Life

A modern implementation of Conway's Game of Life using HTML5 Canvas, featuring a
GitHub contribution graph-inspired visualization theme.

![Game of Life Preview](preview.png)

## Features

- 🎨 GitHub contribution graph color scheme
- 📱 Responsive design that adapts to window size
- 🔄 Wrapped grid edges for infinite patterns
- ⚡ Optimized performance for smooth animation

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/game-of-life-walkthrough.git
   ```

2. Open `index.html` in a modern web browser

## How It Works

This implementation follows Conway's Game of Life rules while visualizing cell
density using GitHub's contribution graph colors. The intensity of each cell's
color is determined by its neighbor count.

For a detailed walkthrough of the implementation, see 
[walkthrough-README.md](walkthrough-README.md).

## Contributing

We welcome contributions! Please follow these steps:

1. Check existing issues or create a new one
2. Fork the repository
3. Create a feature branch
4. Follow the [code guidelines](.github/copilot-instructions.md)
5. Submit a pull request

## Development

Requirements:
- Modern web browser with HTML5 Canvas support
- Basic understanding of JavaScript and Canvas API

To modify the game:
- Adjust `CONFIG` values in `script.js` for different behaviors
- Modify CSS custom properties in `styles.css` for theming
- See code guidelines for best practices

## License

MIT License - See [LICENSE](LICENSE) for details
