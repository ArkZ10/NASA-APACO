// Interactive star background script
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
let mouse = { x: undefined, y: undefined };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star object
function Star(x, y, radius, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.speedX = speedX;
  this.speedY = speedY;

  this.update = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  };
}

// Initialize stars
function init() {
  stars = [];
  for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 2;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let speedX = (Math.random() - 0.5) * 0.5;
    let speedY = (Math.random() - 0.5) * 0.5;
    stars.push(new Star(x, y, radius, speedX, speedY));
  }
}

// Animate stars and follow the cursor
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
    if (mouse.x) {
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;
      if (distance < maxDistance) {
        star.x += (dx / distance) * 0.5;
        star.y += (dy / distance) * 0.5;
      }
    }
  });
}

// Mouse movement
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Resize canvas when window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Initialize and animate stars
init();
animate();

// Scroll event to adjust header padding based on scroll position
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Check if the header element exists to avoid errors
    if (header) {
        // If the scroll position is greater than 100px, reduce the padding
        if (scrollTop > 100) {
            header.style.padding = '20px 20px';  // Shrink padding
        } else {
            // Return to original padding when scrolled back to the top
            const padding = 200 - scrollTop;
            header.style.padding = `${padding}px 20px`;  // Dynamically adjust padding
        }
    }
});

// Menu button click event to navigate to story2.html
document.getElementById('menu').addEventListener('click', function() {
    window.location.href = 'story2/story2.html';       // Navigate to story2.html
});
