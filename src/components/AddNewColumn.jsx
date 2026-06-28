import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddColumn } from "../redux/uiSlice";
import { addNewColumn } from "../redux/boardsSlice";

function AddNewColumn() {
  const [columnName, setColumnName] = useState("");
  const [taskName, setTaskName] = useState("");
  const { selectedBoardIndex } = useSelector((state) => state.ui);
  const [error, setError] = useState("");
  const [taskError, setTaskError] = useState("");

  const dispatch = useDispatch();

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeAddColumn())}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Add New Column</h1>

        <div className="flex flex-col gap-2 mt-6">
          <label className="modal-section-title">Column Name</label>
          <input
            className="subtask-item input-field"
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="modal-section-title">Add Task</label>
          <input
            className="subtask-item input-field"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {taskError && <p className="text-red-500 text-sm">{taskError}</p>}
        </div>

        <button
          className=" btn-primary w-full  mt-5"
          onClick={() => {
            if (!columnName.trim()) {
              setError("Column name is required");
              return;
            }

            if (!taskName.trim()) {
              setTaskError("Task name is required");
              return;
            }

            dispatch(
              addNewColumn({
                boardIndex: selectedBoardIndex,
                columnName,
                taskName,
              }),
            );

            dispatch(closeAddColumn());
          }}>
          Add Column
        </button>
      </div>
    </div>
  );
}

export default AddNewColumn;
