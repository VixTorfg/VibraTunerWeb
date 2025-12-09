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

export const PATTERNS: Record<string, PatternConfig> = {
  0: {
    name: '0',
    beats: 1,
    mainPattern: [2],
    contraPattern: [0], 
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  1: {
    name: '1',
    beats: 1,
    mainPattern: [1],
    contraPattern: [0],
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  2: {
    name: '2',
    beats: 2,
    mainPattern: [1, 2],
    contraPattern: [0, 0],
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  3: {
    name: '3',
    beats: 3,
    mainPattern: [1, 2, 2],
    contraPattern: [0, 0, 0],
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  4: {
    name: '4',
    beats: 4,
    mainPattern: [1, 2, 2, 2],
    contraPattern: [0, 0, 0, 0], 
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  5: {
    name: '5',
    beats: 5,
    mainPattern: [1, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0],  
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  6: {
    name: '6',
    beats: 6,
    mainPattern: [1, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0], 
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  7: {
    name: '7',
    beats: 7,
    mainPattern: [1, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0], 
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  8: {
    name: '8',
    beats: 8,
    mainPattern: [1, 2, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0, 0], 
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  9 : {
    name: '9',
    beats: 9,
    mainPattern: [1, 2, 2, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0, 0, 0],  
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  10: {
    name: '10',
    beats: 10,
    mainPattern: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  11: {
    name: '11',
    beats: 11,
    mainPattern: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },

  12: {
    name: '12',
    beats: 12,
    mainPattern: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    contraPattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
    sounds: {
      1: { freq: '800', dur: '8n', color: '#00d4ff' },
      2: { freq: '600', dur: '16n', color: '#ff6b9d' },
      0: { freq: '400', dur: '16n', color: '#a0a0a0' }
    }
  },
};