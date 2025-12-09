import { Link } from 'react-router-dom';
import { Music, Clock, Mic2 } from 'lucide-react';

function Home() {
  return (
    <div className="flex-1" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Hero Section */}
      <div className="px-[2rem] py-[4rem] text-center">
        <div className="max-w-[50rem] mx-auto space-y-[1.5rem]">
          <h1 className="text-[3rem] md:text-[4rem] font-bold" style={{ color: 'var(--color-text)' }}>
            Bienvenido a <span style={{ color: 'var(--color-accent)' }}>VibraTuner</span>
          </h1>
          <p className="text-[1.25rem]" style={{ color: 'var(--color-text-secondary)' }}>
            Herramientas esenciales para músicos. Metrónomo preciso y afinador en tiempo real.
          </p>
        </div>
      </div>

      {/* Cards de funcionalidades */}
      <div className="px-[2rem] pb-[4rem] max-w-[70rem] mx-auto">
        <div className="grid md:grid-cols-2 gap-[2rem]">
          
          {/* Card Metrónomo */}
          <Link 
            to="/metronome"
            className="rounded-[1rem] p-[2rem] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            style={{
              backgroundColor: 'var(--color-surface)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-[1rem] mb-[1.5rem]">
              <div 
                className="p-[0.75rem] rounded-[0.75rem]"
                style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
              >
                <Clock className="w-[2rem] h-[2rem]" />
              </div>
              <h2 className="text-[2rem] font-bold" style={{ color: 'var(--color-text)' }}>
                Metrónomo
              </h2>
            </div>
            
            <p className="mb-[1.5rem] text-[1rem]" style={{ color: 'var(--color-text-secondary)' }}>
              Mantén el tempo perfecto con nuestro metrónomo profesional. Incluye patrones flamencos tradicionales y personalización completa.
            </p>

            {/* Preview visual - Mini animación de beats */}
            <div className="flex justify-center gap-[0.5rem] mb-[1.5rem] py-[1rem]">
              {[1, 2, 3, 4].map((beat) => (
                <div
                  key={beat}
                  className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: beat === 1 ? 'var(--color-accent-light)' : 'var(--color-surface-alt)',
                    color: beat === 1 ? 'var(--color-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {beat}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <ul className="space-y-[0.5rem] text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  Patrones flamencos
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  Tap tempo integrado
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  10-300 BPM
                </li>
              </ul>
              
              <button
                className="px-[1.5rem] py-[0.75rem] rounded-[0.5rem] font-[600] transition-all duration-200 hover:scale-[1.05]"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                }}
              >
                Abrir
              </button>
            </div>
          </Link>

          {/* Card Afinador */}
          <Link 
            to="/tuner"
            className="rounded-[1rem] p-[2rem] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            style={{
              backgroundColor: 'var(--color-surface)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-[1rem] mb-[1.5rem]">
              <div 
                className="p-[0.75rem] rounded-[0.75rem]"
                style={{ backgroundColor: '#10b981', color: '#ffffff' }}
              >
                <Mic2 className="w-[2rem] h-[2rem]" />
              </div>
              <h2 className="text-[2rem] font-bold" style={{ color: 'var(--color-text)' }}>
                Afinador
              </h2>
            </div>
            
            <p className="mb-[1.5rem] text-[1rem]" style={{ color: 'var(--color-text-secondary)' }}>
              Afina tu instrumento con precisión usando detección de frecuencia en tiempo real desde tu micrófono.
            </p>

            {/* Preview visual - Indicador de afinación */}
            <div className="mb-[1.5rem] py-[1rem]">
              <div className="relative h-[3rem] rounded-[0.5rem]" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                <div 
                  className="absolute top-[50%] left-[50%] w-[0.25rem] h-[2rem] rounded-full"
                  style={{ 
                    backgroundColor: 'var(--color-accent)',
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
                <div className="absolute inset-[0] bottom-[-5rem] flex items-center justify-center">
                  <span className="text-[1.5rem] font-bold" style={{ color: 'var(--color-text)' }}>
                    A4
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <ul className="space-y-[0.5rem] text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  Detección automática
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  Alta precisión
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <div className="w-[0.25rem] h-[0.25rem] rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  Tiempo real
                </li>
              </ul>
              
              <button
                className="px-[1.5rem] py-[0.75rem] rounded-[0.5rem] font-[600] transition-all duration-200 hover:scale-[1.05]"
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                }}
              >
                Abrir
              </button>
            </div>
          </Link>

        </div>
      </div>

      {/* Sección inferior opcional */}
      <div className="px-[2rem] pb-[4rem] text-center">
        <div className="max-w-[50rem] mx-auto p-[2rem] rounded-[1rem]" style={{ backgroundColor: 'var(--color-surface)' }}>
          <Music className="w-[3rem] h-[3rem] mx-auto mb-[1rem]" style={{ color: 'var(--color-accent)' }} />
          <h3 className="text-[1.5rem] font-bold mb-[0.5rem]" style={{ color: 'var(--color-text)' }}>
            Diseñado para músicos
          </h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            VibraTuner combina simplicidad y potencia para ofrecerte las herramientas que realmente necesitas en tu práctica diaria.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
