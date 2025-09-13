// Star canvas setup
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const STAR_COUNT = 150;

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random()
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.alpha += (Math.random() - 0.5) * 0.05;
        if(star.alpha < 0) star.alpha = 0;
        if(star.alpha > 1) star.alpha = 1;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Shooting stars
function createShootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height / 2;
    const length = Math.random() * 80 + 50;
    const speed = Math.random() * 5 + 5;
    let x = startX;
    let y = startY;

    function animate() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - length, y + length);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        x += speed;
        y += speed;

        if (x - length < canvas.width) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}
setInterval(createShootingStar, 3000);

// Floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.fontSize = Math.random() * 30 + 15 + 'px';
    heart.innerText = '❤️';
    document.getElementById('heartsContainer').appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 800);

// Love message button
const loveButton = document.getElementById('loveButton');
const popupMessage = document.getElementById('popupMessage');
const loveInput = document.getElementById('loveInput');
const defaultMessages = [
    "You are my everything 💖",
    "I love you more than the stars ✨",
    "Forever yours ❤️",
    "You make my world bright 🌙",
    "My heart beats for you 💕"
];

// Create floating hearts around popup message
function createMessageHearts() {
    const popupRect = popupMessage.getBoundingClientRect();
    const heartCount = 10;

    for(let i = 0; i < heartCount; i++){
        const heart = document.createElement('div');
        heart.className = 'message-heart';
        heart.innerText = '❤️';

        const offsetX = (Math.random() - 0.5) * 100 + 'px';
        const offsetY = (Math.random() - 0.5) * 50 + 'px';
        heart.style.setProperty('--x', offsetX);
        heart.style.setProperty('--y', offsetY);

        heart.style.left = popupRect.left + popupRect.width/2 + 'px';
        heart.style.top = popupRect.top + popupRect.height/2 + 'px';

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}

loveButton.addEventListener('click', () => {
    let msg = loveInput.value.trim();
    if(msg === "") {
        msg = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    }
    popupMessage.innerText = msg;
    loveInput.value = "";
    createMessageHearts();
});
