import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  Firestore,
  addDoc,
  updateDoc,
  doc,
  collection,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

import { Observable, takeWhile } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss'],
})
export class MinesweeperComponent implements OnInit, OnDestroy {
  public gameStatus$: Observable<string> = new Observable();
  public destroyed = false;
  public mines = 0;
  private uiService = inject(UiService);
  private toastr = inject(ToastrService);
  private cd = inject(ChangeDetectorRef);

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.gameStatus$ = this.uiService.getGameStatus();
    this.uiService
      .getHistoryLog()
      .pipe(takeWhile(() => !this.destroyed))
      .subscribe({
        next: (logHistory) => {
          if (logHistory) {
            const docRef = collection(this.firestore, 'log');

            addDoc(docRef, logHistory).catch((error) => {
              console.error('Error updating configuration:', error);
            });
          }
        },
      });
  }

  public onSaveGame(): void {
    this.destroyed = false;
    this.uiService
      .getSavedData()
      .pipe(takeWhile(() => !this.destroyed))
      .subscribe({
        next: (configuration) => {
          const docRef = doc(
            this.firestore,
            'lastgame',
            'qluTJwbgCXASM5aqbWF9'
          );

          const { numberOfMines, numberOfSides, level, board } = configuration;
          localStorage.setItem('board', JSON.stringify(board));

          updateDoc(docRef, {
            configuration: { numberOfMines, numberOfSides, level },
          })
            .then(() => {
              this.destroyed = true;
              this.toastr.success('Succes!, your game was saved');
            })
            .catch((error) => {
              console.error('Error updating configuration:', error);
            });
        },
      });
  }

  public getCurrentMineNumber(event: number) {
    this.mines = event;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.uiService.setHistoryLog(null);
    this.destroyed = true;
  }
}
