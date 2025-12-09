interface MetronomePatternProps {
  beats: number;
  currentBeat: number;
}

function MetronomePattern({ beats, currentBeat }: MetronomePatternProps) {
  // Crea un array de beats [0, 1, 2, 3, ...]
  const beatArray = Array.from({ length: beats }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      {/* Indicador central del beat actual */}
      <div className="text-[3rem] font-bold min-h-[4rem] flex items-center justify-center" 
           style={{ color: 'var(--color-accent)' }}>
        {currentBeat + 1}
      </div>

      {/* Círculos de beats */}
      <div className="flex justify-center items-center gap-[0.75rem]">
        {beatArray.map((beat) => (
          <div
            key={beat}
            className={`w-[1.25rem] h-[1.25rem] rounded-full transition-all duration-100 ease-out ${
              beat === currentBeat ? 'scale-[1.15] animate-vibrate' : 'scale-[1]'
            }`}
            style={{
              backgroundColor: beat === currentBeat ? 'var(--color-accent)' : 'var(--bg-primary)',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes vibrate {
          0%, 100% { transform: scale(1.15) translateX(0); }
          25% { transform: scale(1.15) translateX(-2px); }
          75% { transform: scale(1.15) translateX(2px); }
        }
        .animate-vibrate {
          animation: vibrate 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default MetronomePattern;
