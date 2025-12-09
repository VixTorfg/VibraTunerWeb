import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Metronome from './pages/Metronome'
import Tuner from './pages/Tuner'
import Navigation from './components/Navigation'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/tuner" element={<Tuner />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
