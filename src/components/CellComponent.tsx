import React from "react";
import { Cell } from "../models/Cell";

interface ICellProps {
  cell: Cell;
  selected: boolean;
  onClick: (cell: Cell) => void;
}

const CellComponent: React.FC<ICellProps> = ({ cell, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(cell)}
      className={["cell", cell.color, selected && "selected"].join(" ")}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} />}
    </div>
  );
};

export default CellComponent;
