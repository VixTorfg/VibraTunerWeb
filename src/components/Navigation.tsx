import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import logoImg from '../assets/vite.svg';

function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottomColor: 'var(--color-accent)',
      }}
      className="border-b-2 p-[0.75rem] md:p-[1rem] md:py-[1.25rem]  top-[0] z-50 "// sticky "
    >
      <div className="mx-auto px-[0.5rem] md:px-[1rem] flex items-center justify-between gap-[0.5rem] md:gap-[2rem]">
        {/* Logo y título */}
        <div className="flex items-center gap-[0.5rem] md:gap-[1rem] shrink-0">
          <img src={logoImg} alt="VibraTuner Logo" className="w-[1.75rem] h-[1.75rem] md:w-[2rem] md:h-[2rem]" />
          <Link to="/" className="hidden sm:flex items-center">
            <span 
              style={{color: 'var(--color-text)'}}
              className="font-black text-[1.1rem] md:text-[1.25rem] transition-all duration-[200] hover:opacity-[0.8]"
            >
              VibraTuner
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center md:justify-end md:pr-[5rem] lg:pr-[10rem]">
          <ul className="flex gap-[0.5rem] md:gap-[1.5rem] list-none">
            <li>
              <Link 
                to="/" 
                style={{
                  color: isActive('/') ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive('/') ? 'var(--color-accent-light)' : 'transparent',
                }}
                className={`px-[0.75rem] md:px-[1rem] py-[0.4rem] md:py-[0.5rem] rounded-[1rem] text-[0.875rem] md:text-[1rem] font-[450] whitespace-nowrap transition-all duration-200 hover:shadow-[0_4px_12px_rgba(56,189,248,0.3)] hover:bg-[rgba(56,189,248,0.2)] ${
                  isActive('/') ? 'shadow-[0_2px_8px_rgba(56,189,248,0.15)], font-[600]' : ''
                }`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="/metronome" 
                style={{
                  color: isActive('/metronome') ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive('/metronome') ? 'var(--color-accent-light)' : 'transparent',
                }}
                className={`px-[0.75rem] md:px-[1rem] py-[0.4rem] md:py-[0.5rem] rounded-[1rem] text-[0.875rem] md:text-[1rem] font-[450] whitespace-nowrap transition-all duration-200 hover:shadow-[0_4px_12px_rgba(56,189,248,0.3)] hover:bg-[rgba(56,189,248,0.2)] ${
                  isActive('/metronome') ? 'shadow-[0_2px_8px_rgba(56,189,248,0.15)], font-[600]' : ''
                }`}
              >
                Metrónomo
              </Link>
            </li>
            <li>
              <Link 
                to="/tuner" 
                style={{
                  color: isActive('/tuner') ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive('/tuner') ? 'var(--color-accent-light)' : 'transparent',
                }}
                className={`px-[0.75rem] md:px-[1rem] py-[0.4rem] md:py-[0.5rem] rounded-[1rem] text-[0.875rem] md:text-[1rem] font-[450] whitespace-nowrap transition-all duration-200 hover:shadow-[0_4px_12px_rgba(56,189,248,0.3)] hover:bg-[rgba(56,189,248,0.2)] ${
                  isActive('/tuner') ? 'shadow-[0_2px_8px_rgba(56,189,248,0.15)], font-[600]' : ''
                }`}
              >
                Afinador
              </Link>
            </li>
          </ul>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex shrink-0">
          <ThemeToggle />
        </div>
      </div>      
    </nav>
  );
}


export default Navigation;
