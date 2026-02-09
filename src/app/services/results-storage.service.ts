import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'tiona_game_results';
export interface GameResult {
  playerScore: number;
  computerScore: number;
}
@Injectable({ providedIn: 'root' })
export class ResultsStorageService {

  private readonly resultsSubject = new BehaviorSubject<GameResult[]>(this.getAll());
  readonly results$: Observable<GameResult[]> = this.resultsSubject.asObservable();
  getAll(): GameResult[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveAll(results: GameResult[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    } catch {
      console.error('Failed to save results');
    }
  }

  saveResult(result: GameResult) {
    const updatedResults = [result, ...this.resultsSubject.getValue()];
    this.saveAll(updatedResults);
    this.resultsSubject.next(updatedResults);
  }

  clear(): void {
    this.resultsSubject.next([]);
    this.saveAll([]);
    localStorage.removeItem(STORAGE_KEY);
  }
}
