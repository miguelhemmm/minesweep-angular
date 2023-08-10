import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GameStatus, Level, Tile } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-minesweeper-layout',
  templateUrl: './minesweeper-layout.component.html',
  styleUrls: ['./minesweeper-layout.component.scss'],
})
export class MinesweeperLayoutComponent implements OnInit {
  @Output() minesEmitter: EventEmitter<number> = new EventEmitter();

  public startTime = new Date();
  public endTime = new Date();
  public mines: number = 0;
  public selectedLevel: Level = Level.EASY;
  public gameStatus: GameStatus = GameStatus.NONE;
  public boardSize = 9;
  public board: Tile[][] = [];

  private uiService = inject(UiService);

  ngOnInit(): void {
    combineLatest([
      this.uiService.getSelectedLevel(),
      this.uiService.getGameConfiguration(),
    ]).subscribe({
      next: ([level, gameConfiguration]) => {
        this.selectedLevel = level;

        if (level !== Level.PERSONALIZED) {
          this.setBoardTiles(level);
          return;
        }
        this.setBoardTiles(
          level,
          gameConfiguration.numberOfSides,
          gameConfiguration.numberOfMines
        );
      },
    });
  }

  public setStartingValues() {
    this.startTime = new Date(Date.now());
  }

  public revealTile(tile: Tile, x?: number, y?: number) {
    if (
      tile.isFlagged ||
      tile.isRevealed ||
      this.gameStatus !== GameStatus.NONE
    ) {
      return;
    }

    tile.isRevealed = true;

    if (tile.hasMine) {
      this.gameOver();
      return;
    }

    if (tile.adjacentMines === 0) {
      x =
        x === undefined ? this.board.findIndex((row) => row.includes(tile)) : x;
      y = y === undefined ? this.board[x].indexOf(tile) : y;

      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (const [dx, dy] of directions) {
        const adjX = x + dx;
        const adjY = y + dy;
        if (
          adjX >= 0 &&
          adjX < this.boardSize &&
          adjY >= 0 &&
          adjY < this.boardSize
        ) {
          this.revealTile(this.board[adjX][adjY], adjX, adjY);
        }
      }
    }
    this.checkGameStatus();
  }

  public setFlag(event: Event, tile: Tile) {
    event.preventDefault();
    if (this.gameStatus !== GameStatus.NONE) return;
    tile.isFlagged = !tile.isFlagged;
    if (this.mines > 0) {
      this.mines--;
    }
    this.minesEmitter.emit(this.mines);
  }

  private gameOver() {
    this.board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.hasMine) cell.isRevealed = true;
      })
    );
    this.gameStatus = GameStatus.LOSE;
    this.endTime = new Date(Date.now());

    const logValue = {
      difficulty: this.selectedLevel,
      ellapsedTime: (this.endTime.valueOf() - this.startTime.valueOf()) / 1000,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.gameStatus,
    };
    this.uiService.setHistoryLog(logValue);
    this.uiService.setGameStatus(this.gameStatus);
  }

  private checkGameStatus() {
    for (const row of this.board) {
      for (const tile of row) {
        if (!tile.hasMine && !tile.isRevealed) {
          return;
        }
      }
    }

    this.gameStatus = GameStatus.WON;
    this.endTime = new Date(Date.now());

    const logValue = {
      difficulty: this.selectedLevel,
      ellapsedTime: (this.endTime.valueOf() - this.startTime.valueOf()) / 1000,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.gameStatus,
    };
    this.uiService.setHistoryLog(logValue);
    this.uiService.setGameStatus(this.gameStatus);
  }

  public setBoardTiles(level: Level, sides: number = 9, mines: number = 0) {
    this.gameStatus = GameStatus.NONE;
    switch (level) {
      case Level.EASY:
        this.boardSize = 9;
        mines = 9;
        break;
      case Level.MEDIUM:
        this.boardSize = 14;
        mines = 18;

        break;
      case Level.HARD:
        this.boardSize = 20;
        mines = 36;
        break;
      case Level.PERSONALIZED:
        this.boardSize = sides;
        break;
      default:
        this.boardSize = 9;
        mines = 9;
    }
    this.mines = mines;
    this.initializeBoard(mines);
  }

  public initializeBoard(mines: number) {
    const minePositions = new Set<string>();
    this.board = new Array(this.boardSize);

    while (minePositions.size < mines) {
      const x = Math.floor(Math.random() * this.boardSize);
      const y = Math.floor(Math.random() * this.boardSize);
      minePositions.add(`${x},${y}`);
    }
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = new Array(this.boardSize).fill(null).map((_, j) => ({
        hasMine: minePositions.has(`${i},${j}`),
        adjacentMines: 0,
        isRevealed: false,
        isFlagged: false,
      }));
    }
    this.uiService.setSavedData({
      numberOfSides: this.boardSize,
      numberOfMines: mines,
    });
    this.minesEmitter.emit(mines);
    this.calculateAdjacentMines();
  }

  private calculateAdjacentMines() {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (!this.board[i][j].hasMine) {
          const count = directions.reduce((acc, [x, y]) => {
            const ni = i + x;
            const nj = j + y;
            if (
              ni >= 0 &&
              ni < this.boardSize &&
              nj >= 0 &&
              nj < this.boardSize &&
              this.board[ni][nj].hasMine
            ) {
              acc++;
            }
            return acc;
          }, 0);
          this.board[i][j].adjacentMines = count;
        }
      }
    }
  }
}
