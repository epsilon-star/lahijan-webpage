// Authentic Lo-Fi Iranian Chiptune Music Synthesizer via Web Audio API

export interface TrackInfo {
  id: string;
  titleFa: string;
  titleEn: string;
  artistFa: string;
  artistEn: string;
  moodFa: string;
  moodEn: string;
  durationSec: number;
}

export const TRACK_LIST: TrackInfo[] = [
  {
    id: 'jane-maryam',
    titleFa: 'جان مریم (لو-فای شمال)',
    titleEn: 'Jane Maryam (Caspian Lo-Fi)',
    artistFa: 'نوای فولکلور شمال ایران',
    artistEn: 'Northern Iran Folkloric Melody',
    moodFa: 'آرامش صبحگاهی مزارع چای',
    moodEn: 'Morning dew over tea hills',
    durationSec: 48,
  },
  {
    id: 'gole-sangam',
    titleFa: 'گل سنگم (چیپ‌تیون ۱۶ بیتی)',
    titleEn: 'Gole Sangam (16-Bit Chiptune)',
    artistFa: 'ملودی ماندگار ایرانی',
    artistEn: 'Nostalgic Persian Classic',
    moodFa: 'نوستالژیک و دلنشین',
    moodEn: 'Warm nostalgic dusk',
    durationSec: 52,
  },
  {
    id: 'lahijan-rain',
    titleFa: 'باران بر بام‌های لاهیجان',
    titleEn: 'Rain on Lahijan Terraces',
    artistFa: 'ترانه مه‌آلود گیلان',
    artistEn: 'Misty Gilan Tea Garden',
    moodFa: 'صدای باران و عطر چای داغ',
    moodEn: 'Gentle raindrops & hot tea',
    durationSec: 42,
  },
];

// Note frequencies in Hz
const NOTE_FREQS: Record<string, number> = {
  C3: 130.81, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  REST: 0,
};

interface Step {
  note: string;
  bass?: string;
  dur: number; // in beats (1 = quarter note)
}

// 1. Jane Maryam melody (Gilani Folkloric Masterpiece in Shur/Dashti)
const JANE_MARYAM_SCORE: Step[] = [
  // "Gol-e sorkh o sefidam key miyayi..."
  { note: 'G4', bass: 'C3', dur: 1 },
  { note: 'C5', bass: 'C3', dur: 1.5 },
  { note: 'C5', bass: 'C3', dur: 0.5 },
  { note: 'B4', bass: 'G3', dur: 1 },
  { note: 'C5', bass: 'G3', dur: 1 },
  { note: 'D5', bass: 'Ab3', dur: 1.5 },
  { note: 'C5', bass: 'Ab3', dur: 0.5 },
  { note: 'B4', bass: 'G3', dur: 1 },
  { note: 'A4', bass: 'G3', dur: 1 },

  // "Jane Maryam cheshmato va kon..."
  { note: 'G4', bass: 'C3', dur: 1 },
  { note: 'A4', bass: 'C3', dur: 1 },
  { note: 'B4', bass: 'G3', dur: 1.5 },
  { note: 'A4', bass: 'G3', dur: 0.5 },
  { note: 'G4', bass: 'C3', dur: 2 },
  { note: 'REST', bass: 'C3', dur: 0.5 },

  // Response phrase
  { note: 'E4', bass: 'C3', dur: 1 },
  { note: 'G4', bass: 'C3', dur: 1 },
  { note: 'A4', bass: 'F3', dur: 1.5 },
  { note: 'G4', bass: 'F3', dur: 0.5 },
  { note: 'F4', bass: 'F3', dur: 1 },
  { note: 'E4', bass: 'G3', dur: 1 },
  { note: 'D4', bass: 'G3', dur: 2 },
  { note: 'REST', bass: 'G3', dur: 0.5 },

  // Ending cycle
  { note: 'D4', bass: 'G3', dur: 1 },
  { note: 'E4', bass: 'G3', dur: 1 },
  { note: 'F4', bass: 'G3', dur: 1.5 },
  { note: 'E4', bass: 'C3', dur: 0.5 },
  { note: 'D4', bass: 'C3', dur: 1 },
  { note: 'C4', bass: 'C3', dur: 2 },
  { note: 'REST', bass: 'C3', dur: 1 },
];

// 2. Gole Sangam melody (Famous Persian melody in Esfahan)
const GOLE_SANGAM_SCORE: Step[] = [
  // "Gol-e sangam, gol-e sangam..."
  { note: 'C4', bass: 'C3', dur: 1 },
  { note: 'Eb4', bass: 'C3', dur: 1 },
  { note: 'G4', bass: 'C3', dur: 1.5 },
  { note: 'Ab4', bass: 'C3', dur: 0.5 },
  { note: 'G4', bass: 'G3', dur: 1.5 },
  { note: 'F4', bass: 'G3', dur: 0.5 },
  { note: 'Eb4', bass: 'C3', dur: 1 },
  { note: 'D4', bass: 'G3', dur: 1 },

  // "Chi begam az del-e tangam..."
  { note: 'D4', bass: 'G3', dur: 1 },
  { note: 'F4', bass: 'G3', dur: 1 },
  { note: 'Ab4', bass: 'G3', dur: 1.5 },
  { note: 'G4', bass: 'G3', dur: 0.5 },
  { note: 'F4', bass: 'C3', dur: 1 },
  { note: 'Eb4', bass: 'C3', dur: 1 },
  { note: 'D4', bass: 'G3', dur: 1.5 },
  { note: 'C4', bass: 'C3', dur: 2 },
  { note: 'REST', bass: 'C3', dur: 0.5 },

  // Chorus ascent
  { note: 'G4', bass: 'C3', dur: 1 },
  { note: 'C5', bass: 'C3', dur: 1.5 },
  { note: 'B4', bass: 'G3', dur: 0.5 },
  { note: 'C5', bass: 'G3', dur: 1 },
  { note: 'D5', bass: 'G3', dur: 1.5 },
  { note: 'C5', bass: 'C3', dur: 0.5 },
  { note: 'B4', bass: 'G3', dur: 1 },
  { note: 'Ab4', bass: 'Ab3', dur: 1.5 },
  { note: 'G4', bass: 'C3', dur: 2 },
  { note: 'REST', bass: 'C3', dur: 1 },
];

// 3. Lahijan Rain (Gilani folkloric harvest theme / Ra'na variations)
const LAHIJAN_RAIN_SCORE: Step[] = [
  { note: 'D4', bass: 'G3', dur: 1 },
  { note: 'G4', bass: 'G3', dur: 1 },
  { note: 'A4', bass: 'G3', dur: 1 },
  { note: 'Bb4', bass: 'Eb3', dur: 1.5 },
  { note: 'A4', bass: 'Eb3', dur: 0.5 },
  { note: 'G4', bass: 'G3', dur: 1.5 },
  { note: 'F4', bass: 'F3', dur: 0.5 },
  { note: 'G4', bass: 'G3', dur: 2 },

  { note: 'Bb4', bass: 'Eb3', dur: 1 },
  { note: 'C5', bass: 'Eb3', dur: 1 },
  { note: 'D5', bass: 'Bb3', dur: 1.5 },
  { note: 'C5', bass: 'Bb3', dur: 0.5 },
  { note: 'Bb4', bass: 'Eb3', dur: 1 },
  { note: 'A4', bass: 'F3', dur: 1 },
  { note: 'G4', bass: 'G3', dur: 2 },
  { note: 'REST', bass: 'G3', dur: 0.5 },

  { note: 'F4', bass: 'F3', dur: 1 },
  { note: 'G4', bass: 'G3', dur: 1 },
  { note: 'A4', bass: 'D3', dur: 1.5 },
  { note: 'G4', bass: 'D3', dur: 0.5 },
  { note: 'F4', bass: 'D3', dur: 1 },
  { note: 'Eb4', bass: 'C3', dur: 1 },
  { note: 'D4', bass: 'G3', dur: 2.5 },
  { note: 'REST', bass: 'G3', dur: 1 },
];

export class LofiPersianEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackIdx: number = 0;
  private volume: number = 0.5;
  private vinylCrackleEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;

  private stepIndex: number = 0;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private bpm: number = 74; // Relaxed lo-fi tempo

  // Listeners for UI state updates
  private stateChangeListeners: ((isPlaying: boolean, trackIdx: number, step: number) => void)[] = [];
  private visualizerData: number[] = [2, 4, 3, 5, 2, 6, 4, 3];

  constructor() {
    // Initialized lazily upon user interaction
  }

  private initAudio() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();

    // Master Volume
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    // Warm Lo-Fi Lowpass Filter (gives vintage cassette tape character)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(1800, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Setup ambient vinyl crackle
    this.initVinylCrackle();
  }

  private initVinylCrackle() {
    if (!this.ctx || !this.filterNode) return;
    try {
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // Soft pink noise with occasional vinyl pops
        const white = Math.random() * 2 - 1;
        const pop = Math.random() > 0.9994 ? (Math.random() * 2 - 1) * 0.4 : 0;
        output[i] = white * 0.015 + pop;
      }

      this.noiseGain = this.ctx.createGain();
      this.noiseGain.gain.setValueAtTime(this.vinylCrackleEnabled ? 0.25 : 0, this.ctx.currentTime);

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      this.noiseGain.connect(noiseFilter);
      noiseFilter.connect(this.filterNode);

      const playLoop = () => {
        if (!this.ctx || !this.noiseGain) return;
        this.noiseNode = this.ctx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;
        this.noiseNode.connect(this.noiseGain);
        this.noiseNode.start();
      };

      playLoop();
    } catch {
      // Fallback
    }
  }

  public subscribe(listener: (isPlaying: boolean, trackIdx: number, step: number) => void) {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.stateChangeListeners.forEach((l) => l(this.isPlaying, this.currentTrackIdx, this.stepIndex));
  }

  public async play() {
    this.initAudio();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;
    this.notify();
    this.scheduleNextStep();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % TRACK_LIST.length;
    this.stepIndex = 0;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.isPlaying) {
      this.scheduleNextStep();
    }
    this.notify();
  }

  public prevTrack() {
    this.currentTrackIdx = (this.currentTrackIdx - 1 + TRACK_LIST.length) % TRACK_LIST.length;
    this.stepIndex = 0;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.isPlaying) {
      this.scheduleNextStep();
    }
    this.notify();
  }

  public selectTrack(idx: number) {
    if (idx >= 0 && idx < TRACK_LIST.length) {
      this.currentTrackIdx = idx;
      this.stepIndex = 0;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      if (this.isPlaying) {
        this.scheduleNextStep();
      }
      this.notify();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleCrackle(): boolean {
    this.vinylCrackleEnabled = !this.vinylCrackleEnabled;
    if (this.noiseGain && this.ctx) {
      this.noiseGain.gain.setValueAtTime(this.vinylCrackleEnabled ? 0.25 : 0, this.ctx.currentTime);
    }
    return this.vinylCrackleEnabled;
  }

  public isCrackleOn(): boolean {
    return this.vinylCrackleEnabled;
  }

  public getVisualizerData(): number[] {
    if (!this.isPlaying) return [1, 1, 1, 1, 1, 1, 1, 1];
    return this.visualizerData.map((v) => Math.max(1, Math.min(6, v + (Math.floor(Math.random() * 3) - 1))));
  }

  private getCurrentScore(): Step[] {
    switch (this.currentTrackIdx) {
      case 0: return JANE_MARYAM_SCORE;
      case 1: return GOLE_SANGAM_SCORE;
      case 2: return LAHIJAN_RAIN_SCORE;
      default: return JANE_MARYAM_SCORE;
    }
  }

  private scheduleNextStep() {
    if (!this.isPlaying || !this.ctx || !this.filterNode) return;

    const score = this.getCurrentScore();
    const currentStep = score[this.stepIndex];
    const beatDurationMs = (60 / this.bpm) * 1000;
    const stepDurationMs = currentStep.dur * beatDurationMs;

    const now = this.ctx.currentTime;
    const noteFreq = NOTE_FREQS[currentStep.note] || 0;
    const bassFreq = currentStep.bass ? NOTE_FREQS[currentStep.bass] || 0 : 0;

    // 1. Play Lead Voice (Warm 8-bit Pulse/Square wave with gentle envelope)
    if (noteFreq > 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Lo-fi chiptune sound: pulse / triangle blend
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      // Subtle vibrato for vintage tape wow/flutter
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.value = 4.5; // 4.5 Hz tape flutter
      vibratoGain.gain.value = 1.8;
      vibrato.connect(osc.frequency);
      vibrato.start(now);
      vibrato.stop(now + (stepDurationMs / 1000) * 0.95);

      // Soft attack & warm sustain (classic lo-fi Rhodes/organ aesthetic)
      const noteDurSec = (stepDurationMs / 1000) * 0.9;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + noteDurSec);

      osc.connect(gain);
      gain.connect(this.filterNode);

      osc.start(now);
      osc.stop(now + noteDurSec);

      // Update pseudo visualizer
      this.visualizerData = [
        Math.floor(Math.random() * 5) + 2,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 5) + 2,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 4) + 2,
        Math.floor(Math.random() * 5) + 2,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 4) + 1,
      ];
    }

    // 2. Play Sub-Bass (Deep warm triangle wave)
    if (bassFreq > 0) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(bassFreq, now);

      const bassDurSec = (stepDurationMs / 1000) * 0.95;
      bassGain.gain.setValueAtTime(0.001, now);
      bassGain.gain.linearRampToValueAtTime(0.22, now + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + bassDurSec);

      bassOsc.connect(bassGain);
      bassGain.connect(this.filterNode);

      bassOsc.start(now);
      bassOsc.stop(now + bassDurSec);
    }

    // Advance to next note
    this.stepIndex = (this.stepIndex + 1) % score.length;
    this.notify();

    // Schedule next
    this.timeoutId = setTimeout(() => {
      this.scheduleNextStep();
    }, stepDurationMs);
  }

  public getCurrentTrack(): TrackInfo {
    return TRACK_LIST[this.currentTrackIdx];
  }

  public getTrackIndex(): number {
    return this.currentTrackIdx;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// Global persistent singleton engine
export const lofiEngine = new LofiPersianEngine();
