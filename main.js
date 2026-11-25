import { GentleNightAudio } from './audio.js';
import { SECTIONS } from './sections.js';
import { NightGardenWorld } from './garden.js';

const nightAudio = new GentleNightAudio();

const introCurtain = document.getElementById('intro-curtain');
const crystalBox = document.getElementById('crystal-flower-box');
const crystalSvg = document.getElementById('crystal-flower-svg');
const flowerHint = document.getElementById('flower-hint');
const enterBtn = document.getElementById('enter-garden-btn');
const reopenBtn = document.getElementById('reopen-intro-btn');
const soundBtn = document.getElementById('toggle-sound-btn');

const modal = document.getElementById('section-modal');
const panelKicker = document.getElementById('panel-kicker');
const panelTitle = document.getElementById('panel-title');
const panelBody = document.getElementById('panel-body');
const closePanelBtn = document.getElementById('close-panel-btn');

function openSection(sectionId, freq = 261.63) {
  const data = SECTIONS[sectionId];
  if (!data) return;

  nightAudio.playGentleNote(freq, 1.45, 0.22);

  panelKicker.textContent = data.kicker;
  panelTitle.textContent = data.title;
  panelBody.innerHTML = data.html;
  modal.classList.add('open');

  const form = document.getElementById('garden-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      nightAudio.playChord([440.00, 554.37, 659.25]);
      const statusEl = document.getElementById('form-status');
      statusEl.textContent = 'Mensaje preparado con cariño en el jardín nocturno. ¡Gracias por escribir!';
      form.reset();
    });
  }
}

function closeSection() {
  modal.classList.remove('open');
}

function bloomFlowerNote() {
  crystalBox.classList.add('bloomed');
  flowerHint.textContent = 'La flor floreció · Abre el telón cuando quieras';
  nightAudio.playGentleNote(523.25, 1.5, 0.2);
}

crystalSvg.addEventListener('pointerenter', bloomFlowerNote);
crystalSvg.addEventListener('click', bloomFlowerNote);
crystalSvg.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    bloomFlowerNote();
  }
});

enterBtn.addEventListener('click', () => {
  nightAudio.init();
  nightAudio.playChord([261.63, 329.63, 392.00, 493.88]);
  introCurtain.classList.add('hidden');
});

reopenBtn.addEventListener('click', () => {
  closeSection();
  introCurtain.classList.remove('hidden');
});

soundBtn.addEventListener('click', () => {
  const nextState = !nightAudio.enabled;
  nightAudio.setEnabled(nextState);
  soundBtn.classList.toggle('active', nextState);
  soundBtn.textContent = nextState ? '♪ Sonido Suave: ON' : '♪ Sonido Suave: OFF';
  if (nextState) {
    nightAudio.playGentleNote(392.00, 1.1, 0.18);
  }
});

closePanelBtn.addEventListener('click', closeSection);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeSection();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSection();
});

document.querySelectorAll('.piano-key').forEach((keyEl) => {
  const sec = keyEl.getAttribute('data-section');
  const freq = Number(keyEl.getAttribute('data-freq'));

  keyEl.addEventListener('pointerdown', () => {
    keyEl.classList.add('active');
    openSection(sec, freq);
  });

  const releaseKey = () => keyEl.classList.remove('active');
  keyEl.addEventListener('pointerup', releaseKey);
  keyEl.addEventListener('pointerleave', releaseKey);
});

const canvas = document.getElementById('world-canvas');
const world = new NightGardenWorld(canvas, nightAudio, openSection);

function loop(time) {
  world.render(time);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);