import React, { useState } from "react";
import logo from "../assets/logo-dark.svg";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddTask,
  openDeleteBoard,
  openEditBoard,
  setSelectedBoardIndex,
  openCreateNewBoard,
  changeTheme,
} from "../redux/uiSlice";
import DotsIcon from "../assets/icon-vertical-ellipsis.svg";
import EditBoard from "./EditBoard";
import CreateBoard from "./CreateBoard";
import DeleteBoard from "./DeleteBoard";
import iconUp from "../assets/icon-chevron-up.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import moonIcon from "../assets/icon-dark-theme.svg";
import sunIcon from "../assets/icon-light-theme.svg";
import logoMobile from "../assets/logo-mobile.svg";
import iconBoard from "../assets/icon-board.svg";
import iconAddTask from "../assets/icon-add-task-mobile.svg";

function Header() {
  const isAddTaskOpen = useSelector((state) => state.ui.isAddTaskOpen);
  const boards = useSelector((state) => state.boards);

  const [menuOpen, setMenuOpen] = useState(false);
  const { selectedBoardIndex, isEditBoardOpen, isDeleteBoardOpen } =
    useSelector((state) => state.ui);
  const board = boards[selectedBoardIndex];
  const dispatch = useDispatch();
  const [mobileBoardsOpen, setMobileBoardsOpen] = useState(false);

  const enabled = useSelector((state) => state.ui.isDarkTheme);
  const isBoardOpen = useSelector((state) => state.ui.isBoardOpen);

  return (
    <>
      <div className="h-16 md:h-20 px-4 md:px-6 flex items-center justify-between bg-white border-b border-grey-light w-full">
        <button
          className="flex items-center gap-2 min-w-0"
          onClick={() => setMobileBoardsOpen(!mobileBoardsOpen)}>
          <img
            src={logoMobile}
            alt="logo-mobile"
            className="block md:hidden h-6 w-auto shrink-0"
          />

          <h1 className="font-bold text-[18px] md:text-[24px] truncate min-w-0 max-w-[180px] md:max-w-none">
            {board?.name}
          </h1>

          <span className="md:hidden text-primary text-xs">
            {mobileBoardsOpen ? (
              <img src={iconUp} alt="" />
            ) : (
              <img src={iconDown} alt="" />
            )}
          </span>
        </button>

        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => dispatch(openAddTask({ colIndex: 0 }))}
            className="cursor-pointer btn-primary !h-8 !w-12 !px-0 md:!h-10 md:!w-auto md:!px-6">
            <img
              className=" md:hidden text-xl leading-none text-center "
              src={iconAddTask}
              alt=""
            />
            <span className="hidden md:inline">+ Add New Task</span>
          </button>

          {isAddTaskOpen && <AddTask />}

          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-5 h-8 flex items-center justify-center">
              <img src={DotsIcon} alt="" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
                <button
                  className="w-full text-left px-3 py-2 hover:bg-grey-light rounded"
                  onClick={() => {
                    dispatch(openEditBoard());
                    setMenuOpen(false);
                  }}>
                  Edit Board
                </button>

                <button
                  onClick={() => {
                    dispatch(openDeleteBoard());
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-grey-light rounded">
                  Delete Board
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileBoardsOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileBoardsOpen(false)}>
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[264px] bg-white rounded-lg shadow-lg py-4"
            onClick={(e) => e.stopPropagation()}>
            <p className="text-secondary uppercase px-6 mb-3 font-bold tracking-[2px]">
              all boards ({boards.length})
            </p>

            {boards.map((board, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(setSelectedBoardIndex(index));
                  setMobileBoardsOpen(false);
                }}
                className={
                  selectedBoardIndex === index
                    ? "board-item-active w-[240px]"
                    : "board-item w-[240px]"
                }>
                <img src={iconBoard} alt="" />
                {board.name}
              </button>
            ))}

            <button
              onClick={() => {
                dispatch(openCreateNewBoard());
                setMobileBoardsOpen(false);
              }}
              className="board-item !text-[#635FC7]">
              <img src={iconBoard} alt="" /> Create New Board
            </button>

            <div className="mx-4 mt-4 flex items-center justify-center gap-4 rounded-md bg-grey-bg py-3">
              <img src={sunIcon} alt="" />
              <button
                onClick={() => dispatch(changeTheme())}
                className={`w-14 h-7 flex items-center rounded-full p-1 transition
                       ${enabled ? "bg-primary" : "bg-primary-hover"}`}>
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition
                         ${enabled ? "translate-x-7" : "translate-x-0"}`}
                />
              </button>

              <img src={moonIcon} alt="" />
            </div>
          </div>
        </div>
      )}

      {isBoardOpen && <CreateBoard />}
      {isEditBoardOpen && <EditBoard />}
      {isDeleteBoardOpen && <DeleteBoard />}
    </>
  );
}

export default Header;
