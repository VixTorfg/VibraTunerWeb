interface PatternConfig {
  name: string;
  beats: number;
  mainPattern: number[];      // Patrón de beats principales (cada beat)
  contraPattern?: number[];   // Patrón de contratiempos (entre beats)
  sounds: Record<number, SoundConfig>;
}

interface SoundConfig {
  freq: string;
  dur: string;
  color?: string;
}

export const CUSTOM_PATTERNS: Record<string, PatternConfig> = {
  alegrías: {
    name: 'Alegrías',
    beats: 12,
    mainPattern: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],  // Solo beats principales
    contraPattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0], // Contratiempos entre beats
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },   // Golpe fuerte (clave)
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },  // Contratiempo
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }   // Silencio
    }
  },
  tangos: {
    name: 'Tangos',
    beats: 4,
    mainPattern: [1, 0, 1, 0],
    contraPattern: [0, 2, 0, 2],
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },
  bulerias: {
    name: 'Bulerías',
    beats: 12,
    mainPattern: [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    contraPattern: [0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

};