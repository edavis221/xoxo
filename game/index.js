import { Map } from "immutable";

//player function
const getNextPlayer = current => {
  if (current === "X") {
    current = "O";
  } else {
    current = "X";
  }
  return current;
};

//bad function
const bad = (state, action) => {
  switch (action.type) {
    case MOVE:
      if (state.board.hasIn(action.position)) {
        return "Square is already taken!";
      }
      if (!action.position.every(el => el >= 0 && el <= 2)) {
        return `That's not right!`;
      }
    default:
      return null;
  }
};

const winner = board => {
  //row check
  for (let r = 0; r < 3; r++) {
    if (board.hasIn([r, 0])) {
      if (
        board.getIn([r, 1]) === board.getIn([r, 2]) &&
        board.getIn([r, 1]) === board.getIn([r, 0])
      ) {
        return board.getIn([r, 0]);
      }
    }
  }
  //column checker
  for (let c = 0; c < 3; c++) {
    if (board.hasIn([0, c])) {
      if (
        board.getIn([1, c]) === board.getIn([2, c]) &&
        board.getIn([1, c]) === board.getIn([0, c])
      ) {
        return board.getIn([0, c]);
      }
    }
  }
  //diagonal checker
  if (board.hasIn([0, 0])) {
    if (
      board.getIn([1, 1]) === board.getIn([2, 2]) &&
      board.getIn([1, 1]) === board.getIn([0, 0])
    ) {
      return board.getIn([0, 0]);
    }
  }
  if (board.hasIn([0, 2])) {
    if (
      board.getIn([1, 1]) === board.getIn([2, 0]) &&
      board.getIn([1, 1]) === board.getIn([0, 2])
    ) {
      return board.getIn([0, 2]);
    }
  }

  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      if (!board.getIn([r, c])) {
        return null;
      }
    }
  }
  return "Draw";
};

//Action Types
const MOVE = "MOVE";

//Action Creators
export const move = (turn, [x, y]) => ({
  type: MOVE,
  position: [x, y],
  turn: turn
});

const turnReducer = (turn = "X", action) => {
  switch (action.type) {
    case MOVE:
      return getNextPlayer(action.turn);
    default:
      return turn;
  }
};

const boardReducer = (board = Map(), action) => {
  switch (action.type) {
    case MOVE:
      return board.setIn(action.position, action.turn);
    default:
      return board;
  }
};

export default function reducer(
  state = { board: Map(), turn: "X", winner: null },
  action
) {
  const error = bad(state, action);
  if (error) {
    return Object.assign({}, state, {error});
  }
  switch (action.type) {
    case MOVE:
      const newBoard = boardReducer(state.board, action);
      const hasWon = winner(newBoard);
      return {
        board: newBoard,
        turn: turnReducer(state.turn, action),
        winner: hasWon
      };
    default:
      return state;
  }
}
