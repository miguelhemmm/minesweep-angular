import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Level, GameStatus } from 'src/app/models/mine';
import { UiService } from 'src/app/services/ui.service';
import { MinesweeperFormComponent } from './minesweeper-form.component';

describe('MinesweeperFormComponent', () => {
  let component: MinesweeperFormComponent;
  let fixture: ComponentFixture<MinesweeperFormComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockUiService = {
    setSelectedLevel: jasmine.createSpy('setSelectedLevel'),
    setGameStatus: jasmine.createSpy('setGameStatus'),
    setGameConfiguration: jasmine.createSpy('setGameConfiguration'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [MinesweeperFormComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UiService, useValue: mockUiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MinesweeperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onStartLevel', () => {
    it('should set game configuration and navigate to board when form is valid and level is PERSONALIZED', () => {
      component.settingsForm.setValue({ numberOfSides: 5, numberOfMines: 5 });
      component.selectedLevel = Level.PERSONALIZED;
      component.onStartLevel();
      expect(mockUiService.setGameConfiguration).toHaveBeenCalledWith({
        numberOfSides: 5,
        numberOfMines: 5,
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['board']);
    });

    it('should not set game configuration but still navigate when form is invalid or level is not PERSONALIZED', () => {
      component.settingsForm.setValue({ numberOfSides: 1, numberOfMines: 0 });
      component.selectedLevel = Level.EASY;
      component.onStartLevel();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['board']);
    });
  });

  describe('onLoadLevel', () => {
    it('should set selected level, game status and navigate to board', () => {
      component.onLoadLevel();
      expect(mockUiService.setSelectedLevel).toHaveBeenCalledWith(Level.EASY);
      expect(mockUiService.setGameStatus).toHaveBeenCalledWith(GameStatus.NONE);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['board']);
    });
  });

  describe('onSelectLevel', () => {
    it('should set selected level, game status, and update showForm value based on selected level', () => {
      component.onSelectLevel(Level.HARD);
      expect(component.selectedLevel).toEqual(Level.HARD);
      expect(mockUiService.setSelectedLevel).toHaveBeenCalledWith(Level.HARD);
      expect(mockUiService.setGameStatus).toHaveBeenCalledWith(GameStatus.NONE);
      expect(component.showForm).toBeFalse();

      component.onSelectLevel(Level.PERSONALIZED);
      expect(component.showForm).toBeTrue();
    });
  });

  describe('errorStatus', () => {
    it('should return error message when the number of mines exceeds total tiles', () => {
      component.settingsForm.setValue({ numberOfSides: 3, numberOfMines: 10 });
      expect(component.errorStatus).toEqual(
        "Number of mines can't be more or equal than the total tiles!"
      );
    });

    it('should return an empty string when conditions are not met', () => {
      component.settingsForm.setValue({ numberOfSides: 5, numberOfMines: 5 });
      expect(component.errorStatus).toEqual('');
    });
  });

  describe('disabledStatus', () => {
    it('should return true when conditions are met', () => {
      component.settingsForm.setValue({ numberOfSides: 1, numberOfMines: 10 });
      component.selectedLevel = Level.PERSONALIZED;
      expect(component.disabledStatus).toBeTrue();
    });

    it('should return false when conditions are not met', () => {
      component.settingsForm.setValue({ numberOfSides: 5, numberOfMines: 5 });
      component.selectedLevel = Level.EASY;
      expect(component.disabledStatus).toBeFalse();
    });
  });
});
