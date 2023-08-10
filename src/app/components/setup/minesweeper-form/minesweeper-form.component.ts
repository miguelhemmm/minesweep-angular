import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  @Output() startGameEmitter: EventEmitter<boolean> = new EventEmitter();

  public settingsForm!: FormGroup;
  public showForm = false;
  public selectedValue = Level.EASY;
  private uiService = inject(UiService);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      numberOfSides: ['', [Validators.required, Validators.min(2)]],
      numberOfMines: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onStartLevel(): void {
    if (this.settingsForm.valid) {
      this.uiService.setGameConfiguration(this.settingsForm.value);
    } else {
      console.log('Form is not valid.');
    }
    this.router.navigate(['board']);
  }

  onLoadLevel(): void {
    this.uiService.setSelectedLevel(Level.PERSONALIZED);
    this.uiService.getSavedData().subscribe({
      next: (data) => {
        console.log('data recieved; ', data);
        this.uiService.setGameConfiguration(data);
        this.router.navigate(['board']);
      },
    });
  }

  public onSelectLevel(level: Level) {
    this.selectedValue = level;
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
}
