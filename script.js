// Firework class to handle individual firework particles
class Firework {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2); // Start from the bottom
    this.size = Math.random() * 5 + 2; // Random size
    this.speed = Math.random() * 3 + 2; // Random speed
    this.exploded = false;
    this.particles = [];
    this.color = this.randomColor(); // Assign a random color to the firework
  }

  randomColor() {
    // Generate a random RGB color
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`; // Include alpha for full visibility
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed; // Move up
      if (this.y <= window.innerHeight / 2) {
        this.explode();
      }
    } else {
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.alpha <= 0) {
          this.particles.splice(index, 1); // Remove dead particles
        }
      });
    }
  }

  explode() {
    this.exploded = true;
    const particleCount = Math.random() * 50 + 50; // Random number of particles
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push(new Particle(this.x, this.y, angle, speed, this.randomColor())); // Assign a random color to each particle
    }
  }

  draw(ctx) {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 1)`; // Draw as white before exploding
      ctx.fill();
    } else {
      this.particles.forEach(particle => particle.draw(ctx));
    }
  }
}

// Particle class for explosion particles
class Particle {
  constructor(x, y, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 2;
    this.angle = angle;
    this.speed = speed;
    this.alpha = 1;
    this.color = color; // Use the color of the particle
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.02; // Fade out
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color.slice(5, -1)}, ${this.alpha})`; // Use the color of the particle with alpha
    ctx.fill();
  }
}

const fireworks = [];
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach(firework => firework.update());
  fireworks.forEach(firework => firework.draw(ctx));
  requestAnimationFrame(animate);
}

// Variable to hold the interval ID
let fireworkInterval;

// Start fireworks display
function celebrateDiwali() {
  // Start generating fireworks at an interval
  if (!fireworkInterval) {
    fireworkInterval = setInterval(() => {
      fireworks.push(new Firework());
    }, 700); // Adjust this interval for more or fewer fireworks

    // Show message
    const message = document.createElement('div');
    message.textContent = 'Wishing you and your family a very prosperous & lightful Diwali!';
    message.style.position = 'absolute';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.color = '#FFFFFF';
    message.style.fontSize = '24px';
    message.style.zIndex = '10';
    document.body.appendChild(message);

    setTimeout(() => {
      document.body.removeChild(message);
    }, 9000); // Remove message after 9 seconds
  }
}

// Start the animation loop
animate();
