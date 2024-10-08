function knightMoves(start, end) {
  //show shortest possible path from start square to end square
  //outputs all squares knight stops on along the way
  let totalMoves = 0;
  let stops = [];
  let begin = [...start];
  let endpoint = [...end];
  let possibleMoves = [
    [2, 1],
    [1, 2],
    [-2, 1],
    [1, -2],
    [-2, -1],
    [-1, -2],
    [-1, 2],
    [2, -1],
  ];
  let currentTile = [...begin];
  stops.push([...currentTile]);
  while (currentTile[0] !== endpoint[0] && currentTile[1] !== endpoint[1]) {
    if (Math.abs(currentTile[0] - endpoint[0]) >= 2) {
      if (currentTile[0] - endpoint[0] < 0) {
        currentTile[0] += 2;
      } else {
        currentTile[0] -= 2;
      }
      if (currentTile[1] - endpoint[1] < 0) {
        currentTile[1] += 1;
      } else {
        currentTile[1] -= 1;
      }
      console.log(currentTile);
      stops.push([...currentTile]);
      console.log(stops);
      totalMoves++;
      console.log("move complete");
    } else if (Math.abs(currentTile[0] - endpoint[0]) === 1) {
      if (currentTile[0] - endpoint[0] < 0) {
        currentTile[0] += 1;
      } else {
        currentTile[0] -= 1;
      }
      if (currentTile[1] - endpoint[1] < 0) {
        currentTile[1] += 2;
      } else {
        currentTile[1] -= 2;
      }
      console.log(currentTile);
      stops.push([...currentTile]);
      console.log(stops);
      totalMoves++;
      console.log("move complete");
    } else if (currentTile[0] - endpoint[0] === 0) {
      console.log("test");
      if (currentTile[0] - endpoint[0] >= 0) {
        currentTile[0] -= 2;
      } else {
        currentTile[0] += 2;
      }
      if (currentTile[1] - endpoint[1] < 0) {
        currentTile[1] += 1;
      } else {
        currentTile[1] -= 1;
      }
      console.log(currentTile);
      stops.push([...currentTile]);
      console.log(stops);
      totalMoves++;
      console.log("move complete");
    }

    //function looping infinitely here
  }
  console.log(`current tile is: ${currentTile}`);
  console.log(`endpoint tile is: ${endpoint}`);
  if (currentTile[0] === endpoint[0] && currentTile[1] === endpoint[1]) {
    console.log(`total moves: ${totalMoves}`);
    console.log(stops);
    console.log("function complete");
    return;
  }
}
// knightMoves([0, 0], [7, 7]);
/*
  must reach endpoint in shortest # of moves
   if first move is forward 2 steps
     side step moves 1
   if first move is 1 step
     side step moves 2
  */

/*
  board is 8x8
  kinght can move
    two steps forward, one step side
    or
    one step forward, two steps side

    knight cannot move off board 
    (must stay within bounds of 0,0 to 7,7)

    example:
      start [0,0] => end [3,3]

*/

function knightMovesTwo(start, end) {
  let queue = [];
  let begin = [...start];
  let endpoint = [...end];
  let possibleMoves = [
    [2, 1],
    [1, 2],
    [-2, 1],
    [1, -2],
    [-2, -1],
    [-1, -2],
    [-1, 2],
    [2, -1],
  ];

  let board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push(null);
    }
  }

  let currentPath = [];
  let shortestPath = [];
  let movesTotal = 0;
  let current;

  queue.push([...begin]);
  // currentPath.push([...begin]);
  board[begin[0]][begin[1]] = 1;

  while (queue.length !== 0) {
    current = queue.shift();

    // currentPath.push([...current]);
    let currentX = current[0];
    let currentY = current[1];
    if (board[currentX][currentY] === 1) {
      currentPath.push([...current]);
    }

    if (current[0] === endpoint[0] && current[1] === endpoint[1]) {
      console.log(current);
      // currentPath.push([...current]);
      console.log(currentPath);
      // console.log(board);
      if (shortestPath.length === 0) {
        shortestPath = [...currentPath];
      }
      if (currentPath.length <= shortestPath.length) {
        console.log(shortestPath.length);
        shortestPath.length = 0;
        shortestPath = [...currentPath];
        currentPath.length = 0;
        currentPath.push([begin]);
      }
    }

    for (let i = 0; i < possibleMoves.length; i++) {
      let move = [...current];
      let x = possibleMoves[i][0];
      let y = possibleMoves[i][1];
      if (
        move[0] + x <= 7 &&
        move[1] + y <= 7 &&
        move[0] + x >= 0 &&
        move[1] + y >= 0 &&
        board[move[0] + x][move[1] + y] === null
      ) {
        move[0] += possibleMoves[i][0];
        move[1] += possibleMoves[i][1];
        board[move[0]][move[1]] = 1;
        queue.push([...move]);
        // currentPath.push([...move]);
      }
    }
  }
  movesTotal = shortestPath.length - 2;
  console.log(`the shortest path is ${movesTotal}. Your path was:`);
  console.log(shortestPath);
  return;
}
knightMovesTwo([0, 0], [3, 3]);
// figure out how to reduce all possible moves => shortest path
/*
  current method is breadth first approach
  push moves into a list until it reaches the endpoint
  two lists, shortest moveset, and current
  if the current moveset is shorter, replaces shortest moveset
  go until all moves are made

  start at beginning
  when you reach the endpoint
    check how many moves it took (the "path")
    if it is shorter than the current shortest
      it becomes new shortest path
    
      repeat until all moves are made
*/
