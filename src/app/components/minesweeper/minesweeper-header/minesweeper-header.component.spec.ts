import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MinesweeperHeaderComponent } from './minesweeper-header.component';
import { UiService } from 'src/app/services/ui.service';
import { GameStatus, Level } from 'src/app/models/mine';

describe('MinesweeperHeaderComponent', () => {
  let component: MinesweeperHeaderComponent;
  let fixture: ComponentFixture<MinesweeperHeaderComponent>;

  const mockUiService = jasmine.createSpyObj('UiService', [
    'getSelectedLevel',
    'getGameStatus',
    'getGameConfiguration',
    'setGameConfiguration',
    'setSelectedLevel',
    'setGameStatus',
    'setHistoryLog',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinesweeperHeaderComponent],
      providers: [{ provide: UiService, useValue: mockUiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MinesweeperHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update properties based on the observables', () => {
      mockUiService.getSelectedLevel.and.returnValue(of(Level.MEDIUM));
      mockUiService.getGameStatus.and.returnValue(of(GameStatus.NONE));
      mockUiService.getGameConfiguration.and.returnValue(
        of({ numberOfSides: 5 })
      );

      fixture.detectChanges();

      expect(component.gameStatus).toEqual(GameStatus.NONE);
      expect(component.selectedLevel).toEqual(Level.MEDIUM);
      expect(component.sides).toEqual(5);
      expect(component.headerSize).toEqual('420px');
    });
  });

  describe('resetGame', () => {
    it('should reset the game', () => {
      component.selectedLevel = Level.EASY;
      component.resetGame();

      expect(mockUiService.setSelectedLevel).toHaveBeenCalledWith(Level.EASY);
      expect(mockUiService.setGameStatus).toHaveBeenCalledWith(GameStatus.NONE);
      expect(mockUiService.setHistoryLog).toHaveBeenCalledWith(null);
    });
  });

  describe('setHeaderSize', () => {
    it('should set the header size based on the HARD level', () => {
      component.setHeaderSize(Level.HARD);
      expect(component.headerSize).toEqual('600px');
    });
    it('should set the header size based on the PERSONALIZED level', () => {
      component.sides = 9;
      component.setHeaderSize(Level.PERSONALIZED);
      expect(component.headerSize).toEqual('270px');
    });

    it('should set the header size based on the EASY level', () => {
      component.setHeaderSize(Level.EASY);
      expect(component.headerSize).toEqual('270px');
    });

    it('should set the header size based on invalid level', () => {
      component.setHeaderSize('mock' as Level);
      expect(component.headerSize).toEqual('270px');
    });
  });

  describe('statusImg', () => {
    it('should return the correct image URL based on the game status', () => {
      component.gameStatus = GameStatus.WON;
      expect(component.statusImg).toEqual('assets/smiling.png');

      component.gameStatus = GameStatus.LOSE;
      expect(component.statusImg).toEqual('assets/sad.png');
    });
  });
});
