import { Component, Input, OnInit, inject } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Configuration, GameStatus, Level } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-minesweeper-header',
  templateUrl: './minesweeper-header.component.html',
  styleUrls: ['./minesweeper-header.component.scss'],
})
export class MinesweeperHeaderComponent implements OnInit {
  @Input() mines = 0;
  public headerSize = '270px';
  public timeEllapsed = 0;
  public gameStatus = '';
  public selectedLevel = Level.EASY;
  public sides = 0;
  public originalConfiguration: Configuration | null = null;
  private uiService = inject(UiService);

  ngOnInit(): void {
    combineLatest([
      this.uiService.getSelectedLevel(),
      this.uiService.getGameStatus(),
      this.uiService.getGameConfiguration(),
    ]).subscribe({
      next: ([level, status, configuration]) => {
        this.gameStatus = status;
        this.originalConfiguration = { ...(configuration as Configuration) };
        this.sides = configuration?.numberOfSides as number;
        this.selectedLevel = configuration?.level || level;
        this.setHeaderSize(configuration?.level || level);
      },
    });
  }

  public resetGame() {
    this.uiService.setGameConfiguration({
      ...this.originalConfiguration,
      board: undefined,
    } as Configuration);
    this.uiService.setSelectedLevel(this.selectedLevel);
    this.uiService.setGameStatus(GameStatus.NONE);
    this.uiService.setHistoryLog(null);
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
        this.headerSize = `${this.sides * 30}px`;
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
