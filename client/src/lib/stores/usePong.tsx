import { create } from 'zustand';

interface PongState {
  // Game state
  gameState: 'menu' | 'playing' | 'gameOver';
  
  // Player paddle
  playerY: number;
  
  // AI paddle
  aiY: number;
  
  // Ball
  ballX: number;
  ballY: number;
  ballSpeedX: number;
  ballSpeedY: number;
  
  // Scores
  playerScore: number;
  aiScore: number;
  
  // Actions
  setGameState: (state: 'menu' | 'playing' | 'gameOver') => void;
  updatePlayerY: (y: number) => void;
  updateAiY: (y: number) => void;
  updateBall: (x: number, y: number) => void;
  setBallSpeed: (speedX: number, speedY: number) => void;
  incrementPlayerScore: () => void;
  incrementAiScore: () => void;
  resetGame: () => void;
}

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const INITIAL_BALL_SPEED = 4;

export const usePong = create<PongState>((set) => ({
  // Initial state
  gameState: 'menu',
  playerY: CANVAS_HEIGHT / 2 - 40, // Center the paddle
  aiY: CANVAS_HEIGHT / 2 - 40,
  ballX: CANVAS_WIDTH / 2,
  ballY: CANVAS_HEIGHT / 2,
  ballSpeedX: INITIAL_BALL_SPEED,
  ballSpeedY: INITIAL_BALL_SPEED,
  playerScore: 0,
  aiScore: 0,
  
  // Actions
  setGameState: (gameState) => set({ gameState }),
  
  updatePlayerY: (playerY) => set({ playerY }),
  
  updateAiY: (aiY) => set({ aiY }),
  
  updateBall: (ballX, ballY) => set({ ballX, ballY }),
  
  setBallSpeed: (ballSpeedX, ballSpeedY) => set({ ballSpeedX, ballSpeedY }),
  
  incrementPlayerScore: () => set((state) => ({ 
    playerScore: state.playerScore + 1 
  })),
  
  incrementAiScore: () => set((state) => ({ 
    aiScore: state.aiScore + 1 
  })),
  
  resetGame: () => set({
    gameState: 'menu',
    playerY: CANVAS_HEIGHT / 2 - 40,
    aiY: CANVAS_HEIGHT / 2 - 40,
    ballX: CANVAS_WIDTH / 2,
    ballY: CANVAS_HEIGHT / 2,
    ballSpeedX: INITIAL_BALL_SPEED,
    ballSpeedY: INITIAL_BALL_SPEED,
    playerScore: 0,
    aiScore: 0
  })
}));
