# Conway's Game of Life

A game written in JavaScript. Play it at: https://cravvley.github.io/Conways-game-of-life/

## How to Play

### Starting the Game

1. **Map dimensions** — enter a number between 3 and 65 (e.g. 20 for a 20×20 grid).
2. **Random map fill** — check this if you want a random arrangement of live cells at the start.
3. Click **Start game**.

### Controls During the Game

| Button | Action |
|--------|--------|
| **Next move** | Advances one or more generations (depending on the setting below). |
| **Start auto game** | Runs the simulation automatically (1 generation per second). |
| **Stop auto game** | Stops the automatic simulation. |
| **Reset game** | Ends the game and returns to the start menu. |

**How many moves at once** — how many generations to advance per click of "Next move" (default: 1).

### Editing the Board

Click a cell to **bring it to life** or **kill it**. You can change the layout of cells at any time while paused (when auto game is stopped).

### Game Rules (Conway)

- **Dead cell** with exactly 3 neighbors → becomes alive.
- **Live cell** with 2 or 3 neighbors → stays alive.
- In any other case → the cell dies (or stays dead).

Each cell has 8 neighbors (horizontal, vertical, and diagonal).
