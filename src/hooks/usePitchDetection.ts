import { useEffect, useRef, useState } from 'react';

export interface PitchDetectionResult {
  frequency: number;
  note: string;
  cents: number;
  clarity: number;
}

export function usePitchDetection() {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<PitchDetectionResult | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bufferRef = useRef<Float32Array>(new Float32Array(0));
  const lastValidResultRef = useRef<PitchDetectionResult | null>(null);
  const noSignalCountRef = useRef<number>(0);

  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i];
    }
    const offset = sum / buffer.length;
    
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] -= offset;
    }

    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    if (rms < 0.0005) {
      return -1;
    }

    let maxCorrelation = 0;
    let bestOffset = -1;
    
    const minOffset = Math.floor(sampleRate / 1000);
    const maxOffset = Math.floor(sampleRate / 80);

    for (let offset = minOffset; offset < maxOffset; offset++) {
      let correlation = 0;
      for (let i = 0; i < buffer.length - offset; i++) {
        correlation += buffer[i] * buffer[i + offset];
      }
      
      if (correlation > maxCorrelation) {
        maxCorrelation = correlation;
        bestOffset = offset;
      }
    }

    if (bestOffset === -1) {
      return -1;
    }

    const frequency = sampleRate / bestOffset;
    return frequency;
  };

  const frequencyToNote = (frequency: number): { note: string; cents: number } => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const roundedNote = Math.round(noteNum);
    const cents = Math.floor((noteNum - roundedNote) * 100);
    
    const octave = Math.floor((roundedNote + 57) / 12);
    const noteIndex = (roundedNote + 57) % 12;
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteName = noteNames[noteIndex];
    
    return {
      note: `${noteName}${octave}`,
      cents: cents,
    };
  };

  const detectPitch = () => {
    if (!analyserRef.current || bufferRef.current.length === 0) return;

    const buffer = bufferRef.current;

    const bufferCopy = new Float32Array(buffer);
    analyserRef.current.getFloatTimeDomainData(bufferCopy);
    
    const frequency = autoCorrelate(bufferCopy, audioContextRef.current!.sampleRate);

    if (frequency > 0) {
      const { note, cents } = frequencyToNote(frequency);
      const newResult = {
        frequency,
        note,
        cents,
        clarity: 1.0,
      };
      
      console.log('PITCH:', note, frequency.toFixed(1) + 'Hz', cents > 0 ? `+${cents}` : cents);
      
      lastValidResultRef.current = newResult;
      noSignalCountRef.current = 0;
      setResult(newResult);
    } else {
      noSignalCountRef.current++;
      
      if (noSignalCountRef.current > 100) {
        setResult(null);
        lastValidResultRef.current = null;
      } else if (lastValidResultRef.current) {
        setResult(lastValidResultRef.current);
      }
    }

    animationFrameRef.current = requestAnimationFrame(detectPitch);
  };

  const startListening = async () => {
    try {
      console.log('Solicitando acceso al micrófono');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        } 
      });

      console.log('Micrófono conectado');
      micStreamRef.current = stream;
      
      console.log('Creando AudioContext');
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      console.log('Configurando analyser');
      analyserRef.current.fftSize = 4096;
      analyserRef.current.smoothingTimeConstant = 0.3;
      analyserRef.current.minDecibels = -90;
      analyserRef.current.maxDecibels = -10;
      
      const bufferLength = analyserRef.current.fftSize;
      bufferRef.current = new Float32Array(bufferLength);

      console.log('Configuración:', {
        sampleRate: `${audioContextRef.current.sampleRate} Hz`,
        bufferSize: bufferLength,
        rangoFrequencias: '80-1000 Hz'
      });

      console.log('Conectando source');
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      console.log('Iniciando detección');
      setIsListening(true);
      detectPitch();
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
      alert('No se pudo acceder al micrófono. Asegúrate de dar permisos.');
    }
  };

  const stopListening = () => {
    console.log('Deteniendo detección');
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    audioContextRef.current = null;
    analyserRef.current = null;
    micStreamRef.current = null;
    bufferRef.current = new Float32Array(0);
    lastValidResultRef.current = null;
    noSignalCountRef.current = 0;
    
    setIsListening(false);
    setResult(null);
    
    console.log('Detección detenida');
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return {
    isListening,
    result,
    startListening,
    stopListening,
  };
}
