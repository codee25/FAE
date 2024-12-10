// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Get user information
const user = Telegram.WebApp.initDataUnsafe.user;
const usernameElement = document.getElementById('username');
usernameElement.textContent = user ? user.first_name || 'Player' : 'Guest';

// Game variables
let score = 0;
let enemyHealth = 100;
const healthBar = document.getElementById('health');
const scoreDisplay = document.getElementById('score');
const attackButton = document.getElementById('attackButton');
const enemy = document.getElementById('enemy');

// Attack functionality
attackButton.addEventListener('click', () => {
    if (enemyHealth > 0) {
        enemyHealth -= 10; // Reduce enemy health by 10
        healthBar.style.width = `${enemyHealth}%`;

        // If the enemy is defeated
        if (enemyHealth <= 0) {
            score += 10; // Earn 10 tokens for defeating the enemy
            scoreDisplay.textContent = `HIRAM Tokens: ${score}`;
            animateEnemyDeath();

            // Reset after 1.5 seconds
            setTimeout(() => {
                enemyHealth = 100;
                healthBar.style.width = '100%';
                enemy.classList.remove('death');
            }, 1500);

            // Optionally send the score back to Telegram bot
            Telegram.WebApp.sendData(JSON.stringify({ tokens: score }));
        }
    }
});

// Enemy death animation
function animateEnemyDeath() {
    enemy.classList.add('death');
}

// Expand Telegram WebApp to fullscreen
Telegram.WebApp.expand();
