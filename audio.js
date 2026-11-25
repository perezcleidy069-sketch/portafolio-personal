export class GentleNightAudio {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.reverbSend = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 24;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.01;
      compressor.release.value = 0.25;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.36;

      const convolver = this.ctx.createConvolver();
      convolver.buffer = this.createReverbImpulse(2.4, 2.8);

      const reverbWet = this.ctx.createGain();
      reverbWet.gain.value = 0.28;

      this.reverbSend = this.ctx.createGain();
      this.reverbSend.gain.value = 0.75;

      this.reverbSend.connect(convolver);
      convolver.connect(reverbWet);
      reverbWet.connect(compressor);

      this.reverbSend.connect(compressor);
      compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  createReverbImpulse(duration, decay) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = this.ctx.createBuffer(2, length, rate);

    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const env = Math.pow(1 - i / length, decay);
        data[i] = (Math.random() * 2 - 1) * env * 0.45;
      }
    }
    return impulse;
  }

  setEnabled(val) {
    this.enabled = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val ? 0.36 : 0.0001, this.ctx.currentTime, 0.04);
    }
  }

  playGentleNote(freq, duration = 1.35, volume = 0.22) {
    if (!this.enabled) return;
    this.init();

    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4.2, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(freq * 0.0022, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 3.5, 2200), now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.3, 320), now + duration);
    filter.Q.value = 0.8;

    const env1 = this.ctx.createGain();
    env1.gain.setValueAtTime(0.0001, now);
    env1.gain.linearRampToValueAtTime(volume, now + 0.025);
    env1.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    const env2 = this.ctx.createGain();
    env2.gain.setValueAtTime(0.0001, now);
    env2.gain.linearRampToValueAtTime(volume * 0.16, now + 0.015);
    env2.gain.exponentialRampToValueAtTime(0.0004, now + duration * 0.65);

    osc1.connect(filter);
    osc2.connect(env2);
    env2.connect(filter);
    filter.connect(env1);
    env1.connect(this.reverbSend);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    const stopTime = now + duration + 0.08;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    lfo.stop(stopTime);
  }

  playChord(freqs) {
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playGentleNote(f, 1.8, 0.16), idx * 95);
    });
  }
}