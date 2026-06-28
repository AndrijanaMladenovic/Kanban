import React from "react";
import { deleteTask } from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/uiSlice";

function DeleteTaskModal({ setShowDeleteModal }) {
  const { selectedBoardIndex, selectedTask, isModalOpen } = useSelector(
    (state) => state.ui,
  );

  const dispatch = useDispatch();
  return (
    <div
      className=" modal-overlay "
      onClick={() => {
        setShowDeleteModal(false);
      }}>
      <div className="modal-container">
        <h2 className="text-lg font-bold">Delete this task?</h2>

        <p className="text-grey-medium mt-2">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              dispatch(
                deleteTask({
                  boardIndex: selectedBoardIndex,
                  colIndex: selectedTask.colIndex,
                  taskIndex: selectedTask.taskIndex,
                }),
              );
              setShowDeleteModal(false);
              dispatch(closeModal());
            }}
            className="btn-danger">
            Delete
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskModal;
