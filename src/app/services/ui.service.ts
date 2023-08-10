import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuration, GameStatus, Level, Log } from '../models/mine';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selectedLevel$: BehaviorSubject<Level> = new BehaviorSubject<Level>(
    Level.EASY
  );
  private gameStatus$: BehaviorSubject<GameStatus> =
    new BehaviorSubject<GameStatus>(GameStatus.NONE);
  private gameConfiguration$: BehaviorSubject<Configuration | null> =
    new BehaviorSubject<Configuration | null>(null);
  private savedData$: BehaviorSubject<Configuration> =
    new BehaviorSubject<Configuration>({
      numberOfMines: 1,
      numberOfSides: 9,
      level: Level.PERSONALIZED,
    });

  private historyLog$: BehaviorSubject<Log | null> =
    new BehaviorSubject<Log | null>(null);

  public getSelectedLevel(): Observable<Level> {
    return this.selectedLevel$.asObservable();
  }

  public setSelectedLevel(value: Level): void {
    this.selectedLevel$.next(value);
  }

  public getGameStatus(): Observable<string> {
    return this.gameStatus$.asObservable();
  }

  public setGameStatus(value: GameStatus): void {
    this.gameStatus$.next(value);
  }

  public getGameConfiguration(): Observable<Configuration | null> {
    return this.gameConfiguration$.asObservable();
  }

  public setGameConfiguration(value: Configuration | null): void {
    this.gameConfiguration$.next(value);
  }

  public getSavedData(): Observable<Configuration> {
    return this.savedData$.asObservable();
  }

  public setSavedData(value: Configuration): void {
    this.savedData$.next(value);
  }

  public getHistoryLog(): Observable<Log | null> {
    return this.historyLog$.asObservable();
  }

  public setHistoryLog(value: Log | null): void {
    this.historyLog$.next(value);
  }
}
