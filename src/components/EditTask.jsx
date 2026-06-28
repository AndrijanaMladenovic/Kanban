import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editTask,
  changeTaskStatus,
  deleteSubtask,
  editSubtask,
  addSubtask,
} from "../redux/boardsSlice";
import { closeEditTask, closeModal } from "../redux/uiSlice";
import iconCross from "../assets/icon-cross.svg";

function EditTask() {
  const dispatch = useDispatch();
  const { selectedBoardIndex, selectedTask, colIndex } = useSelector(
    (state) => state.ui,
  );
  const boards = useSelector((state) => state.boards);
  const board = boards[selectedBoardIndex];
  const task =
    boards[selectedBoardIndex].columns[selectedTask.colIndex].tasks[
      selectedTask.taskIndex
    ];
  if (!task) return null;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [status, setStatus] = useState(
    boards[selectedBoardIndex].columns[selectedTask.colIndex].name,
  );
  const [error, setError] = useState("");
  const [subError, setSubError] = useState("");

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        dispatch(closeModal());
      }}>
      <div className="modal-container " onClick={(e) => e.stopPropagation()}>
        <h1 className="modal-title">Edit Task</h1>
        <div className="flex flex-col">
          <input
            className="subtask-item"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col">
          <span className="modal-description headingS">Description</span>
          <textarea
            className="subtask-item textarea-field"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <span className="modal-description">Subtasks</span>
          {task.subtasks &&
            task.subtasks?.map((singleSubtask, i) => {
              return (
                <div
                  className="edit-subtask-row flex flex-row items-center gap-2 justify-evenly"
                  key={i}>
                  <input
                    className="edit-subtask-input"
                    type="text"
                    value={singleSubtask.title}
                    onChange={(e) =>
                      dispatch(
                        editSubtask({
                          boardIndex: selectedBoardIndex,
                          colIndex: selectedTask.colIndex,
                          taskIndex: selectedTask.taskIndex,
                          subtaskIndex: i,
                          title: e.target.value,
                        }),
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      dispatch(
                        deleteSubtask({
                          boardIndex: selectedBoardIndex,
                          colIndex: selectedTask.colIndex,
                          taskIndex: selectedTask.taskIndex,
                          subtaskIndex: i,
                        }),
                      )
                    }>
                    <img src={iconCross} alt="" />
                  </button>
                  {subError && <p className="text-red-500">{subError}</p>}
                </div>
              );
            })}
          <button
            className="btn-secondary"
            onClick={() =>
              dispatch(
                addSubtask({
                  boardIndex: selectedBoardIndex,
                  colIndex: selectedTask.colIndex,
                  taskIndex: selectedTask.taskIndex,
                }),
              )
            }>
            + Add New Subtask
          </button>
        </div>
        <div className="flex flex-col">
          <span className="modal-description">Current Status</span>
          <select
            className="modal-select"
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
          className="btn-primary   w-full  mt-5"
          onClick={() => {
            if (!title.trim()) {
              setError("Task name is required");
              return;
            }
            if (
              task.subtasks &&
              task.subtasks.some((subtask) => !subtask.title.trim())
            ) {
              setSubError("Subtask cannot be empty");
              return;
            }
            dispatch(
              editTask({
                boardIndex: selectedBoardIndex,
                colIndex: selectedTask.colIndex,
                taskIndex: selectedTask.taskIndex,
                title,
                description,
                subtasks: task.subtasks,
              }),
            );

            if (status !== task.status) {
              dispatch(
                changeTaskStatus({
                  boardIndex: selectedBoardIndex,
                  colIndex: selectedTask.colIndex,
                  taskIndex: selectedTask.taskIndex,
                  newStatus: status,
                }),
              );
            }
            dispatch(closeModal());
          }}>
          Save Change
        </button>{" "}
      </div>
    </div>
  );
}

export default EditTask;
