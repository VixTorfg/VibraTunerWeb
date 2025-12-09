import { useState, useEffect } from 'react';
import { useMetronome } from '../hooks/useMetronome';
import { useTapTempo } from '../hooks/useTapTempo';
import MetronomePattern from '../components/MetronomePattern';
import { Plus, Minus, Play, Pause, Drum, ChevronRight, ChevronLeft } from 'lucide-react';
import * as Tone from 'tone';


function Metronome() {
  // Estados
  const DEFAULT_BPM = 100;
  const MIN_BPM = 10;
  const MAX_BPM = 300;
  const DEFAULT_PATTERN = '4';

  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [isPlaying, setIsPlaying] = useState(false);
  const [patternKey, setPatternKey] = useState(DEFAULT_PATTERN);
  const [currentBeatStartIndex, setCurrentBeatStartIndex] = useState(0);
  const [currentBeatEndIndex, setCurrentBeatEndIndex] = useState(3);

  // Hook del metrónomo
  const { currentBeat, pattern } = useMetronome({ patternKey, bpm, isPlaying });
  const beatArray = [0,1,2,3,4,5,6,7,8,9,10,11,12];
  const [beatView, setBeatView] = useState(beatArray.slice(currentBeatStartIndex, currentBeatEndIndex));
  const [beatsToShow, setBeatsToShow] = useState(3);

  useEffect(() => {
    const updateBeatsToShow = () => {
      if (window.innerWidth >= 1024) {
        setBeatsToShow(5);
      } else if (window.innerWidth >= 640) {
        setBeatsToShow(4);
      } else {
        setBeatsToShow(3);
      }
    };
    
    updateBeatsToShow();
    window.addEventListener('resize', updateBeatsToShow);
    return () => window.removeEventListener('resize', updateBeatsToShow);
  }, []);

  useEffect(() => {
    setCurrentBeatEndIndex(currentBeatStartIndex + beatsToShow);
    setBeatView(beatArray.slice(currentBeatStartIndex, currentBeatStartIndex + beatsToShow));
  }, [beatsToShow, currentBeatStartIndex]);
  

  // Hook de tap tempo 
  const { bpm: tapBpm, setBpm: setTapBpm, handleTap, cleanup } = useTapTempo({
    minBpm: MIN_BPM,
    maxBpm: MAX_BPM,
    resetDelay: 2000
  });

  useEffect(() => {
    setBpm(tapBpm);
  }, [tapBpm]);

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    setTapBpm(newBpm);
  };

  const AddBpm = () => {
    if(bpm >= MAX_BPM) return;
    setBpm(bpm + 1);
    setTapBpm(bpm + 1);
  }

  const SubstractBpm = () => {
    if(bpm <= MIN_BPM) return;
    setBpm(bpm - 1);
    setTapBpm(bpm - 1);
  }

  const SetBpm = (value: number) => {
    if(value < MIN_BPM || value > MAX_BPM) return;
    setBpm(value);
    setTapBpm(value);
  }

  const shiftPatternLeft = () => {
    const newStart = currentBeatStartIndex - 1;
    setCurrentBeatStartIndex(newStart);
    setCurrentBeatEndIndex(newStart + beatsToShow);
    setBeatView(beatArray.slice(newStart, newStart + beatsToShow));
  }

  const shiftPatternRight = () => {
    const newStart = currentBeatStartIndex + 1;
    setCurrentBeatStartIndex(newStart);
    setCurrentBeatEndIndex(newStart + beatsToShow);
    setBeatView(beatArray.slice(newStart, newStart + beatsToShow));
  }

  const playDrumSound = () => {
    Tone.start(); 
    
    const player = new Tone.Player({
      url: '/sounds/mixkit-hand-tribal-drum-562.wav',
      onload: () => {
        player.start();
      }
    }).toDestination();
  }

  const handleTapWithSound = () => {
    playDrumSound();
    handleTap();
  }

  return (
    <div className="flex-1"
      style={{backgroundColor: "var(--bg-primary)"}}>
      
      <div className='max-h-4/5 max-w-4/5 p-[2rem] rounded-[1rem] mx-auto mt-[2rem]'
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}>
        
          
          {/* Visualización de beats */}

          <MetronomePattern beats={pattern?.beats || 4} currentBeat={currentBeat} />
          
          <div className="flex flex-row mx-auto justify-center items-center gap-[2rem] my-[2rem] px-[2rem]">
          
          {/* Espaciador izquierdo para equilibrio visual */}
          <div className="w-[3rem]"></div>
          
          {/* Control BPM central */}
            <div className="text-center flex-1 max-w-[6rem]">
              <div className="text-[2rem] max-w-[6rem] font-bold text-(--color-accent) tabular-nums">
                {bpm}
              </div>
              <p className="text-(--color-text-muted) uppercase tracking-wider mt-2">BPM</p>
            </div>

            {/* Tap Tempo */}
              <button 
                onClick={handleTapWithSound}
                className="p-[0.8rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.15] active:scale-[0.9]"
                style={{
                  backgroundColor: 'var(--color-surface-alt)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Drum className="w-[1.5rem] h-[1.5rem]" />
              </button>
            </div>
            
            

          {/* Slider BPM */}
          <div className="flex items-center justify-center gap-[2rem]">

          <button 
              onClick={SubstractBpm}
              className="p-[0.5rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.15] active:scale-[0.9]"
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Minus className="w-[1.5rem] h-[1.5rem]" />
            </button>

            <input 
              type="range" 
              min={MIN_BPM} 
              max={MAX_BPM} 
              value={bpm} 
              onChange={(e) => handleBpmChange(Number(e.target.value))}
              className="w-2/3 accent-var(--color-accent)"
            />
            
        <button 
              onClick={AddBpm}
              className="p-[0.5rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.15] active:scale-[0.9]"
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Plus className="w-[1.5rem] h-[1.5rem]" />
            </button>

          </div>

          {/* Botón Play/Pause */}
          <div className='flex-1 mx-auto'>        
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                backgroundColor: isPlaying ? '#ef4444' : 'var(--color-primary)',
                boxShadow: isPlaying 
                  ? '0 8px 24px rgba(239, 68, 68, 0.2)' 
                  : '0 8px 24px rgba(59, 163, 255, 0.2)',
              }}
              className="flex mt-[2rem] p-[1.25rem] rounded-full mx-auto justify-center items-center transition-all duration-300 hover:scale-[1.1] active:scale-[0.95] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
            >
              {isPlaying ? (
                <Pause 
                  className="size-[2rem]" 
                  style={{ color: '#ffffff' }}
                  strokeWidth={2.5}
                />
              ) : (
                <Play 
                  className="size-[2rem] ml-[0.2rem]" 
                  style={{ color: '#ffffff' }}
                  strokeWidth={2.5}
                  fill="currentColor"
                />
              )}
            </button>
          </div>
            
          {/* Control de patron básico */}
          <div className='flex flex-row justify-center gap-[1rem] my-[3rem] items-center'>
            <button 
              onClick={shiftPatternLeft}
              disabled={currentBeatStartIndex === 0}
              className="mr-[0.5rem] sm:mr-[1rem] md:mr-[2rem] p-[0.5rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.15] active:scale-[0.9] disabled:opacity-[0.3] disabled:cursor-not-allowed disabled:hover:scale-[1]"
              style={{
                backgroundColor: currentBeatStartIndex === 0 ? 'transparent' : 'var(--color-surface-alt)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <ChevronLeft className="w-[1.5rem] h-[1.5rem]" />
            </button>

            {beatView.map((beat) => (
          <button
            onClick={() => {setPatternKey(beat.toString())}}
            key={beat}
            className={`w-[2.5rem] h-[2.5rem] sm:w-[3rem] sm:h-[3rem] lg:w-[3.5rem] lg:h-[3.5rem] aspect-square rounded-full justify-center items-center flex font-[600] text-[0.9rem] sm:text-[1rem] transition-all duration-200 hover:scale-[1.1] active:scale-[0.95] shrink-0 ${
              patternKey === beat.toString() ? 'shadow-[0_4px_12px_rgba(56,189,248,0.2)]' : ''
            }`}
            style={{
              backgroundColor: patternKey === beat.toString() ? 'var(--color-accent-light)' : 'var(--bg-primary)',
              color: patternKey === beat.toString() ? 'var(--color-text)' : 'var(--color-text-secondary)'
            }}
          >
          {beat}
          </button>
        ))}
          
            <button 
              onClick={shiftPatternRight}
              disabled={currentBeatEndIndex >= beatArray.length}
              className="ml-[0.5rem] sm:ml-[1rem] md:ml-[2rem] p-[0.5rem] rounded-[0.5rem] transition-all duration-200 hover:scale-[1.15] active:scale-[0.9] disabled:opacity-[0.3] disabled:cursor-not-allowed disabled:hover:scale-[1]"
              style={{
                backgroundColor: currentBeatEndIndex >= beatArray.length ? 'transparent' : 'var(--color-surface-alt)',
                color: 'var(--color-text-secondary)',
              }}
              >
              <ChevronRight className="w-[1.5rem] h-[1.5rem]" />
            </button>
            
          </div>


            {/* Patrones personalizados */}
            <div className="mt-[2rem] pt-[2rem] border-t-2" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-[1rem]">
                <label className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                  Patrones Personalizados
                </label>
                <button
                  onClick={() => {
                    // TODO: Abrir modal para crear patrón personalizado
                    console.log('Crear nuevo patrón personalizado');
                  }}
                  className="px-[1rem] py-[0.5rem] rounded-[0.5rem] text-sm font-[600] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] flex items-center gap-[0.5rem]"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    boxShadow: '0 2px 8px rgba(59, 163, 255, 0.3)',
                  }}
                >
                  <Plus className="w-[1rem] h-[1rem]" />
                  Nuevo
                </button>
              </div>

              {/* Lista desplegable de patrones personalizados */}
              <div className="space-y-[0.5rem]">
                {/* Placeholder - TODO: mapear patrones personalizados del estado */}
                <div className="text-center py-[2rem] rounded-[0.5rem]" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    No hay patrones personalizados aún
                  </p>
                  <p className="text-xs mt-[0.5rem]" style={{ color: 'var(--color-text-muted)' }}>
                    Crea tu primer patrón con el botón "Nuevo"
                  </p>
                </div>
                
                {/* Ejemplo de cómo se verían los patrones personalizados 
                <button
                  className="w-full px-[1rem] py-[0.75rem] rounded-[0.5rem] flex items-center justify-between transition-all duration-[200ms] hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span className="font-[500]" style={{ color: 'var(--color-text)' }}>
                    Mi Patrón 1
                  </span>
                  <div className="flex gap-[0.5rem]">
                    <button className="p-[0.25rem] hover:opacity-[0.7]">Editar</button>
                    <button className="p-[0.25rem] hover:opacity-[0.7]">Eliminar</button>
                  </div>
                </button>
                */}
              </div>
            </div>
            
        
      
      </div>
    </div>
  );
}

export default Metronome;
