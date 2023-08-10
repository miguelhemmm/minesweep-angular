import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperLayoutComponent } from './minesweeper-layout.component';
import { GameStatus, Level, Tile } from 'src/app/models/mine';

describe('MinesweeperLayotComponent', () => {
  let component: MinesweeperLayoutComponent;
  let fixture: ComponentFixture<MinesweeperLayoutComponent>;
  let mockEvent: any;
  let mockTile: any;

  beforeEach(async () => {
    mockEvent = {
      preventDefault: jasmine.createSpy('preventDefault'),
    };

    await TestBed.configureTestingModule({
      declarations: [MinesweeperLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinesweeperLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct color for adjacentMines count', () => {
    const tile1 = { adjacentMines: 1 } as Tile;
    const tile2 = { adjacentMines: 2 } as Tile;
    const tile3 = { adjacentMines: 3 } as Tile;
    const tile4 = { adjacentMines: 4 } as Tile;
    const tileDefault = { adjacentMines: 5 } as Tile;

    expect(component.getCellStyle(tile1)).toEqual({ color: '#4477CE' });
    expect(component.getCellStyle(tile2)).toEqual({ color: '#1A5D1A' });
    expect(component.getCellStyle(tile3)).toEqual({ color: '#C70039' });
    expect(component.getCellStyle(tile4)).toEqual({ color: '#35155D' });
    expect(component.getCellStyle(tileDefault)).toEqual({ color: 'black' });
  });

  it('should set properties based on Level.EASY', () => {
    component.setBoardTiles(Level.EASY);
    expect(component.gameStatus).toBe(GameStatus.NONE);
    expect(component.boardSize).toBe(9);
    expect(component.mines).toBe(9);
  });

  it('should set properties based on Level.MEDIUM', () => {
    component.setBoardTiles(Level.MEDIUM);
    expect(component.gameStatus).toBe(GameStatus.NONE);
    expect(component.boardSize).toBe(14);
    expect(component.mines).toBe(18);
  });

  it('should set properties based on Level.HARD', () => {
    component.setBoardTiles(Level.HARD);
    expect(component.gameStatus).toBe(GameStatus.NONE);
    expect(component.boardSize).toBe(20);
    expect(component.mines).toBe(36);
  });

  it('should set properties based on Level.PERSONALIZED', () => {
    const sides = 10;
    const mines = 5;
    component.setBoardTiles(Level.PERSONALIZED, sides, mines);
    expect(component.gameStatus).toBe(GameStatus.NONE);
    expect(component.boardSize).toBe(sides);
    expect(component.mines).toBe(mines);
  });

  it('should default to Level.EASY values for unknown level', () => {
    component.setBoardTiles('UNKNOWN_LEVEL' as any);
    expect(component.gameStatus).toBe(GameStatus.NONE);
    expect(component.boardSize).toBe(9);
    expect(component.mines).toBe(9);
  });

  it('should toggle tile flagging', () => {
    mockTile = { isFlagged: false, isRevealed: false };
    component.gameStatus = GameStatus.NONE;
    component.mines = 10;
    spyOn(component.minesEmitter, 'emit');
    spyOn(component, 'setBoardLocalStorage').and.callThrough();

    component.setFlag(mockEvent, mockTile);

    expect(mockTile.isFlagged).toBeTrue();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.setBoardLocalStorage).toHaveBeenCalled();
    expect(component.minesEmitter.emit).toHaveBeenCalledWith(9);
  });

  it('should not toggle tile flagging if tile is already revealed', () => {
    mockTile = { isFlagged: false, isRevealed: true };
    component.gameStatus = GameStatus.NONE;
    spyOn(component.minesEmitter, 'emit');
    spyOn(component, 'setBoardLocalStorage').and.callThrough();

    component.setFlag(mockEvent, mockTile);

    expect(mockTile.isFlagged).toBeFalse();
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.setBoardLocalStorage).not.toHaveBeenCalled();
    expect(component.minesEmitter.emit).not.toHaveBeenCalled();
  });
});
