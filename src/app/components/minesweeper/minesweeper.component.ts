import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Observable, takeWhile } from 'rxjs';
import { Configuration } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss'],
})
export class MinesweeperComponent implements OnInit, OnDestroy {
  public gameStatus$: Observable<string> = new Observable();
  public lastSavedGame!: Configuration;
  public destroyed = false;
  private uiService = inject(UiService);

  ngOnInit(): void {
    this.gameStatus$ = this.uiService.getGameStatus();
  }

  public onSaveGame(): void {
    this.uiService
      .getGameConfiguration()
      .pipe(takeWhile(() => !this.destroyed))
      .subscribe({
        next: (configuration) => {
          console.log('configuraiton: ', configuration);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}
