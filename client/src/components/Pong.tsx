import React, { useRef, useEffect } from 'react';
import { usePong } from '../lib/stores/usePong';
import { useKeyboard } from '../hooks/useKeyboard';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const PADDLE_SPEED = 6;
const INITIAL_BALL_SPEED = 4;

const Pong: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const {
    playerY,
    aiY,
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY,
    playerScore,
    aiScore,
    gameState,
    updatePlayerY,
    updateAiY,
    updateBall,
    incrementPlayerScore,
    incrementAiScore,
    resetGame,
    setGameState,
    setBallSpeed
  } = usePong();

  const { keys } = useKeyboard();

  // Initialize audio
  useEffect(() => {
    const initAudio = async () => {
      try {
        console.log('Audio files loaded');
      } catch (error) {
        console.log('Audio loading failed:', error);
      }
    };
    
    initAudio();
  }, []);

  // Handle game state changes
  useEffect(() => {
    if (keys.Space && gameState === 'menu') {
      setGameState('playing');
      console.log('Game started');
    }
    if (keys.KeyR && gameState === 'gameOver') {
      resetGame();
      console.log('Game reset');
    }
  }, [keys.Space, keys.KeyR, gameState, setGameState, resetGame]);

  // Check for game over
  useEffect(() => {
    if (playerScore >= 10) {
      setGameState('gameOver');
      try {
        const successSound = new Audio('/sounds/success.mp3');
        successSound.play().catch(e => console.log('Success sound failed:', e));
      } catch (e) {
        console.log('Success sound error:', e);
      }
      alert("I'll be back!");
    } else if (aiScore >= 10) {
      setGameState('gameOver');
      alert("Hasta la vista, Baby!");
    }
  }, [playerScore, aiScore, setGameState]);

  // Main game loop
  useEffect(() => {
    const gameLoop = () => {
      // Handle player movement
      if (gameState === 'playing') {
        const moveSpeed = PADDLE_SPEED;
        
        if (keys.ArrowUp || keys.KeyW) {
          updatePlayerY(Math.max(0, playerY - moveSpeed));
        }
        if (keys.ArrowDown || keys.KeyS) {
          updatePlayerY(Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, playerY + moveSpeed));
        }

        // AI logic
        const aiCenter = aiY + PADDLE_HEIGHT / 2;
        const ballCenter = ballY + BALL_SIZE / 2;
        const diff = ballCenter - aiCenter;
        
        if (Math.abs(diff) > 5) {
          const aiSpeed = PADDLE_SPEED * 0.8;
          if (diff > 0) {
            updateAiY(Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, aiY + aiSpeed));
          } else {
            updateAiY(Math.max(0, aiY - aiSpeed));
          }
        }

        // Ball physics
        let newX = ballX + ballSpeedX;
        let newY = ballY + ballSpeedY;
        let newSpeedX = ballSpeedX;
        let newSpeedY = ballSpeedY;

        // Ball collision with top and bottom walls
        if (newY <= 0 || newY >= CANVAS_HEIGHT - BALL_SIZE) {
          newSpeedY = -newSpeedY;
          newY = newY <= 0 ? 0 : CANVAS_HEIGHT - BALL_SIZE;
        }

        // Ball collision with player paddle (left side)
        if (newX <= PADDLE_WIDTH && 
            newX >= 0 && 
            newY + BALL_SIZE >= playerY && 
            newY <= playerY + PADDLE_HEIGHT) {
          newSpeedX = -newSpeedX;
          newX = PADDLE_WIDTH;
          
          const hitPos = (newY + BALL_SIZE / 2 - playerY) / PADDLE_HEIGHT;
          newSpeedY += (hitPos - 0.5) * 2;
          
          const speedMultiplier = 1.05;
          newSpeedX *= speedMultiplier;
          newSpeedY *= speedMultiplier;
          
          try {
            const hitSound = new Audio('/sounds/hit.mp3');
            hitSound.volume = 0.3;
            hitSound.play().catch(e => console.log('Hit sound failed:', e));
          } catch (e) {
            console.log('Hit sound error:', e);
          }
        }

        // Ball collision with AI paddle (right side)
        if (newX + BALL_SIZE >= CANVAS_WIDTH - PADDLE_WIDTH && 
            newX + BALL_SIZE <= CANVAS_WIDTH && 
            newY + BALL_SIZE >= aiY && 
            newY <= aiY + PADDLE_HEIGHT) {
          newSpeedX = -newSpeedX;
          newX = CANVAS_WIDTH - PADDLE_WIDTH - BALL_SIZE;
          
          const hitPos = (newY + BALL_SIZE / 2 - aiY) / PADDLE_HEIGHT;
          newSpeedY += (hitPos - 0.5) * 2;
          
          const speedMultiplier = 1.05;
          newSpeedX *= speedMultiplier;
          newSpeedY *= speedMultiplier;
          
          try {
            const hitSound = new Audio('/sounds/hit.mp3');
            hitSound.volume = 0.3;
            hitSound.play().catch(e => console.log('Hit sound failed:', e));
          } catch (e) {
            console.log('Hit sound error:', e);
          }
        }

        // Ball goes off left side (AI scores)
        if (newX < 0) {
          incrementAiScore();
          newX = CANVAS_WIDTH / 2;
          newY = CANVAS_HEIGHT / 2;
          newSpeedX = INITIAL_BALL_SPEED;
          newSpeedY = INITIAL_BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        }

        // Ball goes off right side (Player scores)
        if (newX > CANVAS_WIDTH) {
          incrementPlayerScore();
          newX = CANVAS_WIDTH / 2;
          newY = CANVAS_HEIGHT / 2;
          newSpeedX = -INITIAL_BALL_SPEED;
          newSpeedY = INITIAL_BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        }

        updateBall(newX, newY);
        setBallSpeed(newSpeedX, newSpeedY);
      }
      
      // Render
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw center line
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw paddles
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(0, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillRect(CANVAS_WIDTH - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, keys, playerY, aiY, ballX, ballY, ballSpeedX, ballSpeedY, updatePlayerY, updateAiY, updateBall, setBallSpeed, incrementPlayerScore, incrementAiScore]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="score-display">
        Player: {playerScore} | AI: {aiScore}
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          border: '2px solid #00ff00',
          backgroundColor: '#000000'
        }}
      />
      
      <div className="controls">
        {gameState === 'menu' && (
          <div>
            <div>Press SPACE to start</div>
            <div>Use W/S or Arrow Keys to move paddle</div>
          </div>
        )}
        {gameState === 'playing' && (
          <div>W/S or ↑/↓ to move | First to 10 wins!</div>
        )}
        {gameState === 'gameOver' && (
          <div>Press R to restart</div>
        )}
      </div>
    </div>
  );
};

export default Pong;