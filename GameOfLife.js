class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard(true);
  }

  iterate(fn) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        fn(row, col);
      }
    }
  }

  /**
   * Returns a 2D Array
   */

  makeBoard(val) {
    const board = [];
    this.iterate((row, col) => {
      if (!board[row]) {
        board[row] = [];
      }
      board[row][col] = val ? Math.round(Math.random()) : 0;
    });
    return board;
  }

  randomize() {
    this.board = this.makeBoard(true);
  }

  clear() {
    this.board = this.makeBoard();
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    const neighbors = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1]
    ];

    return neighbors.reduce((living, neigh) => {
      let row1 = neigh[0];
      let col1 = neigh[1];
      if (this.board[row1] && this.board[row1][col1]) {
        living++;
      }
      return living;
    }, 0);
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();

    this.iterate((row, col) => {
      const alive = !!this.board[row][col];
      const dead = !alive;
      const living = this.livingNeighbors(row, col);

      if ((alive && living < 2) || (alive && living > 3)) {
        newBoard[row][col] = 0;
      } else if (dead && living === 3) {
        newBoard[row][col] = 1;
      } else if (alive) {
        newBoard[row][col] = 1;
      }
    });
    this.board = newBoard;
  }
}
