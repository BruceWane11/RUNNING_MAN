# 🏃‍♂️ Parkour Runner Game

A fast-paced, browser-based parkour running game built with HTML5, CSS3, and JavaScript. Dodge obstacles, jump over gaps, and survive as long as you can!

![Game Screenshot](https://via.placeholder.com/800x400/0f0c29/00eeff?text=Parkour+Runner+Game+Screenshot)

## 🎮 How to Play

1. **Start the game** by clicking the "START GAME" button
2. **Jump** using `SPACE` or `UP ARROW` key
3. **Slide** using `DOWN ARROW` key (when available)
4. **Avoid obstacles** - each hit costs you one life
5. **Survive as long as possible** to score points
6. **Game gets faster** as your score increases
7. **You have 3 lives** - lose them all and it's game over!

## 🚀 Features

- **Smooth gameplay** with canvas-based graphics
- **Dynamic difficulty** - game speed increases with score
- **Particle effects** for jumps and collisions
- **High score tracking** using localStorage
- **Responsive design** that works on desktop and mobile
- **Visual feedback** with animated UI elements
- **Pause functionality** (Press 'P' to pause/resume)

## 🛠️ Technologies Used

- **HTML5** - Game structure and canvas element
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6)** - Game logic, physics, and interactions
- **Canvas API** - 2D rendering for game graphics
- **LocalStorage** - Persistent high score storage
- **Font Awesome** - Icons for UI elements
- **Google Fonts** - Custom typography

## 📁 Project Structure

```
RUNNING_MAN/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── game.js             # Game logic and mechanics
├── README.md           # This documentation
└── (future assets)     # Images, sounds, etc.
```

## 🏃‍♀️ Game Mechanics

### Player Controls
- **Jump**: `SPACE` or `UP ARROW` - Jump over obstacles
- **Slide**: `DOWN ARROW` - Slide under low obstacles (500ms duration)
- **Pause**: `P` - Pause/resume the game

### Scoring System
- **+10 points** for each obstacle avoided
- **Speed increases** every 100 points
- **Obstacle frequency** increases with score
- **High score** saved locally in your browser

### Obstacle Types
1. **Low obstacles** (40px tall) - Easy to jump over
2. **Medium obstacles** (70px tall) - Requires precise timing
3. **High obstacles** (100px tall) - Need full jump
4. **Wide obstacles** (60px wide) - Requires sliding

## 🖥️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BruceWane11/RUNNING_MAN.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd parkour-runner-game
   ```

3. **Open the game**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000`

## 🌐 Browser Compatibility

The game works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Note**: Requires JavaScript enabled.

## 🔧 Future Enhancements

Planned features for future versions:
- [ ] Sound effects and background music
- [ ] Multiple character skins
- [ ] Power-ups (double jump, shield, slow motion)
- [ ] Different environments/backgrounds
- [ ] Mobile touch controls
- [ ] Online leaderboard
- [ ] Level progression system
- [ ] Custom obstacle editor

## 👨‍💻 Development

### Prerequisites
- Basic understanding of HTML, CSS, and JavaScript
- A modern web browser for testing
- Code editor (VS Code, Sublime Text, etc.)

### Modifying the Game

1. **Change game speed**: Adjust `game.speed` in `game.js`
2. **Modify player physics**: Tweak `game.gravity` and `game.jumpForce`
3. **Add new obstacles**: Extend the `types` array in `createObstacle()` function
4. **Customize colors**: Edit color values in both `style.css` and `game.js`

### Code Structure Highlights

- **Game loop**: Uses `requestAnimationFrame` for smooth animations
- **Collision detection**: Simple AABB (axis-aligned bounding box) checking
- **Particle system**: Creates visual effects for jumps and collisions
- **State management**: Game state object tracks all variables

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Areas needing contribution:
- Bug fixes and performance improvements
- New game features and mechanics
- Better graphics and animations
- Sound design and music
- Mobile optimization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Claude Code** for assistance in creating this game
- **Font Awesome** for the awesome icons
- **Google Fonts** for the typography
- **Canvas API** documentation and tutorials
- **All players** who test and provide feedback

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Submit a pull request with improvements
- Share your high scores!

---

**Made with ❤️ by BruceWane11** | **Enjoy the game!** 🎮