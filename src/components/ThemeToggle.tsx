import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <label className="switch">
      <input type="checkbox" checked={isLight} onChange={toggleTheme} />
      <span className="slider">
        <div className="star star_1"></div>
        <div className="star star_2"></div>
        <div className="star star_3"></div>
        <svg className="cloud" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 20 Q60 20 65 25 Q70 30 70 40 Q70 50 65 55 Q60 60 50 60 Q35 60 30 55 Q25 50 25 40 Q25 30 30 25 Q40 20 50 20" fill="rgba(200, 200, 200, 0.3)"/>
        </svg>
      </span>
    </label>
  );
}

