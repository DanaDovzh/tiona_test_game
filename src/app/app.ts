import { Component } from '@angular/core';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { GameCellsComponent } from './components/game-cells/game-cells.component';
import { ResultsStorageService } from './services/results-storage.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ResultsTableComponent, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',

})
export class App {
  intervalMs = 1000;
  constructor(private _dialog: MatDialog, private _resultsStorage: ResultsStorageService) {
  }

  openGame() {
    const dialogRef = this._dialog.open(GameCellsComponent, {

    });

    dialogRef.componentInstance.intervalMs = this.intervalMs;

  }

  resetScore() {
    this._resultsStorage.clear();
  }
}
