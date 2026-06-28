import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../assets/icon-cross.svg";
import { createNewBoard, editBoard } from "../redux/boardsSlice";
import { closeEditBoard } from "../redux/uiSlice";

function EditBoard() {
  const { selectedBoardIndex, selectedTask, colIndex } = useSelector(
    (state) => state.ui,
  );
  const boards = useSelector((state) => state.boards);
  const [boardName, setBoardName] = useState(
    `${boards[selectedBoardIndex].name}`,
  );

  const [columns, setColumns] = useState(() =>
    boards[selectedBoardIndex].columns.map((column) => ({
      ...column,
      tasks: column.tasks || [],
    })),
  );
  const addColumn = () => {
    setColumns([...columns, { name: "", tasks: [] }]);
  };
  const dispatch = useDispatch();
  return (
    <div className="modal-overlay" onClick={() => dispatch(closeEditBoard())}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="headingL">Edit Board</h1>
        <div>
          <input
            className="subtask-item"
            type="text"
            value={boardName}
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="headingS text-secondary">Boards Columns</p>
          {columns.map((column, i) => (
            <div key={i} className="flex items-center gap-4 mb-3">
              <input
                className="subtask-item"
                value={column.name}
                key={i}
                onChange={(e) => {
                  const updatedColumns = [...columns];
                  updatedColumns[i] = {
                    ...updatedColumns[i],
                    name: e.target.value,
                  };
                  setColumns(updatedColumns);
                }}
              />
              <button
                className=" mt-3"
                onClick={() => {
                  setColumns(columns.filter((_, index) => index !== i));
                }}>
                <img src={crossIcon} alt="" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <button className="btn-secondary  w-full  mt-5" onClick={addColumn}>
            Add New Column
          </button>
          <button
            className="btn-primary  w-full  mt-5"
            onClick={() => {
              dispatch(
                editBoard({
                  boardIndex: selectedBoardIndex,
                  boardName,
                  columns,
                }),
                dispatch(closeEditBoard()),
              );
            }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBoard;
