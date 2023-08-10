import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { takeWhile } from 'rxjs';
import { Tile } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {
  private uiService = inject(UiService);
  public destroyed = false;

  constructor(private firestore: Firestore) {}

  public ngOnInit(): void {
    const lastGameData = collection(this.firestore, 'lastgame');
    collectionData(lastGameData)
      .pipe(takeWhile(() => !this.destroyed))
      .subscribe({
        next: (data) => {
          const { numberOfSides, numberOfMines, level } =
            data[0]['configuration'];
          const board = localStorage.getItem('board') as unknown as Tile[][];
          this.uiService.setGameConfiguration({
            numberOfMines,
            numberOfSides,
            level,
            board,
          });
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroyed = true;
  }
}
