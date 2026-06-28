import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard } from "../redux/boardsSlice";
import { closeDeleteBoard } from "../redux/uiSlice";

function DeleteBoard() {
  const boards = useSelector((state) => state.boards);
  const { selectedBoardIndex } = useSelector((state) => state.ui);

  const board = boards[selectedBoardIndex];
  const dispatch = useDispatch();

  return (
    <div
      className=" modal-overlay "
      onClick={() => dispatch(closeDeleteBoard())}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold">Delete this Board?</h2>

        <p className="text-grey-medium mt-2">
          Are you sure you want to delete the {board?.name}
          board? This action function will remove all columns and tasks and
          cannot be reversed
        </p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() =>
              dispatch(
                deleteBoard({
                  boardIndex: selectedBoardIndex,
                }),
                dispatch(closeDeleteBoard()),
              )
            }
            className="btn-danger">
            Delete
          </button>
          <button
            onClick={() => dispatch(closeDeleteBoard())}
            className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBoard;
