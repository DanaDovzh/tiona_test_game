import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultsStorageService } from '../../services/results-storage.service';

interface Cell {
  id: number;
  state: 'default' | 'error' | 'active' | 'success';
}
@Component({
  selector: 'app-game-cells',
  templateUrl: './game-cells.component.html',
  styleUrls: ['./game-cells.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class GameCellsComponent {
  rows = 10;
  cols = 10;

  readonly cells: Cell[] = Array.from({ length: this.rows * this.cols }, (_, i) => ({ id: i, state: 'default' }));

  timer: number | undefined;

  activeCellIndex: number | undefined;
  score = {
    computer: 0,
    player: 0
  };

  @Input() intervalMs = 1000;

  constructor(private _dialogRef: MatDialogRef<GameCellsComponent>, private _resultsStorage: ResultsStorageService) {
  }

  ngOnInit(): void {
    this.startHighlight();
  }

  startHighlight(): void {
    if (this.isFinished()) {
      this.finishGame();
      return;
    }
    this.cells.forEach(cell => {
      cell.state = 'default';
    });

    const randomIndex = Math.floor(Math.random() * this.cells.length);
    this.cells[randomIndex].state = 'active';
    this.activeCellIndex = randomIndex;

    this.timer = setTimeout(() => {
      this.handleMiss();
    }, this.intervalMs);
  }

  handleMiss(): void {
    if (this.activeCellIndex === undefined) return;
    this.score.computer++;
    this.startHighlight();
  }

  clickCell(index: number) {
    clearTimeout(this.timer);
    if (index === this.activeCellIndex) {
      this.score.player++;
      this.cells[index].state = 'success';
      setTimeout(() => {
        this.startHighlight();
      }, 200);
    } else {
      this.cells[index].state = 'error';
      setTimeout(() => {
        this.handleMiss();
      }, 200);
    }
  }

  isFinished() {
    return this.score.computer === 10 || this.score.player === 10;
  }

  finishGame() {
    this.cells.forEach(cell => {
      cell.state = 'active';
    });

    this._resultsStorage.saveResult({
      playerScore: this.score.player,
      computerScore: this.score.computer
    });

    this._dialogRef.close(this.score);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
