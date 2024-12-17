import { BoardComponent } from "./components";
import "./App.scss";
import { Board } from "./models/Board";
import { useEffect, useState } from "react";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer, _] = useState(new Player(Colors.WHITE));
  const [blackPlayer, __] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        board={board}
        setBoard={setBoard}
      />
      <div>
        <LostFigures title="Черные фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
