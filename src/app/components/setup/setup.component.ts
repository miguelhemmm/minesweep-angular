import { Component, OnInit, inject } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  private db = inject(Firestore);
  private uiService = inject(UiService);

  public ngOnInit(): void {
    const lastGameData = collection(this.db, 'lastgame');
    collectionData(lastGameData).subscribe({
      next: (data) => {
        console.log(data[0]['configuration']);
        const { numberOfSides, numberOfMines } = data[0]['configuration'];
        this.uiService.setSavedData({ numberOfSides, numberOfMines });
      },
    });
  }
}
