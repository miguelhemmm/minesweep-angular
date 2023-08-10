import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { take, takeWhile } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {
  private db = inject(Firestore);
  private uiService = inject(UiService);
  public destroyed = false;

  public ngOnInit(): void {
    const lastGameData = collection(this.db, 'lastgame');
    collectionData(lastGameData)
      .pipe(takeWhile(() => !this.destroyed))
      .subscribe({
        next: (data) => {
          const { numberOfSides, numberOfMines } = data[0]['configuration'];
          this.uiService.setGameConfiguration({ numberOfMines, numberOfSides });
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroyed = true;
  }
}
