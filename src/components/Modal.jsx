import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openEditTask } from "../redux/uiSlice";
import {
  setSubtaskCompleted,
  changeTaskStatus,
  deleteTask,
} from "../redux/boardsSlice";
import editButtonIcon from "../assets/icon-vertical-ellipsis.svg";
import EditTask from "./EditTask";
import DeleteTaskModal from "./DeleteTaskModal";

function Modal() {
  const dispatch = useDispatch();
  const [editButton, setEditButton] = useState(false);
  const boards = useSelector((state) => state.boards);
  const { selectedBoardIndex, selectedTask, isModalOpen } = useSelector(
    (state) => state.ui,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isEditTaskOpen = useSelector((state) => state.ui.isEditOpen);

  const handleChange = (e) => {
    setEditButton(!editButton);
  };

  if (!isModalOpen || !selectedTask) return null;

  const task =
    boards?.[selectedBoardIndex]?.columns?.[selectedTask?.colIndex]?.tasks?.[
      selectedTask?.taskIndex
    ];

  if (!task) return null;
  const total = task.subtasks?.length || 0;

  const completedCount = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  return (
    <>
      {isEditTaskOpen ? (
        <EditTask />
      ) : (
        <div
          className="modal-overlay"
          onClick={() => {
            dispatch(closeModal());
            setEditButton(false);
          }}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              {/* HEADER */}
              <div className="flex items-start justify-between">
                <h1 className="modal-title">{task.title}</h1>
                <div className="relative">
                  <button
                    className="w-5 h-8 flex items-center justify-center"
                    onClick={handleChange}>
                    <img src={editButtonIcon} alt="menu" />{" "}
                  </button>
                  {editButton && (
                    <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg p-2 w-40 z-50">
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-grey-light rounded"
                        onClick={() => {
                          dispatch(
                            openEditTask({
                              boardIndex: selectedBoardIndex,
                              colIndex: selectedTask.colIndex,
                              taskIndex: selectedTask.taskIndex,
                            }),
                          );
                          setEditButton(false);
                        }}>
                        Edit Task
                      </button>
                      {/* DELETE BUTTON */}
                      <button
                        className="w-full text-left px-3 py-2 text-red-500 hover:bg-grey-light rounded"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setEditButton(false);
                        }}>
                        Delete Task
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* DESCRIPTION */}
              <p className="modal-description">{task.description}</p>
              {/* SUBTASKS TITLE */}
              <p className="status-label">
                Subtasks ({completedCount} of {total})
              </p>
              {/* SUBTASKS */}
              <div className="flex flex-col gap-3">
                {task.subtasks?.map((subtask, i) => (
                  <label key={i} className="subtask-row-display">
                    <input
                      type="checkbox"
                      checked={subtask.isCompleted}
                      onChange={() =>
                        dispatch(
                          setSubtaskCompleted({
                            boardIndex: selectedBoardIndex,
                            colIndex: selectedTask.colIndex,
                            taskIndex: selectedTask.taskIndex,
                            index: i,
                          }),
                        )
                      }
                    />
                    <span
                      className={
                        subtask.isCompleted
                          ? "subtask-text completed"
                          : "subtask-text"
                      }>
                      {subtask.title}
                    </span>
                  </label>
                ))}
              </div>
              {/* STATUS */}
              <div>
                <label className="status-label">Current Status</label>
                <select
                  value={task.status}
                  className="modal-select"
                  onChange={(e) => {
                    dispatch(
                      changeTaskStatus({
                        boardIndex: selectedBoardIndex,
                        colIndex: selectedTask.colIndex,
                        taskIndex: selectedTask.taskIndex,
                        newStatus: e.target.value,
                      }),
                    );
                    setEditButton(false);
                  }}>
                  {boards[selectedBoardIndex].columns.map((column, i) => (
                    <option value={column.name} key={i}>
                      {column.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* RENDER DELETE COMPONENT */}
      {showDeleteModal && (
        <DeleteTaskModal setShowDeleteModal={setShowDeleteModal} />
      )}
    </>
  );
}

export default Modal;
