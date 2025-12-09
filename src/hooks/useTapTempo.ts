import { useState, useRef, useCallback } from 'react';

interface UseTapTempoProps {
  minBpm?: number;
  maxBpm?: number;
  resetDelay?: number;
  tapWindow?: number; 
}

export function useTapTempo({
  minBpm = 10,
  maxBpm = 300,
  resetDelay = 2000,
  tapWindow = 3 
}: UseTapTempoProps = {}) {
  const [bpm, setBpm] = useState(100);
  const lastTapTime = useRef<number | null>(null);
  const tapIntervals = useRef<number[]>([]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = useRef(true); 

  /**
   * Calcula el BPM basado en el promedio de los últimos intervalos
   */
  const handleTap = useCallback(() => {
    if (!isActive.current) return;

    const now = Date.now();

    if (lastTapTime.current !== null) {
      const timeDifference = now - lastTapTime.current;
      
      if (timeDifference > 200) {
        tapIntervals.current.push(timeDifference);
        
        if (tapIntervals.current.length > tapWindow) {
          tapIntervals.current.shift();
        }

        const averageInterval = tapIntervals.current.reduce((a, b) => a + b, 0) / tapIntervals.current.length;
        const calculatedBpm = Math.round(60000 / averageInterval);
       
        if (calculatedBpm >= minBpm && calculatedBpm <= maxBpm) {
          setBpm(calculatedBpm);
        }
      }
    }

    lastTapTime.current = now;

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => {
      lastTapTime.current = null;
      tapIntervals.current = []; 
    }, resetDelay);
  }, [minBpm, maxBpm, resetDelay, tapWindow]);

  /**
   * Limpia los timers al desmontar
   */
  const cleanup = useCallback(() => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
  }, []);

  /**
   * Permite desactivar/activar tap tempo manualmente
   */
  const setActive = useCallback((active: boolean) => {
    isActive.current = active;
    if (!active) {
      tapIntervals.current = [];
      lastTapTime.current = null;
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    }
  }, []);

  return {
    bpm,
    setBpm,
    handleTap,
    cleanup,
    setActive,
    isActive: isActive.current
  };
}
