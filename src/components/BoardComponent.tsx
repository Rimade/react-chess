import { useState, Fragment, useEffect } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { type Player } from "../models/Player";

interface IBoardProps {
  board: Board;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<IBoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок: {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                onClick={() => click(cell)}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                cell={cell}
                key={cell.id}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
