export interface GameState {
  maze: number[][]
  playerPos: [number, number]
  exitPos: [number, number]
  zombies: [number, number][]
}

// Generate random maze with N zombies
export function generateMaze(width: number, height: number, zombieCount = 6): GameState {
  const maze = Array(height)
    .fill(null)
    .map(() => Array(width).fill(0))

  // Add random walls
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (Math.random() < 0.2 && !(i < 2 && j < 2) && !(i > height - 3 && j > width - 3)) {
        maze[i][j] = 1
      }
    }
  }

  // Clear start and exit areas
  maze[0][0] = 0
  maze[0][1] = 0
  maze[1][0] = 0
  maze[height - 1][width - 1] = 0
  maze[height - 2][width - 1] = 0
  maze[height - 1][width - 2] = 0

  // Generate zombies
  const getRandomOpenPos = (): [number, number] => {
    let pos: [number, number]
    do {
      pos = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)]
    } while (maze[pos[0]][pos[1]] === 1 || (pos[0] < 3 && pos[1] < 3))
    return pos
  }

  const zombies: [number, number][] = []
  while (zombies.length < zombieCount) {
    zombies.push(getRandomOpenPos())
  }

  return {
    maze,
    playerPos: [0, 0],
    exitPos: [height - 1, width - 1],
    zombies,
  }
}

// Player movement
export function movePlayer(state: GameState, direction: "up" | "down" | "left" | "right"): GameState {
  const [row, col] = state.playerPos
  let newRow = row
  let newCol = col

  if (direction === "up") newRow = Math.max(0, row - 1)
  if (direction === "down") newRow = Math.min(state.maze.length - 1, row + 1)
  if (direction === "left") newCol = Math.max(0, col - 1)
  if (direction === "right") newCol = Math.min(state.maze[0].length - 1, col + 1)

  if (state.maze[newRow][newCol] === 1) return state

  return { ...state, playerPos: [newRow, newCol] }
}

// Fast Zombie AI - moves 2 steps toward player per tick
export function updateZombiesFast(state: GameState): GameState {
  const newZombies = state.zombies.map(([zRow, zCol]) => {
    const [pRow, pCol] = state.playerPos
    let newRow = zRow
    let newCol = zCol

    for (let step = 0; step < 2; step++) {
      const dRow = pRow - newRow
      const dCol = pCol - newCol

      if (Math.abs(dRow) > Math.abs(dCol)) {
        const nextRow = newRow + (dRow > 0 ? 1 : -1)
        if (state.maze[nextRow][newCol] === 0) newRow = nextRow
      } else {
        const nextCol = newCol + (dCol > 0 ? 1 : -1)
        if (state.maze[newRow][nextCol] === 0) newCol = nextCol
      }
    }

    return [newRow, newCol] as [number, number]
  })

  return { ...state, zombies: newZombies }
}

// Check if player is caught
export function isPlayerCaught(state: GameState): boolean {
  return state.zombies.some(([zRow, zCol]) => zRow === state.playerPos[0] && zCol === state.playerPos[1])
}

// Visible tiles (fog)
export function getVisibleTiles(state: GameState): Set<string> {
  const visible = new Set<string>()
  const [pRow, pCol] = state.playerPos
  const radius = 3

  for (let r = Math.max(0, pRow - radius); r <= Math.min(state.maze.length - 1, pRow + radius); r++) {
    for (let c = Math.max(0, pCol - radius); c <= Math.min(state.maze[0].length - 1, pCol + radius); c++) {
      visible.add(`${r},${c}`)
    }
  }

  return visible
}
