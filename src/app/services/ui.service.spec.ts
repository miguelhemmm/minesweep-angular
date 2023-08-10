import { TestBed } from '@angular/core/testing';
import { UiService } from './ui.service';
import { Level, GameStatus, Configuration, Log } from '../models/mine';
import { take } from 'rxjs/operators';

describe('UiService', () => {
  let service: UiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService],
    });
    service = TestBed.inject(UiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and set selected level', (done: DoneFn) => {
    service.setSelectedLevel(Level.MEDIUM);
    service
      .getSelectedLevel()
      .pipe(take(1))
      .subscribe((value) => {
        expect(value).toBe(Level.MEDIUM);
        done();
      });
  });

  it('should get and set game status', (done: DoneFn) => {
    service.setGameStatus(GameStatus.NONE);
    service
      .getGameStatus()
      .pipe(take(1))
      .subscribe((status) => {
        expect(status).toBe('');
        done();
      });
  });

  it('should get and set game configuration', (done: DoneFn) => {
    const config: Configuration = {
      numberOfMines: 5,
      numberOfSides: 7,
      level: Level.HARD,
    };
    service.setGameConfiguration(config);
    service
      .getGameConfiguration()
      .pipe(take(1))
      .subscribe((configuration) => {
        expect(configuration).toEqual(config);
        done();
      });
  });

  it('should get and set saved data', (done: DoneFn) => {
    const data: Configuration = {
      numberOfMines: 2,
      numberOfSides: 6,
      level: Level.EASY,
    };
    service.setSavedData(data);
    service
      .getSavedData()
      .pipe(take(1))
      .subscribe((savedData) => {
        expect(savedData).toEqual(data);
        done();
      });
  });

  it('should get and set history log', (done: DoneFn) => {
    const log: Log = {
      mock: 'mock',
    } as unknown as Log;
    service.setHistoryLog(log);
    service
      .getHistoryLog()
      .pipe(take(1))
      .subscribe((historyLog) => {
        expect(historyLog).toEqual(log);
        done();
      });
  });
});
