const width = 20;
const height = 15; // width and height dimensions of the board
let score = 0;

//set game state to off
let running = false;

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {

  gol.iterate((row, col) => {
    let cell = table.children[row].children[col];
    if (gol.board[row][col] === 1) {
      cell.classList.add("alive");
    } else {
      cell.classList.remove('alive');
    }
  });
};

/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {

  if (running === false) {

    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (event.target.tagName === 'TD') {
      event.target.classList.add('alive')
      gol.board[row][col] = gol.board[row][col] ? 0 : 1;
    }
    paint();
  }
})


document.getElementById("board").addEventListener("click", event => {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  //check game state is on and look for click events
  //update score and reset cell
  if (running === true && !!gol.board[row][col]) {
    gol.board[row][col] = 0
    event.target.classList.remove('alive')
    score++
    let tally = document.querySelector('#score');
    tally.innerHTML = score;
    console.log('score:', score)
  }
})



document.getElementById("step_btn").addEventListener("click", event => {
  gol.tick();
  paint();
});

document.getElementById("play_btn").addEventListener("click", event => {
  running = true;
  setInterval(() => {
    gol.tick();
    paint();
  }, 300)
});

document.getElementById("random_btn").addEventListener("click", event => {
  gol.randomize();
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  gol.clear();
  paint();
});
