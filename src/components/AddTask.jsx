import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, deleteTask } from "../redux/boardsSlice";
import { closeAddTask, closeModal } from "../redux/uiSlice";
import crossIcon from "../assets/icon-cross.svg";
function AddTask() {
  const { selectedBoardIndex, colIndex } = useSelector((state) => state.ui);
  const boards = useSelector((state) => state.boards);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [subtasks, setSubtasks] = useState([{ title: "", isCompleted: false }]);

  const [subErr, setSubErr] = useState("");
  const [status, setStatus] = useState(
    boards[selectedBoardIndex].columns[colIndex].name,
  );

  const dispatch = useDispatch();

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        dispatch(closeAddTask());
      }}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h1 className="headingL">Add New Task</h1>

        <div className="flex flex-col form-field">
          <span className="headingS text-secondary">Title</span>
          <input
            className="subtask-item"
            type="text"
            placeholder="e.g. Take coffee break"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col form-field">
          <span className="headingS text-secondary">Description</span>
          <textarea
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
            className="subtask-item textarea-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col  form-field">
          <span className="headingS text-secondary">Subtasks</span>
          {subtasks.map((singleSubtasks, i) => (
            <div key={i} className="flex items-center gap-4 mb-3">
              <input
                className="subtask-item"
                placeholder="e.g. Make coffee"
                key={i}
                value={singleSubtasks.title}
                onChange={(e) => {
                  const updatedSubtasks = [...subtasks];
                  updatedSubtasks[i] = {
                    ...updatedSubtasks[i],
                    title: e.target.value,
                  };
                  setSubtasks(updatedSubtasks);
                }}
              />
              <button className="shrink-0 flex items-center justify-center">
                <img
                  src={crossIcon}
                  alt=""
                  onClick={() => {
                    setSubtasks(subtasks.filter((_, index) => index !== i));
                  }}
                />
              </button>
            </div>
          ))}
          {subErr && <p className="text-red-500">{subErr}</p>}
          <button
            className="btn-secondary"
            onClick={() =>
              setSubtasks([...subtasks, { title: "", isCompleted: false }])
            }>
            +Add New Subtask
          </button>
        </div>
        <div className="flex flex-col form-field ">
          <span className="headingS text-secondary">Status</span>
          <select
            className="subtask-item select-field"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}>
            {boards[selectedBoardIndex].columns.map((column, i) => (
              <option value={column.name} key={i}>
                {column.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn-primary w-full  mt-5"
          onClick={() => {
            if (!name.trim()) {
              setError("Task name is required");
              return;
            }
            if (subtasks.some((subtask) => !subtask.title.trim())) {
              setSubErr("Subtask cannot be empty");
              return;
            }
            dispatch(
              addNewTask({
                boardIndex: selectedBoardIndex,
                colIndex,
                title: name,
                description: description,
                subtasks: subtasks,
                status: status,
              }),
            );
            setName("");
            dispatch(closeAddTask());
            setDescription("");
            setSubtasks([{ title: "", isCompleted: false }]);
            setStatus(boards[selectedBoardIndex].columns[0].name);
            setError("");
            setSubErr("");
          }}>
          Create task
        </button>
      </div>
    </div>
  );
}

export default AddTask;
