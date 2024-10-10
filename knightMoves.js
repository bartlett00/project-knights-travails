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
  let previous = null;
  queue.push([...begin]);
  // currentPath.push([...begin]);
  board[begin[0]][begin[1]] = 1;

  while (queue.length !== 0) {
    current = queue.shift();
    if (previous === null) {
      previous = [...current];
    }
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
        // console.log(shortestPath.length);
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
// knightMovesTwo([0, 0], [3, 3]);

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

      //recursively call on each move instead of using a queue structure
      //keeps track of the "path" automatically
*/

//come back to this later, not sure if list is building correctly
/*
  adjList:
    create arr to store list
    loop through length of board (8 rows, x 0 - 7)
    create arr to store neighbors of x index
    for each of the 8 possible moves:
      if move is on the board
        add it to neighors arr

    list for x index = neighbor arr
*/
function buildAdjList(board) {
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
  let adjList = [];
  for (let i = 0; i < 8; i++) {
    adjList.push([]);
  }

  for (let i = 0; i < board.length; i++) {
    for (let h = 0; h < board[i].length; h++) {
      let adjacencies = [];
      for (let j = 0; j < possibleMoves.length; j++) {
        let x = possibleMoves[j][0];
        let y = possibleMoves[j][1];
        if (
          board[i][h].x + x <= 7 &&
          board[i][h].x + x >= 0 &&
          board[i][h].y + y <= 7 &&
          board[i][h].y + y >= 0
        ) {
          let newX = board[i][h].x + x;
          let newY = board[i][h].y + y;
          let move = [newX, newY];
          adjacencies.push(move);
        }
      }
      adjList[i][h] = adjacencies;
    }
  }
  return adjList;
}

function knightMovesBFS(start, end) {
  let board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i].push({
        x: j,
        y: i,
        distance: null,
        previous: null,
      });
    }
  }

  let begin = board[start[0]][start[1]];
  let endpoint = board[end[0]][end[1]];
  let endpointCoords = [endpoint.x, endpoint.y];
  begin.distance = 0;
  let adjList = buildAdjList(board);
  let queue = [];
  queue.push(begin);
  // console.log(adjList);
  console.log({ begin, endpoint });
  let cursor = queue.shift();
  while (cursor.x != endpointCoords[0] && cursor.y != endpointCoords[1]) {
    if (queue.length > 0) {
      cursor = queue.shift();
    }
    for (let i = 0; i < adjList[cursor.x][cursor.y].length; i++) {
      let neighborIndex = adjList[cursor.x][cursor.y][i];
      if (neighborIndex === endpointCoords) {
        board[neighborIndex.x][neighborIndex.y].previous = [cursor.x, cursor.y];
        let moveset = [];
        createMoveset(board, neighborIndex, moveset);
        console.log(`Your path was ${moveset.length} moves long.`);
        console.log("Your path was:");
        console.log(moveset);
      } else {
        if (neighborIndex.distance === null) {
          neighborIndex.distance = cursor.distance + 1;
          neighborIndex.previous = [cursor.x, cursor.y];
          queue.push(neighborIndex);
        }
      }
    }
  }

  function createMoveset(board, index, moves) {
    if (index.previous === null) {
      return;
    } else {
      moves.unshift([index.x, index.y]);
      createMoveset(board, index.previous, moves);
    }
  }
}
knightMovesBFS([0, 0], [3, 3]);
