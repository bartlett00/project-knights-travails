function buildAdjList(board) {
  let possibleMoves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
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
        x: i,
        y: j,
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
  console.log({ begin, endpoint });
  let cursor;
  while (queue.length !== 0) {
    cursor = queue.shift();

    for (let i = 0; i < adjList[cursor.x][cursor.y].length; i++) {
      let neighborIndex = adjList[cursor.x][cursor.y][i];
      let neighborOnBoard = board[neighborIndex[0]][neighborIndex[1]];
      if (
        neighborOnBoard.x === endpointCoords[0] &&
        neighborOnBoard.y === endpointCoords[1]
      ) {
        neighborOnBoard.previous = cursor;
        let moveset = [];
        createMoveset(board, neighborOnBoard, moveset);
        console.log(`Your path was ${moveset.length} moves long.`);
        console.log("Your path:");
        console.log(moveset);
        return;
      } else {
        if (neighborOnBoard.distance === null) {
          neighborOnBoard.distance = cursor.distance + 1;
          neighborOnBoard.previous = cursor;
          queue.push(neighborOnBoard);
        }
      }
    }
  }

  function createMoveset(board, current, moves) {
    if (current.previous === null) {
      moves.unshift([begin.x, begin.y]);
      return;
    } else {
      let currentArr = [current.x, current.y];
      moves.unshift(currentArr);
      createMoveset(board, current.previous, moves);
    }
  }
  console.log(board[5][6]);
}
knightMovesBFS([0, 0], [3, 3]);
knightMovesBFS([3, 3], [0, 0]);
knightMovesBFS([0, 0], [7, 7]);
