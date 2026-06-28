import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeCreateNewBoard, closeModal } from "../redux/uiSlice";
import { createNewBoard } from "../redux/boardsSlice";

function CreateBoard() {
  const [boardName, setBoardName] = useState("");
  const [columnsName, setColumnsName] = useState("");
  const [columns, setColumns] = useState([{ name: "" }]);
  const [error, setError] = useState("");
  const [colError, setColError] = useState("");
  const dispatch = useDispatch();

  const addColumn = () => {
    setColumns([...columns, { name: "" }]);
  };

  const handleColumnChange = (index, value) => {
    const updated = [...columns];
    updated[index].name = value;
    setColumns(updated);
  };
  return (
    <div
      className="modal-overlay "
      onClick={() => {
        dispatch(closeCreateNewBoard());
      }}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="headingL pb-4">Add New Board</h1>
        <div className="flex flex-col">
          <span className="text-secondary">Board Name</span>
          <input
            placeholder="e.g Web Design"
            className="subtask-item"
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}
        </div>

        <span className="text-secondary">Columns</span>
        {columns.map((col, i) => (
          <input
            key={i}
            className="subtask-item "
            placeholder="Add new column"
            type="text"
            value={col.name}
            onChange={(e) => handleColumnChange(i, e.target.value)}
          />
        ))}
        {colError && <p className="text-red-500">{colError}</p>}
        <div className="flex flex-col items-center">
          <button onClick={addColumn} className="btn-secondary  w-full  mt-5">
            +Add New Column
          </button>

          <button
            className="btn-primary w-full  mt-5"
            onClick={() => {
              if (!boardName.trim()) {
                setError("Board name is required");
                return;
              }
              if (columns.every((col) => !col.name.trim())) {
                setColError("At least one column name is required");
                return;
              }
              setError("");
              setColError("");
              dispatch(
                createNewBoard({
                  boardName,
                  columns: columns.map((column) => ({
                    name: column.name,
                    tasks: [],
                  })),
                }),
              );
              dispatch(closeCreateNewBoard());
            }}>
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBoard;
