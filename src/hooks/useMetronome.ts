import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { PATTERNS } from '../utils/deaultPatterns';

interface UseMetronomeProps {
  patternKey: string;
  bpm: number;
  isPlaying: boolean;
}

export function useMetronome({ patternKey, bpm, isPlaying }: UseMetronomeProps) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const pattern = PATTERNS[patternKey];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (!isPlaying || !pattern) return;

    // Inicia Tone.js
    Tone.start();

    // Crea sintetizador
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0,
        release: 0.1,
      },
    }).toDestination();

    // Calcula intervalo: cada semicorchea (dividido por 2)
    const interval = (60 / bpm) * 1000 / 2;
    let beatIndex = 0;

    timer = setInterval(() => {
      // Determina si es un beat principal (par) o contratiempo (impar)
      const isMainBeat = beatIndex % 2 === 0;
      const beatPosition = Math.floor(beatIndex / 2) % pattern.beats;

      let soundType = 0;

      if (isMainBeat) {
        // Beat principal: usa mainPattern
        soundType = pattern.mainPattern[beatPosition];
      } else {
        // Contratiempo: usa contraPattern si existe
        if (pattern.contraPattern) {
          soundType = pattern.contraPattern[beatPosition];
        }
      }

      // Reproduce el sonido
      const soundConfig = pattern.sounds[soundType];
      if (soundConfig && soundType !== 0) {  // No reproduce si soundType es 0 (silencio)
        synth.triggerAttackRelease(soundConfig.freq, soundConfig.dur);
      }

      // Actualiza el beat actual (solo muestra los beats principales, no contratiempos)
      if (isMainBeat) {
        setCurrentBeat(beatPosition);
      }

      beatIndex++;
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, bpm, patternKey, pattern]);

  return {
    currentBeat,
    pattern,
    totalBeats: pattern?.beats || 4
  };
}
