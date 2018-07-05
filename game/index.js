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

const winner = (board) => {
  //row check
  for (let r = 0; r < 3; r++) {
    if (board.hasIn([r, 0])) {
      if (board.getIn([r, 1]) === board.getIn([r, 2] === board.getIn([r, 0]))) {
        return board.getIn([r, 0]);
      }
    }
  }
  //column checker
  for (let c = 0; c < 3; c++) {
    if (board.hasIn([0, c])) {
      if (board.getIn([1, c]) === board.getIn([2, c] === board.getIn([0, c]))) {
        return board.getIn([0, c]);
      }
    }
  }
  //diagonal checker
  if (board.hasIn([0, 0])) {
    if (board.getIn([1, 1]) === board.getIn([2, 2] === board.getIn([0, 0]))) {
      return board.getIn([0, 0]);
    }
  }
  if (board.hasIn([0, 2])) {
    if (board.getIn([1, 1]) === board.getIn([2, 0] === board.getIn([0, 2]))) {
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
  return 'Draw'
};

//Action Types
const MOVE = "MOVE";

//Action Creators
export const move = (turn, [x, y]) => ({
  type: MOVE,
  position: [x, y],
  turn: turn
});

const turnReducer = (turn='X', action) => {

}

const boardReducer = (board=Map(), action) => {
  
}

export default function reducer(state = { board: board, turn: "X" }, action) {
  switch (action.type) {
    // case START:
    // return state
    case MOVE:
      return {
        board: state.board.setIn(action.position, action.turn),
        turn: getNextPlayer(action.turn)
      };
    default:
      return state;
  }
}
