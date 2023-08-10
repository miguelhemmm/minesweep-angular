export enum Level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  PERSONALIZED = 'personalized',
}

export enum GameStatus {
  WON = 'You won!',
  LOSE = 'Game Over!',
  NONE = '',
}

export interface Log {
  difficulty: string;
  ellapsedTime: string | number;
  endTime: string | Date;
  startTime: string | Date;
  status: string;
}
export interface Tile {
  hasMine: boolean;
  adjacentMines: number;
  isRevealed: boolean;
  isFlagged: boolean;
}

export interface Configuration {
  numberOfSides: number;
  numberOfMines: number;
}
