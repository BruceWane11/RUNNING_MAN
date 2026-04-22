// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const timeElement = document.getElementById('time');
const highScoreElement = document.getElementById('high-score');
const finalScoreElement = document.getElementById('final-score');
const newHighScoreElement = document.getElementById('new-high-score');
const gameOverScreen = document.getElementById('gameOver');
const startScreen = document.getElementById('startScreen');
const restartBtn = document.getElementById('restartBtn');
const startBtn = document.getElementById('startBtn');
const githubLink = document.getElementById('github-link');
const langEnBtn = document.getElementById('lang-en');
const langZhBtn = document.getElementById('lang-zh');

// Language state
let currentLang = localStorage.getItem('parkourLanguage') || 'en';

// Translation dictionary
const translations = {
    en: {
        // Header
        title: "PARKOUR RUNNER",
        subtitle: "Dodge obstacles, jump over gaps, and survive as long as you can!",

        // Stats
        score: "Score:",
        lives: "Lives:",
        time: "Time:",
        highScore: "High Score:",

        // Game screens
        readyToRun: "READY TO RUN?",
        controlsTitle: "CONTROLS",
        spaceJump: "SPACE or UP ARROW - Jump",
        downSlide: "DOWN ARROW - Slide (when available)",
        pPause: "P - Pause Game",
        startGame: "START GAME",
        tip: "Tip: Time your jumps carefully!",

        // Game over
        gameOver: "GAME OVER",
        yourScore: "Your score:",
        newHighScore: "New High Score!",
        playAgain: "PLAY AGAIN",

        // Controls info
        jump: "Jump",
        slide: "Slide",
        pause: "Pause",

        // Instructions
        howToPlay: "HOW TO PLAY",
        instruction1: "Press SPACE or UP ARROW to jump over obstacles",
        instruction2: "Avoid hitting obstacles or falling into gaps",
        instruction3: "Each obstacle passed gives you 10 points",
        instruction4: "Game gets faster as your score increases",
        instruction5: "You have 3 lives - lose them all and it's game over!",

        // Footer
        createdBy: "Created with",
        byClaude: "by Claude Code",
        viewOnGitHub: "View on GitHub"
    },
    zh: {
        // Header
        title: "跑酷奔跑者",
        subtitle: "躲避障碍，跳过缺口，尽可能生存下去！",

        // Stats
        score: "分数：",
        lives: "生命：",
        time: "时间：",
        highScore: "最高分：",

        // Game screens
        readyToRun: "准备奔跑？",
        controlsTitle: "控制说明",
        spaceJump: "空格键 或 上箭头 - 跳跃",
        downSlide: "下箭头 - 滑行（可用时）",
        pPause: "P键 - 暂停游戏",
        startGame: "开始游戏",
        tip: "提示：掌握好跳跃时机！",

        // Game over
        gameOver: "游戏结束",
        yourScore: "你的分数：",
        newHighScore: "新的最高分！",
        playAgain: "再玩一次",

        // Controls info
        jump: "跳跃",
        slide: "滑行",
        pause: "暂停",

        // Instructions
        howToPlay: "游戏玩法",
        instruction1: "按 空格键 或 上箭头 跳过障碍",
        instruction2: "避免撞到障碍物或掉入缺口",
        instruction3: "每个通过的障碍物得10分",
        instruction4: "分数越高，游戏速度越快",
        instruction5: "你有3条命 - 全部失去则游戏结束！",

        // Footer
        createdBy: "由",
        byClaude: "Claude Code 创建",
        viewOnGitHub: "在GitHub上查看"
    }
};

// Game state
let game = {
    running: false,
    paused: false,
    score: 0,
    highScore: localStorage.getItem('parkourHighScore') || 0,
    lives: 3,
    time: 0,
    speed: 5,
    gravity: 0.5,
    jumpForce: -12,
    groundLevel: canvas.height - 50,
    obstacles: [],
    particles: [],
    lastObstacleTime: 0,
    obstacleInterval: 2000, // ms
    animationId: null,
    lastTime: 0
};

// Player object
const player = {
    x: 100,
    y: canvas.height - 50,
    width: 40,
    height: 60,
    color: '#00eeff',
    velocityY: 0,
    jumping: false,
    sliding: false,
    slideTime: 0
};

// Initialize high score display
highScoreElement.textContent = game.highScore;

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
restartBtn.addEventListener('click', restartGame);
startBtn.addEventListener('click', startGame);
langEnBtn.addEventListener('click', () => switchLanguage('en'));
langZhBtn.addEventListener('click', () => switchLanguage('zh'));

// Set GitHub repository link (user can update this)
githubLink.href = 'https://github.com/BruceWane11/RUNNING_MAN';

// Language functions
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('parkourLanguage', lang);
    updateLanguage();
    updateLanguageButtons();
}

function updateLanguageButtons() {
    // Remove active class from all buttons
    langEnBtn.classList.remove('active');
    langZhBtn.classList.remove('active');

    // Add active class to current language button
    if (currentLang === 'en') {
        langEnBtn.classList.add('active');
    } else {
        langZhBtn.classList.add('active');
    }
}

function updateLanguage() {
    const t = translations[currentLang];

    // Update header
    document.querySelector('h1').innerHTML = `<i class="fas fa-running"></i> ${t.title}`;
    document.querySelector('.subtitle').textContent = t.subtitle;

    // Update stats labels
    const stats = document.querySelectorAll('.stat-label');
    if (stats.length >= 4) {
        stats[0].innerHTML = `${t.score} <span id="score">0</span>`;
        stats[1].innerHTML = `${t.lives} <span id="lives">3</span>`;
        stats[2].innerHTML = `${t.time} <span id="time">0</span>s`;
        stats[3].innerHTML = `${t.highScore} <span id="high-score">0</span>`;
    }

    // Update start screen
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.querySelector('h2').innerHTML = `<i class="fas fa-play-circle"></i> ${t.readyToRun}`;
        startScreen.querySelector('.controls h3').innerHTML = `<i class="fas fa-gamepad"></i> ${t.controlsTitle}`;
        const controlItems = startScreen.querySelectorAll('.controls p');
        if (controlItems.length >= 3) {
            controlItems[0].innerHTML = `<i class="fas fa-space-shuttle"></i> <strong>${t.spaceJump.split(' - ')[0]}</strong> - ${t.spaceJump.split(' - ')[1]}`;
            controlItems[1].innerHTML = `<i class="fas fa-arrow-down"></i> <strong>${t.downSlide.split(' - ')[0]}</strong> - ${t.downSlide.split(' - ')[1]}`;
            controlItems[2].innerHTML = `<i class="fas fa-pause"></i> <strong>${t.pPause.split(' - ')[0]}</strong> - ${t.pPause.split(' - ')[1]}`;
        }
        startScreen.querySelector('#startBtn').innerHTML = `<i class="fas fa-rocket"></i> ${t.startGame}`;
        startScreen.querySelector('.hint').textContent = t.tip;
    }

    // Update game over screen
    const gameOverScreen = document.getElementById('gameOver');
    if (gameOverScreen) {
        gameOverScreen.querySelector('h2').innerHTML = `<i class="fas fa-skull-crossbones"></i> ${t.gameOver}`;
        gameOverScreen.querySelector('p').innerHTML = `${t.yourScore} <span id="final-score">0</span>`;
        gameOverScreen.querySelector('#new-high-score').innerHTML = `<i class="fas fa-crown"></i> ${t.newHighScore}`;
        gameOverScreen.querySelector('#restartBtn').innerHTML = `<i class="fas fa-redo"></i> ${t.playAgain}`;
    }

    // Update controls info
    const controlItems = document.querySelectorAll('.control-item span');
    if (controlItems.length >= 3) {
        controlItems[0].textContent = t.jump;
        controlItems[1].textContent = t.slide;
        controlItems[2].textContent = t.pause;
    }

    // Update instructions
    const instructions = document.querySelector('.instructions');
    if (instructions) {
        instructions.querySelector('h3').innerHTML = `<i class="fas fa-info-circle"></i> ${t.howToPlay}`;
        const instructionItems = instructions.querySelectorAll('li');
        if (instructionItems.length >= 5) {
            instructionItems[0].innerHTML = t.instruction1;
            instructionItems[1].innerHTML = t.instruction2;
            instructionItems[2].innerHTML = t.instruction3;
            instructionItems[3].innerHTML = t.instruction4;
            instructionItems[4].innerHTML = t.instruction5;
        }
    }

    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.innerHTML = `${t.createdBy} <i class="fas fa-heart"></i> ${t.byClaude} |
            <a href="https://github.com/BruceWane11/RUNNING_MAN" target="_blank" id="github-link">
                <i class="fab fa-github"></i> ${t.viewOnGitHub}
            </a>`;
    }

    // Update canvas text (if game is running)
    if (game.running) {
        // Canvas text will be updated in next draw cycle
    }
}

// Initialize language
updateLanguage();
updateLanguageButtons();

// Handle key presses
function handleKeyDown(e) {
    if (!game.running) return;

    if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
        if (!player.jumping && !player.sliding) {
            player.velocityY = game.jumpForce;
            player.jumping = true;
            createParticles(player.x + player.width/2, player.y + player.height, 10, '#00eeff');
        }
        e.preventDefault();
    }

    if (e.code === 'ArrowDown') {
        if (!player.sliding && !player.jumping) {
            player.sliding = true;
            player.slideTime = Date.now();
            player.height = 30;
            player.y = game.groundLevel - player.height;
        }
    }

    if (e.key === 'p' || e.key === 'P') {
        togglePause();
    }
}

function handleKeyUp(e) {
    if (e.code === 'ArrowDown' && player.sliding) {
        player.sliding = false;
        player.height = 60;
        player.y = game.groundLevel - player.height;
    }
}

// Start the game
function startGame() {
    game.running = true;
    game.paused = false;
    game.score = 0;
    game.lives = 3;
    game.time = 0;
    game.speed = 5;
    game.obstacles = [];
    game.particles = [];
    game.lastObstacleTime = 0;
    player.x = 100;
    player.y = game.groundLevel - player.height;
    player.velocityY = 0;
    player.jumping = false;
    player.sliding = false;

    scoreElement.textContent = '0';
    livesElement.textContent = '3';
    timeElement.textContent = '0';
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    newHighScoreElement.classList.add('hidden');

    game.lastTime = performance.now();
    game.animationId = requestAnimationFrame(gameLoop);
}

// Restart game
function restartGame() {
    startGame();
}

// Toggle pause
function togglePause() {
    if (!game.running) return;

    game.paused = !game.paused;
    if (game.paused) {
        cancelAnimationFrame(game.animationId);
    } else {
        game.lastTime = performance.now();
        game.animationId = requestAnimationFrame(gameLoop);
    }
}

// Main game loop
function gameLoop(currentTime) {
    if (!game.running || game.paused) return;

    const deltaTime = currentTime - game.lastTime;
    game.lastTime = currentTime;

    update(deltaTime);
    draw();

    game.animationId = requestAnimationFrame(gameLoop);
}

// Update game state
function update(deltaTime) {
    // Update time
    game.time += deltaTime / 1000;
    timeElement.textContent = Math.floor(game.time);

    // Update player
    player.velocityY += game.gravity;
    player.y += player.velocityY;

    // Ground collision
    if (player.y > game.groundLevel - player.height) {
        player.y = game.groundLevel - player.height;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Stop sliding after 500ms
    if (player.sliding && Date.now() - player.slideTime > 500) {
        player.sliding = false;
        player.height = 60;
        player.y = game.groundLevel - player.height;
    }

    // Generate obstacles
    if (Date.now() - game.lastObstacleTime > game.obstacleInterval) {
        createObstacle();
        game.lastObstacleTime = Date.now();

        // Decrease interval (increase frequency) as score increases
        game.obstacleInterval = Math.max(800, 2000 - game.score * 10);
    }

    // Update obstacles
    for (let i = game.obstacles.length - 1; i >= 0; i--) {
        const obstacle = game.obstacles[i];
        obstacle.x -= game.speed;

        // Remove off-screen obstacles
        if (obstacle.x + obstacle.width < 0) {
            game.obstacles.splice(i, 1);
            game.score += 10;
            scoreElement.textContent = game.score;

            // Increase speed with score
            game.speed = 5 + Math.floor(game.score / 100);
        }

        // Check collision
        if (checkCollision(player, obstacle)) {
            game.obstacles.splice(i, 1);
            game.lives--;
            livesElement.textContent = game.lives;
            createParticles(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2, 15, '#ff5555');

            if (game.lives <= 0) {
                endGame();
                return;
            }
        }
    }

    // Update particles
    for (let i = game.particles.length - 1; i >= 0; i--) {
        const particle = game.particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // gravity
        particle.life--;

        if (particle.life <= 0) {
            game.particles.splice(i, 1);
        }
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(1, '#000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#333';
    ctx.fillRect(0, game.groundLevel, canvas.width, canvas.height - game.groundLevel);

    // Draw ground details
    ctx.fillStyle = '#444';
    for (let i = 0; i < canvas.width; i += 30) {
        ctx.fillRect(i, game.groundLevel, 15, 5);
    }

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Player details
    ctx.fillStyle = '#00aaff';
    ctx.fillRect(player.x + 5, player.y + 5, player.width - 10, 10); // visor
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(player.x + player.width - 15, player.y + 20, 10, 10); // badge

    // Draw obstacles
    game.obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        // Obstacle details
        ctx.fillStyle = '#ff5555';
        ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, 5);
    });

    // Draw particles
    game.particles.forEach(particle => {
        ctx.globalAlpha = particle.life / 50;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Draw score on canvas
    ctx.font = '20px Orbitron';
    ctx.fillStyle = '#00ffaa';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${game.score}`, 20, 30);
    ctx.fillText(`SPEED: ${game.speed}`, 20, 60);
}

// Create a new obstacle
function createObstacle() {
    const types = [
        { width: 30, height: 40, color: '#ff5555', y: game.groundLevel - 40 }, // low
        { width: 30, height: 70, color: '#ffaa00', y: game.groundLevel - 70 }, // medium
        { width: 30, height: 100, color: '#ff55ff', y: game.groundLevel - 100 }, // high
        { width: 60, height: 20, color: '#55ff55', y: game.groundLevel - 20 }  // wide/low
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    game.obstacles.push({
        x: canvas.width,
        y: type.y,
        width: type.width,
        height: type.height,
        color: type.color
    });
}

// Check collision between player and obstacle
function checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
           player.x + player.width > obstacle.x &&
           player.y < obstacle.y + obstacle.height &&
           player.y + player.height > obstacle.y;
}

// Create particles for effects
function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        game.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 2,
            size: Math.random() * 3 + 2,
            color: color,
            life: 50
        });
    }
}

// End the game
function endGame() {
    game.running = false;
    cancelAnimationFrame(game.animationId);

    finalScoreElement.textContent = game.score;

    // Check for high score
    if (game.score > game.highScore) {
        game.highScore = game.score;
        localStorage.setItem('parkourHighScore', game.highScore);
        highScoreElement.textContent = game.highScore;
        newHighScoreElement.classList.remove('hidden');
    }

    gameOverScreen.classList.remove('hidden');
}

// Create background particles for visual effect
function createBackgroundParticles() {
    const particlesContainer = document.getElementById('particles');

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.boxShadow = '0 0 10px rgba(100, 200, 255, 0.5)';

        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;

        particlesContainer.appendChild(particle);
    }
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize background particles
createBackgroundParticles();