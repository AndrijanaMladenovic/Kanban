import React from "react";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";

import AddNewColumn from "./AddNewColumn";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createNewBoard, moveTask } from "../redux/boardsSlice";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

import { openAddColumn, openCreateNewBoard } from "../redux/uiSlice";
import CreateBoard from "./CreateBoard";

export default function BoardView({ board, boardIndex }) {
  const selectedBoardIndex = useSelector(
    (state) => state.ui.selectedBoardIndex,
  );
  const isBoardOpen = useSelector((state) => state.ui.isBoardOpen);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, //
      },
    }),
  );
  const dispatch = useDispatch();
  const isAddColumnOpen = useSelector((state) => state.ui.isAddColumnOpen);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over?.id) return;

    // -------------------------
    // FROM (task koji vučeš)
    // -------------------------
    const activeParts = active.id.split("-").map(Number);
    const fromCol = activeParts[0];
    const fromTask = activeParts[1];

    if (isNaN(fromCol) || isNaN(fromTask)) return;

    // -------------------------
    // TO (gdje dropaš)
    // -------------------------
    let toCol;
    let toTask;

    // CASE 1: drop na praznu kolonu
    if (over.id.startsWith("col-")) {
      toCol = Number(over.id.replace("col-", ""));
      toTask = -1; // <- znači "append"
    }

    // CASE 2: drop na task
    else {
      const overParts = over.id.split("-").map(Number);
      toCol = overParts[0];
      toTask = overParts[1];
    }

    if (isNaN(toCol)) return;

    // -------------------------
    // DISPATCH
    // -------------------------
    dispatch(
      moveTask({
        boardIndex: selectedBoardIndex, // ili 0 ako tako koristiš
        fromCol,
        fromTask,
        toCol,
        toTask,
      }),
    );
  };
  if (!board) {
    return (
      <section className="flex-1 bg-grey-bg flex flex-col items-center justify-center text-center px-6">
        <p className="headingL text-secondary mb-6">
          There are no boards. Create a new board to get started.
        </p>

        <button
          className="btn-primary"
          onClick={() => dispatch(openCreateNewBoard())}>
          + Create New Board
        </button>

        {isBoardOpen && <CreateBoard />}
      </section>
    );
  }

  return (
    <section className="flex gap-6 p-4 md:p-6 overflow-x-auto bg-grey-bg flex-1 w-full max-w-full">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} key={boardIndex}>
        {board.columns.map((col, colIndex) => (
          <Column
            key={colIndex}
            column={col}
            colIndex={colIndex}
            boardIndex={boardIndex}
          />
        ))}
      </DndContext>
      <div className="new-column">
        <button onClick={() => dispatch(openAddColumn())} className="">
          +New Column
        </button>
      </div>
      {isAddColumnOpen && <AddNewColumn />}
    </section>
  );
}
