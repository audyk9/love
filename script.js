const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flowers = ["🌸", "🌼", "🌺", "✿"];

const particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = 16 + Math.random() * 24;
    this.speedY = 1 + Math.random() * 3;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.symbol = flowers[Math.floor(Math.random() * flowers.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.font = `${this.size}px serif`;
    ctx.fillText(this.symbol, 0, 0);
    ctx.restore();
  }
}

function spawn() {
  if (particles.length < 80) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  spawn();

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // hapus kalau sudah keluar layar
    if (particles[i].y > canvas.height + 50) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
