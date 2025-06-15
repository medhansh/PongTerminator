# Pong Clone Game

A classic Pong game built with React, TypeScript, and HTML5 Canvas featuring AI opponent, retro green-on-black styling, and Terminator-themed victory messages.

## Features

- **Classic Pong Gameplay**: Player vs AI with realistic ball physics
- **Retro Styling**: Black background with bright green elements
- **Responsive Controls**: Keyboard controls with W/S or Arrow keys
- **AI Opponent**: Intelligent AI that follows the ball
- **Score Tracking**: First to 10 points wins
- **Sound Effects**: Hit sounds and victory audio
- **Terminator References**: Victory messages with iconic quotes

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone or download the project** to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To start the application in development mode:

```bash
npm run dev
```

This will:
- Start the Express server on port 5000
- Enable hot module replacement for instant updates
- Serve both the API and client application
- Open the game at `http://localhost:5000`

### Production Mode

To build and run the application in production:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Game Controls

### Menu Screen
- **SPACE**: Start the game
- **R**: Restart (when game is over)

### During Gameplay
- **W** or **↑ (Arrow Up)**: Move paddle up
- **S** or **↓ (Arrow Down)**: Move paddle down

## Game Rules

1. Use your paddle (left side) to hit the ball back to the AI opponent
2. The AI controls the right paddle automatically
3. Ball speed increases slightly with each paddle hit
4. First player to reach **10 points** wins
5. Points are scored when the ball passes the opponent's paddle

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── Pong.tsx   # Main game component
│   │   ├── lib/
│   │   │   └── stores/    # Zustand state management
│   │   └── hooks/         # Custom React hooks
├── server/                 # Backend Express server
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   └── vite.ts           # Vite development setup
├── shared/                # Shared TypeScript types
└── package.json          # Project dependencies and scripts
```

## Technology Stack

- **Frontend**: React 18, TypeScript, HTML5 Canvas
- **Backend**: Express.js, Node.js
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: Inline styles with retro theme
- **Audio**: HTML5 Audio API

## Game Features in Detail

### Physics Engine
- Realistic ball movement with velocity and collision detection
- Paddle collision affects ball angle based on hit position
- Wall bouncing with proper reflection physics
- Speed increase mechanism for progressive difficulty

### AI Behavior
- AI paddle follows ball position with slight delay
- Reduced speed compared to player for fair gameplay
- Smart positioning to center of paddle relative to ball

### Visual Design
- Classic arcade aesthetic with green-on-black color scheme
- Dashed center line dividing the court
- Real-time score display
- Clear control instructions

## Troubleshooting

### Port Already in Use
If you see "EADDRINUSE" error:
```bash
# Kill any process using port 5000
pkill -f "tsx server/index.ts"
# Then restart
npm run dev
```

### Canvas Not Visible
- Ensure your browser supports HTML5 Canvas
- Check browser console for JavaScript errors
- Try refreshing the page

### Controls Not Working
- Make sure the game window has focus (click on it)
- Verify keyboard is working with other applications
- Check browser console for error messages

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - Type check with TypeScript

### Adding Features

The game is built with a modular architecture:
- Game state is managed in `client/src/lib/stores/usePong.tsx`
- Game logic and rendering in `client/src/components/Pong.tsx`
- Keyboard input handled by `client/src/hooks/useKeyboard.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by the original Pong arcade game by Atari (1972)
- Terminator movie quotes for victory messages
- Built with modern web technologies for nostalgic gameplay