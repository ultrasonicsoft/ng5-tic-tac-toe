import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isGameStarted = false;

  private isPlayerOneTurn = true;

  data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  private RowCount = 3;
  private ColumnCount = 3;

  isGameOver = false;

  private winner = 0;

  winnerMessage = '';

  userPlayed(rowIndex: number, colIndex: number) {
    if (!this.isGameStarted) {
      alert('Please click on Start Game...');
      return;
    }

    if(this.isGameOver){
      alert('Please restart game!');
      return;
    }
    let currentValue = this.data[rowIndex][colIndex];

    if (currentValue != 0) return;

    this.data[rowIndex][colIndex] = this.isPlayerOneTurn ? 1 : 2;
    this.isPlayerOneTurn = !this.isPlayerOneTurn;


    this.isGameOver = this.checkIsGameOver();
    if (this.isGameOver) {
      this.checkWinner();
      
      console.log('game over...');
      return;
    }

    this.checkWinner();

  }

  getSymbol(value: number) {
    if (value == 0)
      return '';
    if (value == 1)
      return 'X';
    return 'O'
  }

  startGame() {
    this.isGameStarted = true;
  }

  checkIsGameOver() {
    for (let rowIndex = 0; rowIndex < this.RowCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.ColumnCount; columnIndex++) {
        if (this.data[rowIndex][columnIndex] == 0)
          return false;
      }
    }
    return true;
  }

  checkWinner() {
    this.checkPlayerRowStatus(1);
    this.checkPlayerRowStatus(2);

    this.checkPlayerColumnStatus(1);
    this.checkPlayerColumnStatus(2);

    this.checkPlayerDiagnonalStatus(1);
    this.checkPlayerDiagnonalStatus(2);
  }

  checkPlayerRowStatus(player: any) {
    let row1Status = this.data[0][0] == player && this.data[0][1] == player && this.data[0][2] == player;
    let row2Status = this.data[1][0] == player && this.data[1][1] == player && this.data[1][2] == player;
    let row3Status = this.data[2][0] == player && this.data[2][1] == player && this.data[2][2] == player;

    if (row1Status || row2Status || row3Status) {
      this.winner = player;
      this.showWinner();
      return;
    }
  }

  checkPlayerColumnStatus(player: any) {
    let row1Status = this.data[0][0] == player && this.data[1][0] == player && this.data[2][0] == player;
    let row2Status = this.data[0][1] == player && this.data[1][1] == player && this.data[2][1] == player;
    let row3Status = this.data[0][2] == player && this.data[1][2] == player && this.data[2][2] == player;

    if (row1Status || row2Status || row3Status) {
      this.winner = player;
      this.showWinner();
      return;
    }
  }

  checkPlayerDiagnonalStatus(player: any) {
    let row1Status = this.data[0][0] == player && this.data[1][1] == player && this.data[2][2] == player;
    let row2Status = this.data[0][2] == player && this.data[1][1] == player && this.data[2][0] == player;

    if (row1Status || row2Status) {
      this.winner = player;
      this.showWinner();
      return;
    }
  }

  showWinner() {
    console.log(`Winner is ${this.winner}`);

    if (this.winner == 0) {
      this.winnerMessage = 'Game drawn!';
      return
    }
    this.winnerMessage = `Player ${this.winner == 1? 'X': 'O'} Won!!!`
    this.isGameOver = true;
  }  

  playAgain() {
    this.data = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
    this.isGameStarted = true;

    this.isPlayerOneTurn = true;
    this.isGameOver = false;

    this.winner = 0;

    this.winnerMessage = '';
  }

  playWithComputer(){
    alert('This feature is yet to be implemented...');
  }
}
