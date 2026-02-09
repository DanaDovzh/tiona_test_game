import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameResult, ResultsStorageService } from '../../services/results-storage.service';

type Winner = 'player' | 'computer' | 'equal';
@Component({
  selector: 'app-results-table',
  imports: [CommonModule],
  templateUrl: './results-table.component.html',
  styleUrl: './results-table.component.scss',
  standalone: true
})
export class ResultsTableComponent implements OnInit {
  results$: Observable<GameResult[]> = new Observable<GameResult[]>();
  coreSummary$: Observable<{ player: number; computer: number; winner: Winner }> = new Observable<{ player: number; computer: number; winner: Winner }>();
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
            acc.computer += r.computerScore;
            return acc;
          },
          { player: 0, computer: 0 }
        );

        return {
          player: totals.player,
          computer: totals.computer,
          winner:
            totals.player > totals.computer
              ? 'player'
              : totals.computer > totals.player
                ? 'computer'
                : 'equal'
        };
      })
    );

  }

}
