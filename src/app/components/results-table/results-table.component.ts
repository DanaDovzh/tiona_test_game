import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameResult, ResultsStorageService } from '../../services/results-storage.service';
import { map, Observable } from 'rxjs';

type Winner = 'player' | 'cpu' | 'equal';
@Component({
  selector: 'app-results-table',
  imports: [CommonModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss',
  standalone: true
})
export class ResultsTableComponent implements OnInit {
  results$: Observable<GameResult[]> = new Observable<GameResult[]>();
  coreSummary$: Observable<{ player: number; cpu: number; winner: Winner }> = new Observable<{ player: number; cpu: number; winner: Winner }>();
  constructor(private _resultsStorage: ResultsStorageService) { }

  ngOnInit(): void {
    this.results$ = this._resultsStorage.results$;
    this.getScore();

  }

  getScore() {
    this.coreSummary$ = this.results$.pipe(
      map(results => {
        const totals = results.reduce(
          (acc, r) => {
            acc.player += r.playerScore;
            acc.cpu += r.cpuScore;
            return acc;
          },
          { player: 0, cpu: 0 }
        );

        return {
          player: totals.player,
          cpu: totals.cpu,
          winner:
            totals.player > totals.cpu
              ? 'player'
              : totals.cpu > totals.player
                ? 'cpu'
                : 'equal'
        };
      })
    );

  }

}
