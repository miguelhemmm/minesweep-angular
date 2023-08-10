import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuration, GameStatus, Level } from '../models/mine';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private selectedLevel$: BehaviorSubject<Level> = new BehaviorSubject<Level>(
    Level.EASY
  );
  private gameStatus$: BehaviorSubject<GameStatus> =
    new BehaviorSubject<GameStatus>(GameStatus.NONE);
  private gameConfiguration$: BehaviorSubject<Configuration> =
    new BehaviorSubject({ numberOfMines: 0, numberOfSides: 9 });
  private savedData$: BehaviorSubject<Configuration> = new BehaviorSubject({
    numberOfMines: 0,
    numberOfSides: 9,
  });

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

  public getGameConfiguration(): Observable<Configuration> {
    return this.gameConfiguration$.asObservable();
  }

  public setGameConfiguration(value: Configuration): void {
    this.gameConfiguration$.next(value);
  }

  public getSavedData(): Observable<Configuration> {
    return this.savedData$.asObservable();
  }

  public setSavedData(value: Configuration): void {
    this.savedData$.next(value);
  }
}
