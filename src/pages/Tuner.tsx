import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import * as Tone from 'tone';
import { usePitchDetection } from '../hooks/usePitchDetection';

const TUNINGS = {
  standard: { name: 'Estándar (E)', notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
  //dropD: { name: 'D', notes: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
  //halfStep: { name: 'Medio tono abajo', notes: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4'] },
  //openD: { name: 'D abierto', notes: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'] },
  //openG: { name: 'G abierto', notes: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'] },
};

const STRING_POSITIONS = ['6ta', '5ta', '4ta', '3ra', '2da', '1ra'];

const AUDIO_FILES = [
  '6-E2.wav',  // 6ta cuerda
  '5-A2.wav',  // 5ta cuerda
  '4-D3.wav',  // 4ta cuerda
  '3-G3.wav',  // 3ra cuerda
  '2-B3.wav',  // 2da cuerda
  '1-E4.wav',  // 1ra cuerda
];

function Tuner() {
  const [selectedTuning, setSelectedTuning] = useState<keyof typeof TUNINGS>('standard');
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [selectedString, setSelectedString] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const playersRef = useRef<Tone.Player[]>([]);
  const currentTuning = TUNINGS[selectedTuning];

  // Hook de detección de pitch
  const { isListening, result, startListening, stopListening } = usePitchDetection();

  const detectedNote = result?.note || '';
  const cents = result?.cents || 0;
  const frequency = result?.frequency || 0;

  
  useEffect(() => {
    // Crear un player para cada cuerda
    playersRef.current = AUDIO_FILES.map((file) => {
      return new Tone.Player({
        url: `/sounds/${file}`,
        onload: () => console.log(`Cargado: ${file}`),
      }).toDestination();
    });

    return () => {
      playersRef.current.forEach(player => player.dispose());
    };
  }, []);

  const playReferenceSound = async (stringIndex: number) => {
    try {
      
      await Tone.start();
      
      const player = playersRef.current[stringIndex];
      
      if (player && player.loaded) {
        if (isPlaying !== null && playersRef.current[isPlaying]) {
          playersRef.current[isPlaying].stop();
        }
        
        setIsPlaying(stringIndex);
        player.start();
        
        // Resetear el estado después de que termine el audio
        setTimeout(() => {
          setIsPlaying(null);
        }, player.buffer.duration * 1000);
      } else {
        console.warn(`Player ${stringIndex} no está listo`);
      }
    } catch (error) {
      console.error('Error al reproducir audio:', error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Calcular la cuerda más cercana basándose en la frecuencia detectada
  const getClosestString = (): number => {
    if (!frequency || frequency <= 0) return -1;

    const stringFrequencies: { [key: string]: number } = {
      'E2': 82.41, 'A2': 110.00, 'D3': 146.83, 'G3': 196.00, 'B3': 246.94, 'E4': 329.63,
      'D2': 73.42, 'F#3': 185.00, 'A3': 220.00, 'D4': 293.66,
      'Eb2': 77.78, 'Ab2': 103.83, 'Db3': 138.59, 'Gb3': 185.00, 'Bb3': 233.08, 'Eb4': 311.13,
      'F#2': 92.50, 'G2': 98.00,
    };

    let closestIndex = 0;
    let minDiff = Infinity;

    currentTuning.notes.forEach((note, index) => {
      const targetFreq = stringFrequencies[note];
      if (targetFreq) {
        const diff = Math.abs(frequency - targetFreq);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      }
    });

    return minDiff < 50 ? closestIndex : -1;
  };

  const getTargetFrequency = (note: string): number => {
    const frequencies: { [key: string]: number } = {
      'E2': 82.41, 'A2': 110.00, 'D3': 146.83, 'G3': 196.00, 'B3': 246.94, 'E4': 329.63,
      'D2': 73.42, 'F#3': 185.00, 'A3': 220.00, 'D4': 293.66,
      'Eb2': 77.78, 'Ab2': 103.83, 'Db3': 138.59, 'Gb3': 185.00, 'Bb3': 233.08, 'Eb4': 311.13,
      'F#2': 92.50, 'G2': 98.00,
    };
    return frequencies[note] || 0;
  };

  const calculateCentsFromTarget = (detectedFreq: number, targetNote: string): number => {
    const targetFreq = getTargetFrequency(targetNote);
    if (!targetFreq || !detectedFreq) return 0;
    
    const cents = 1200 * Math.log2(detectedFreq / targetFreq);
    return Math.round(cents);
  };

  const closestStringIndex = getClosestString();
  
  const displayCents = mode === 'manual' && frequency > 0 
    ? calculateCentsFromTarget(frequency, currentTuning.notes[selectedString])
    : (closestStringIndex >= 0 && frequency > 0)
      ? calculateCentsFromTarget(frequency, currentTuning.notes[closestStringIndex])
      : cents;

  return (
    <div className="flex-1" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[60rem] mx-auto p-[2rem]">
        
        {/* Header */}
        <div className="text-center mb-[2rem]">
          <h1 className="text-[2.5rem] font-bold mb-[0.5rem]" style={{ color: 'var(--color-text)' }}>
            Afinador de Guitarra
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Afina tu guitarra con precisión profesional
          </p>
        </div>

        {/* Selector de afinación */}
        <div className="mb-[2rem]">
          <label className="block text-sm font-semibold mb-[0.5rem]" style={{ color: 'var(--color-text-muted)' }}>
            Afinación
          </label>
          <select
            value={selectedTuning}
            onChange={(e) => setSelectedTuning(e.target.value as keyof typeof TUNINGS)}
            className="w-full px-[1rem] py-[0.75rem] rounded-[0.5rem] font-[600] transition-all"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            {Object.entries(TUNINGS).map(([key, tuning]) => (
              <option key={key} value={key}>
                {tuning.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de modo */}
        <div className="flex gap-[1rem] mb-[2rem]">
          <button
            onClick={() => setMode('auto')}
            className="flex-1 py-[0.75rem] rounded-[0.5rem] font-[600] transition-all duration-200"
            style={{
              backgroundColor: mode === 'auto' ? 'var(--color-primary)' : 'var(--color-surface)',
              color: mode === 'auto' ? '#ffffff' : 'var(--color-text-secondary)',
              border: mode === 'auto' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            Automático
          </button>
          <button
            onClick={() => setMode('manual')}
            className="flex-1 py-[0.75rem] rounded-[0.5rem] font-[600] transition-all duration-200"
            style={{
              backgroundColor: mode === 'manual' ? 'var(--color-primary)' : 'var(--color-surface)',
              color: mode === 'manual' ? '#ffffff' : 'var(--color-text-secondary)',
              border: mode === 'manual' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            Manual (cuerda por cuerda)
          </button>
        </div>

        {/* Panel principal */}
        <div 
          className="rounded-[1rem] p-[2rem] mb-[2rem]"
          style={{
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {mode === 'auto' ? (
            // Modo automático
            <div className="text-center">
              <div className="mb-[2rem]">
                <div 
                  className="w-[8rem] h-[8rem] mx-auto rounded-full flex items-center justify-center mb-[1rem] transition-all duration-300 cursor-pointer hover:scale-[1.05]"
                  style={{
                    backgroundColor: isListening ? '#10b981' : 'var(--color-surface-alt)',
                    boxShadow: isListening ? '0 0 30px rgba(16, 185, 129, 0.4)' : 'none',
                  }}
                  onClick={toggleListening}
                >
                  {isListening ? (
                    <Mic className="w-[3rem] h-[3rem]" style={{ color: '#ffffff' }} />
                  ) : (
                    <MicOff className="w-[3rem] h-[3rem]" style={{ color: 'var(--color-text-muted)' }} />
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {isListening ? 'Escuchando... toca una cuerda' : 'Click para activar micrófono'}
                </p>
              </div>

              {/* Nota detectada */}
              <div className="mb-[2rem]">
                <div className="text-[4rem] font-bold mb-[0.5rem]" style={{ color: 'var(--color-accent)' }}>
                  {detectedNote || '—'}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {frequency > 0 ? `${frequency.toFixed(1)} Hz` : 'Esperando señal...'}
                </div>
              </div>

              {/* Indicador de afinación */}
              <div className="max-w-[30rem] mx-auto mb-[2rem]">
                <div className="relative h-[4rem] rounded-[0.5rem]" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                  {/* Marcas de referencia */}
                  <div className="absolute inset-[0] flex items-center justify-between px-[1rem]">
                    <span className="text-[1rem]" style={{ color: 'var(--color-text-muted)' }}>-50</span>
                    <span className="text-[1rem] font-bold" style={{ color: 'var(--color-text)' }}>0</span>
                    <span className="text-[1rem]" style={{ color: 'var(--color-text-muted)' }}>+50</span>
                  </div>
                  
                  {/* Indicador central */}
                  <div 
                    className="absolute top-[50%] w-[0.25rem] h-[2.5rem] rounded-full transition-all duration-100"
                    style={{ 
                      backgroundColor: Math.abs(displayCents) < 5 ? '#10b981' : Math.abs(displayCents) < 15 ? '#f59e0b' : '#ef4444',
                      left: `${Math.max(5, Math.min(95, 50 + (displayCents / 50) * 45))}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                </div>
                <div className="mt-[0.5rem] text-sm text-center" style={{ color: 'var(--color-text-secondary)' }}>
                  {displayCents > 0 ? `+${displayCents}` : displayCents} cents
                </div>
              </div>

              {/* Cuerda sugerida */}
              {detectedNote && closestStringIndex >= 0 && (
                <div className="text-center p-[1rem] rounded-[0.5rem]" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                  <p className="text-sm mb-[0.25rem]" style={{ color: 'var(--color-text-muted)' }}>
                    Cuerda detectada:
                  </p>
                  <p className="font-bold" style={{ color: 'var(--color-text)' }}>
                    {STRING_POSITIONS[closestStringIndex]} ({currentTuning.notes[closestStringIndex]})
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Modo manual
            <div>
              <p className="text-center mb-[1.5rem]" style={{ color: 'var(--color-text-secondary)' }}>
                Selecciona una cuerda y escucha el sonido de referencia
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-[1rem]">
                {currentTuning.notes.map((note, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedString(index);
                      playReferenceSound(index);
                    }}
                    className="p-[1.5rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95]"
                    style={{
                      backgroundColor: selectedString === index ? 'var(--color-accent-light)' : 'var(--color-surface-alt)',
                      border: selectedString === index ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      
                    }}
                  >
                    <div className="flex items-center justify-center gap-[0.5rem] mb-[0.5rem]">
                      <Volume2 
                        className={`w-[1.25rem] h-[1.25rem] ${isPlaying === index ? 'animate-pulse' : ''}`}
                        style={{ color: selectedString === index ? 'var(--color-accent)' : 'var(--color-text-muted)' }} 
                      />
                    </div>
                    <div className="text-[1.5rem] font-bold mb-[0.25rem]" style={{ color: selectedString === index ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>
                      {note}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {STRING_POSITIONS[index]}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-[2rem] p-[1.5rem] rounded-[0.5rem]" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                <p className="text-sm mb-[1rem] text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Toca la cuerda seleccionada: <span className="font-bold" style={{ color: 'var(--color-text)' }}>{STRING_POSITIONS[selectedString]} ({currentTuning.notes[selectedString]})</span>
                </p>

                {/* Mostrar nota detectada en modo manual */}
                {detectedNote && (
                  <div className="text-center mb-[1rem]">
                    <div className="text-[2rem] font-bold" style={{ color: 'var(--color-accent)' }}>
                      {detectedNote}
                    </div>
                    <div className="text-xs mb-[0.25rem]" style={{ color: 'var(--color-text-secondary)' }}>
                      {frequency.toFixed(1)} Hz
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Objetivo: {currentTuning.notes[selectedString]} ({getTargetFrequency(currentTuning.notes[selectedString]).toFixed(1)} Hz)
                    </div>
                  </div>
                )}
                
                <div className="relative h-[3rem] rounded-[0.5rem] mb-[0.5rem]" style={{ backgroundColor: 'var(--bg-primary)' }}>
                  <div className="absolute inset-[0] flex items-center justify-between px-[1rem]">
                    <span className="text-[1rem]" style={{ color: 'var(--color-text-muted)' }}>Baja</span>
                    <span className="text-[1rem] font-bold" style={{ color: '#10b981' }}>Afinado</span>
                    <span className="text-[1rem]" style={{ color: 'var(--color-text-muted)' }}>Alta</span>
                  </div>
                  
                  {isListening && frequency > 0 && (
                    <div 
                      className="absolute top-[50%] w-[0.25rem] h-[2rem] rounded-full transition-all duration-100"
                      style={{ 
                        backgroundColor: Math.abs(displayCents) < 5 ? '#10b981' : Math.abs(displayCents) < 15 ? '#f59e0b' : '#ef4444',
                        left: `${Math.max(10, Math.min(90, 50 + (displayCents / 50) * 40))}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    ></div>
                  )}
                </div>

                <div className="text-center text-sm mb-[1rem]" style={{ color: 'var(--color-text-secondary)' }}>
                  {isListening && frequency > 0 ? (
                    <span style={{ color: Math.abs(displayCents) < 5 ? '#10b981' : 'var(--color-text-secondary)' }}>
                      {displayCents > 0 ? `+${displayCents}` : displayCents} cents {Math.abs(displayCents) < 5 && '✅'}
                    </span>
                  ) : (
                    'Esperando señal...'
                  )}
                </div>

                <button
                  onClick={toggleListening}
                  className="w-full py-[0.75rem] rounded-[0.5rem] font-[600] flex items-center justify-center gap-[0.5rem] transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: isListening ? '#ef4444' : '#10b981',
                    color: '#ffffff',
                  }}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-[1.25rem] h-[1.25rem]" />
                      Detener
                    </>
                  ) : (
                    <>
                      <Mic className="w-[1.25rem] h-[1.25rem]" />
                      Iniciar detección
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Información adicional 
        <div className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <p>💡 Asegúrate de permitir el acceso al micrófono cuando el navegador lo solicite</p>
        </div>*/}
      </div>
    </div>
  );
}

export default Tuner;
