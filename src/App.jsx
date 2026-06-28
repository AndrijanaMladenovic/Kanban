import data from "./data/data.json";
import { useState } from "react";
import SidebarBoards from "./components/SidebarBoards";
import BoardView from "./components/BoardView";
import Header from "./components/Header";

import { useSelector } from "react-redux";
import Modal from "./components/Modal";
import EditBoard from "./components/EditBoard";

function App() {
  const boards = useSelector((state) => state.boards);
  const selectedBoardIndex = useSelector(
    (state) => state.ui.selectedBoardIndex,
  );
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  const board = boards[selectedBoardIndex];
  return (
    <div
      className={`flex w-full h-screen overflow-hidden ${isDarkTheme ? "dark" : ""}`}>
      <SidebarBoards />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <BoardView board={board} boardIndex={selectedBoardIndex} />
      </div>
      <Modal />
    </div>
  );
}

export default App;
