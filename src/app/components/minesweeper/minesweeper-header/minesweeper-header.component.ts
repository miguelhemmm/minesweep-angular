import { Component, OnInit, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { GameStatus, Level } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-minesweeper-header',
  templateUrl: './minesweeper-header.component.html',
  styleUrls: ['./minesweeper-header.component.scss'],
})
export class MinesweeperHeaderComponent implements OnInit {
  public headerSize = '270px';
  public gameStatus = '';
  public selectedLevel = Level.EASY;
  public sides = 0;
  private uiService = inject(UiService);

  ngOnInit(): void {
    combineLatest([
      this.uiService.getSelectedLevel(),
      this.uiService.getGameStatus(),
      this.uiService.getGameConfiguration(),
    ]).subscribe({
      next: ([level, status, configuration]) => {
        this.gameStatus = status;
        this.sides = configuration.numberOfSides;
        this.selectedLevel = level;
        this.setHeaderSize(level);
      },
    });
  }

  public resetGame() {
    this.uiService.setSelectedLevel(this.selectedLevel);
    this.uiService.setGameStatus(GameStatus.NONE);
  }

  public setHeaderSize(level: Level) {
    switch (level) {
      case Level.EASY:
        this.headerSize = '270px';
        break;
      case Level.MEDIUM:
        this.headerSize = '420px';
        break;
      case Level.HARD:
        this.headerSize = '600px';
        break;
      case Level.PERSONALIZED:
        const size = this.sides * 30;
        this.headerSize = `${size}px`;
        break;
      default:
        this.headerSize = '270px';
    }
  }

  get statusImg(): string {
    let url = 'assets/happiness.png';

    if (this.gameStatus === GameStatus.LOSE) {
      url = 'assets/sad.png';
    }

    if (this.gameStatus === GameStatus.WON) {
      url = 'assets/smiling.png';
    }
    return url;
  }
}
