export class NightGardenWorld {
  constructor(canvas, audio, onSelectStation) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.audio = audio;
    this.onSelectStation = onSelectStation;

    this.width = (this.canvas.width = window.innerWidth);
    this.height = (this.canvas.height = window.innerHeight);

    this.pointer = { x: this.width * 0.5, y: this.height * 0.45, active: false };
    this.keys = new Set();

    this.hummingbird = {
      x: this.width * 0.5,
      y: this.height * 0.45,
      vx: 0,
      vy: 0,
      targetX: this.width * 0.5,
      targetY: this.height * 0.45,
      wingPhase: 0,
      facing: 1
    };

    this.stations = [
      { id: 'about', label: 'Sobre mí', note: 'Do', freq: 261.63, rx: 0.20, ry: 0.34 },
      { id: 'skills', label: 'Habilidades', note: 'Re', freq: 293.66, rx: 0.36, ry: 0.62 },
      { id: 'projects', label: 'Proyectos', note: 'Mi', freq: 329.63, rx: 0.52, ry: 0.30 },
      { id: 'apps', label: 'Aplicaciones', note: 'Sol', freq: 392.00, rx: 0.68, ry: 0.60 },
      { id: 'contact', label: 'Contacto', note: 'La', freq: 440.00, rx: 0.83, ry: 0.36 }
    ];

    this.butterflies = Array.from({ length: 9 }, (_, i) => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
      wing: Math.random() * Math.PI * 2,
      speed: 0.14 + Math.random() * 0.08,
      size: 10 + Math.random() * 6,
      hue: i % 2 === 0 ? '#ffd7c4' : '#c9b6ff'
    }));

    this.sparkles = [];
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });

    window.addEventListener('pointermove', (e) => {
      this.pointer.x = e.clientX;
      this.pointer.y = e.clientY;
      this.pointer.active = true;
      if (Math.random() < 0.35) {
        this.spawnSparkle(e.clientX, e.clientY, Math.random() < 0.5 ? '#ffd7c4' : '#ebb29c');
      }
    });

    this.canvas.addEventListener('pointerdown', (e) => {
      this.audio.init();
      this.hummingbird.targetX = e.clientX;
      this.hummingbird.targetY = e.clientY;
      for (let i = 0; i < 8; i++) {
        this.spawnSparkle(e.clientX, e.clientY, '#ffd7c4');
      }

      for (const st of this.stations) {
        const sx = this.width * st.rx;
        const sy = this.height * st.ry;
        const dist = Math.hypot(e.clientX - sx, e.clientY - sy);
        if (dist < 44) {
          this.onSelectStation(st.id, st.freq);
          break;
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }

  spawnSparkle(x, y, color = '#ffd7c4') {
    this.sparkles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -0.5 - Math.random() * 1.2,
      alpha: 1,
      radius: 2 + Math.random() * 3,
      color
    });
  }

  drawBackground(time) {
    for (let i = 0; i < 36; i++) {
      const sx = (((i * 197) % 1000) / 1000) * this.width;
      const sy = (((i * 313) % 620) / 620) * this.height;
      const twinkle = 0.25 + 0.55 * Math.sin(time * 0.002 + i);
      this.ctx.fillStyle = `rgba(255, 235, 224, ${twinkle * 0.45})`;
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, (i % 2) + 0.9, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(235, 178, 156, 0.14)';
    this.ctx.setLineDash([5, 8]);
    this.ctx.lineWidth = 1.2;
    this.ctx.beginPath();
    this.stations.forEach((st, idx) => {
      const x = this.width * st.rx;
      const y = this.height * st.ry;
      if (idx === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    });
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawStations(time) {
    this.stations.forEach((st, idx) => {
      const x = this.width * st.rx;
      const y = this.height * st.ry + Math.sin(time * 0.002 + idx) * 6;
      const distToBird = Math.hypot(this.hummingbird.x - x, this.hummingbird.y - y);
      const nearby = distToBird < 78;
      const pulse = 1 + Math.sin(time * 0.003 + idx) * 0.08;

      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.scale(pulse, pulse);

      // Capas de resplandor exterior
      const outerGlow = this.ctx.createRadialGradient(0, 0, 2, 0, 0, nearby ? 70 : 50);
      outerGlow.addColorStop(0, 'rgba(255, 240, 230, 0.15)');
      outerGlow.addColorStop(0.5, 'rgba(235, 178, 156, 0.1)');
      outerGlow.addColorStop(1, 'rgba(235, 178, 156, 0)');
      this.ctx.fillStyle = outerGlow;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, nearby ? 70 : 50, 0, Math.PI * 2);
      this.ctx.fill();

      // Núcleo brillante
      const coreGlow = this.ctx.createRadialGradient(0, 0, 1, 0, 0, nearby ? 22 : 16);
      coreGlow.addColorStop(0, nearby ? 'rgba(255, 250, 245, 0.9)' : 'rgba(255, 220, 200, 0.5)');
      coreGlow.addColorStop(1, 'rgba(235, 178, 156, 0.3)');
      this.ctx.fillStyle = coreGlow;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, nearby ? 22 : 16, 0, Math.PI * 2);
      this.ctx.fill();

      // Pétalos más numerosos y elegantes
      const petalCount = 10;
      for (let p = 0; p < petalCount; p++) {
        this.ctx.save();
        this.ctx.rotate((p * Math.PI * 2) / petalCount + Math.sin(time * 0.0012 + idx) * 0.04);

        // Gradiente del pétalo
        const petalGrad = this.ctx.createLinearGradient(0, 0, 0, -16);
        petalGrad.addColorStop(0, nearby ? 'rgba(255, 230, 210, 0.5)' : 'rgba(235, 178, 156, 0.25)');
        petalGrad.addColorStop(0.7, nearby ? 'rgba(255, 200, 170, 0.35)' : 'rgba(235, 178, 156, 0.15)');
        petalGrad.addColorStop(1, 'rgba(235, 178, 156, 0.1)');

        this.ctx.fillStyle = petalGrad;
        this.ctx.strokeStyle = nearby ? 'rgba(255, 240, 220, 0.7)' : 'rgba(235, 178, 156, 0.5)';
        this.ctx.lineWidth = 1.4;
        this.ctx.beginPath();
        this.ctx.ellipse(0, -13, 8, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
      }

      // Estambres centrales
      this.ctx.fillStyle = '#ebb29c';
      for (let s = 0; s < 6; s++) {
        this.ctx.save();
        this.ctx.rotate((s * Math.PI * 2) / 6);
        this.ctx.beginPath();
        this.ctx.ellipse(3, -6, 1.5, 3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }

      // Pistilo central
      this.ctx.fillStyle = '#ffd7c4';
      this.ctx.beginPath();
      this.ctx.arc(0, -1, 4, 0, Math.PI * 2);
      this.ctx.fill();

      // Etiqueta de estación
      this.ctx.font = '600 11px Montserrat, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = nearby ? '#fffaf6' : '#ebb29c';
      this.ctx.fillText(`${st.label}`, 0, 34);

      this.ctx.restore();
    });
  }

  updateAndDrawButterflies(time) {
    this.butterflies.forEach((b) => {
      b.wing += b.speed;

      if (this.pointer.active) {
        const dx = b.x - this.pointer.x;
        const dy = b.y - this.pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 1) {
          b.vx += (dx / d) * 0.08;
          b.vy += (dy / d) * 0.08;
        }
      }

      b.vx += Math.cos(time * 0.0012 + b.wing) * 0.025;
      b.vy += Math.sin(time * 0.0015 + b.wing) * 0.025;

      const maxSpeed = 2.1;
      const speed = Math.hypot(b.vx, b.vy);
      if (speed > maxSpeed) {
        b.vx = (b.vx / speed) * maxSpeed;
        b.vy = (b.vy / speed) * maxSpeed;
      }

      b.x += b.vx;
      b.y += b.vy;

      if (b.x < -30) b.x = this.width + 30;
      if (b.x > this.width + 30) b.x = -30;
      if (b.y < -30) b.y = this.height + 30;
      if (b.y > this.height + 30) b.y = -30;

      const flap = Math.max(0.22, Math.abs(Math.sin(b.wing)));

      this.ctx.save();
      this.ctx.translate(b.x, b.y);
      this.ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);

      this.ctx.fillStyle = b.hue;
      this.ctx.globalAlpha = 0.82;

      this.ctx.beginPath();
      this.ctx.ellipse(-b.size * 0.65 * flap, 0, b.size * flap, b.size * 0.55, -0.25, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.ellipse(b.size * 0.65 * flap, 0, b.size * flap, b.size * 0.55, 0.25, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    });
  }

  updateAndDrawHummingbird(time) {
    const moveSpeed = 5.2;
    let manualMove = false;

    if (this.keys.has('arrowleft') || this.keys.has('a')) {
      this.hummingbird.targetX -= moveSpeed;
      manualMove = true;
    }
    if (this.keys.has('arrowright') || this.keys.has('d')) {
      this.hummingbird.targetX += moveSpeed;
      manualMove = true;
    }
    if (this.keys.has('arrowup') || this.keys.has('w')) {
      this.hummingbird.targetY -= moveSpeed;
      manualMove = true;
    }
    if (this.keys.has('arrowdown') || this.keys.has('s')) {
      this.hummingbird.targetY += moveSpeed;
      manualMove = true;
    }

    if (!manualMove && this.pointer.active) {
      this.hummingbird.targetX += (this.pointer.x + 26 - this.hummingbird.targetX) * 0.06;
      this.hummingbird.targetY += (this.pointer.y - 18 + Math.sin(time * 0.005) * 8 - this.hummingbird.targetY) * 0.06;
    }

    this.hummingbird.targetX = Math.max(40, Math.min(this.width - 40, this.hummingbird.targetX));
    this.hummingbird.targetY = Math.max(65, Math.min(this.height - 135, this.hummingbird.targetY));

    const dx = this.hummingbird.targetX - this.hummingbird.x;
    const dy = this.hummingbird.targetY - this.hummingbird.y;
    this.hummingbird.vx += dx * 0.018;
    this.hummingbird.vy += dy * 0.018;
    this.hummingbird.vx *= 0.86;
    this.hummingbird.vy *= 0.86;

    this.hummingbird.x += this.hummingbird.vx;
    this.hummingbird.y += this.hummingbird.vy;
    this.hummingbird.wingPhase += 0.65;

    if (Math.abs(this.hummingbird.vx) > 0.25) {
      this.hummingbird.facing = this.hummingbird.vx >= 0 ? 1 : -1;
    }

    if (Math.hypot(this.hummingbird.vx, this.hummingbird.vy) > 1.2 && Math.random() < 0.35) {
      this.spawnSparkle(this.hummingbird.x, this.hummingbird.y, '#ffd7c4');
    }

    this.ctx.save();
    this.ctx.translate(this.hummingbird.x, this.hummingbird.y);
    this.ctx.scale(this.hummingbird.facing, 1);

    const aura = this.ctx.createRadialGradient(0, 0, 2, 0, 0, 28);
    aura.addColorStop(0, 'rgba(255, 215, 196, 0.35)');
    aura.addColorStop(1, 'rgba(255, 215, 196, 0)');
    this.ctx.fillStyle = aura;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 28, 0, Math.PI * 2);
    this.ctx.fill();

    const wingY = Math.sin(this.hummingbird.wingPhase) * 12;
    this.ctx.fillStyle = 'rgba(255, 245, 240, 0.72)';
    this.ctx.beginPath();
    this.ctx.ellipse(-2, -3, 11, Math.max(2.5, Math.abs(wingY)), -0.45, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#ebb29c';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 11, 6.5, -0.15, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#fffaf6';
    this.ctx.beginPath();
    this.ctx.moveTo(10, -1);
    this.ctx.lineTo(22, 1.5);
    this.ctx.lineTo(10, 3);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = '#c88b78';
    this.ctx.beginPath();
    this.ctx.moveTo(-10, 0);
    this.ctx.lineTo(-20, -4);
    this.ctx.lineTo(-18, 3);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  updateAndDrawSparkles() {
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.018;

      if (s.alpha <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, s.alpha);
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  render(time) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground(time);
    this.drawStations(time);
    this.updateAndDrawButterflies(time);
    this.updateAndDrawHummingbird(time);
    this.updateAndDrawSparkles();
  }
}