import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameStatus, Level } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-minesweeper-form',
  templateUrl: './minesweeper-form.component.html',
  styleUrls: ['./minesweeper-form.component.scss'],
})
export class MinesweeperFormComponent {
  public settingsForm!: FormGroup;
  public showForm = false;
  public selectedLevel = Level.EASY;
  private uiService = inject(UiService);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      numberOfSides: ['', [Validators.required, Validators.min(2)]],
      numberOfMines: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onStartLevel(): void {
    if (this.settingsForm.valid && this.selectedLevel === Level.PERSONALIZED) {
      this.uiService.setGameConfiguration(this.settingsForm.value);
    }
    this.router.navigate(['board']);
  }

  onLoadLevel(): void {
    this.uiService.setSelectedLevel(Level.PERSONALIZED);
    this.uiService.setGameStatus(GameStatus.NONE);
    this.router.navigate(['board']);
  }

  public onSelectLevel(level: Level) {
    this.selectedLevel = level;
    this.uiService.setSelectedLevel(level);
    this.uiService.setGameStatus(GameStatus.NONE);

    this.showForm = level === Level.PERSONALIZED;
  }

  get numberOfSides() {
    return this.settingsForm.get('numberOfSides');
  }

  get numberOfMines() {
    return this.settingsForm.get('numberOfMines');
  }

  get errorStatus(): string {
    let error = '';
    if (
      this.numberOfSides?.valid &&
      this.numberOfMines?.valid &&
      Number(this.numberOfSides?.value) * Number(this.numberOfSides?.value) <=
        Number(this.numberOfMines?.value)
    ) {
      error = "Number of mines can't be more or equal than the total tiles!";
    }
    return error;
  }

  get disabledStatus(): boolean {
    return (
      this.selectedLevel === Level.PERSONALIZED &&
      (!!this.numberOfMines?.invalid ||
        !!this.numberOfSides?.invalid ||
        !!this.errorStatus)
    );
  }
}
