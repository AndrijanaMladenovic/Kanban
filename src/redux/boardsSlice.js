import data from "../data/data.json";
import { createSlice } from "@reduxjs/toolkit";

const savedBoards = JSON.parse(localStorage.getItem("boards")) || data.boards;

const boardsSlice = createSlice({
  name: "boards",
  initialState: savedBoards,

  reducers: {
    setSubtaskCompleted: (state, action) => {
      const { boardIndex, colIndex, taskIndex, index } = action.payload;

      const subtask =
        state[boardIndex].columns[colIndex].tasks[taskIndex].subtasks[index];

      subtask.isCompleted = !subtask.isCompleted;

      localStorage.setItem("boards", JSON.stringify(state));
    },

    changeTaskStatus: (state, action) => {
      const { boardIndex, colIndex, taskIndex, newStatus } = action.payload;
      const board = state[boardIndex];
      const newColIndex = board.columns.findIndex(
        (column) => column.name === newStatus,
      );
      if (newColIndex === -1) return;
      if (newColIndex === colIndex) return;
      const [task] = board.columns[colIndex].tasks.splice(taskIndex, 1);
      task.status = newStatus;
      board.columns[newColIndex].tasks.push(task);
    },
    deleteTask: (state, action) => {
      const { boardIndex, colIndex, taskIndex } = action.payload;
      const board = state[boardIndex];
      const column = board.columns[colIndex];
      column.tasks.splice(taskIndex, 1);
    },
    editTask: (state, action) => {
      const { boardIndex, colIndex, taskIndex, title, description, subtasks } =
        action.payload;
      const board = state[boardIndex];
      const column = board.columns[colIndex];
      const task = column.tasks[taskIndex];
      task.title = title;
      task.description = description;
      task.subtasks = subtasks;
      task.status = status;
    },
    addNewTask: (state, action) => {
      const { boardIndex, status, title, description, subtasks } =
        action.payload;
      const board = state[boardIndex];
      const column = board.columns.find((column) => column.name === status);
      if (!column) return;

      const newTask = {
        title,
        description,
        subtasks,
        status,
      };
      column.tasks.push(newTask);
    },
    createNewBoard: (state, action) => {
      const { boardName, columns } = action.payload;

      const newBoard = {
        name: boardName,
        columns,
      };
      state.push(newBoard);
    },
    addNewColumn: (state, action) => {
      const { boardIndex, columnName, taskName } = action.payload;
      const newColumn = {
        name: columnName,
        tasks: [{ title: taskName, subtasks: [] }],
      };
      state[boardIndex].columns.push(newColumn);
    },
    moveTask: (state, action) => {
      const { boardIndex, fromCol, fromTask, toCol, toTask } = action.payload;

      const board = state[boardIndex];

      const fromColumn = board.columns[fromCol];
      const toColumn = board.columns[toCol]; //

      if (!fromColumn || !toColumn) return;

      const [task] = fromColumn.tasks.splice(fromTask, 1);

      if (!task) return;

      // update status
      task.status = toColumn.name;

      // drop u praznu kolonu
      if (toTask === -1 || toTask === undefined || toTask === null) {
        toColumn.tasks.push(task);
      }
      // drop na poziciju
      else {
        toColumn.tasks.splice(toTask, 0, task);
      }
    },

    deleteSubtask: (state, action) => {
      const { boardIndex, colIndex, taskIndex, subtaskIndex } = action.payload;

      const task = state[boardIndex].columns[colIndex].tasks[taskIndex];

      task.subtasks.splice(subtaskIndex, 1);
    },
    editSubtask: (state, action) => {
      const { boardIndex, colIndex, taskIndex, subtaskIndex, title } =
        action.payload;

      state[boardIndex].columns[colIndex].tasks[taskIndex].subtasks[
        subtaskIndex
      ].title = title;
    },
    addSubtask: (state, action) => {
      const { boardIndex, colIndex, taskIndex } = action.payload;

      state[boardIndex].columns[colIndex].tasks[taskIndex].subtasks.push({
        title: "",
        isCompleted: false,
      });
    },
    editBoard: (state, action) => {
      const { boardIndex, boardName, columns } = action.payload;

      state[boardIndex].name = boardName;
      state[boardIndex].columns = columns;
    },
    deleteBoard: (state, action) => {
      const { boardIndex } = action.payload;

      state.splice(boardIndex, 1);
    },
  },
});

export const {
  setSubtaskCompleted,

  changeTaskStatus,
  deleteTask,
  editTask,
  addNewTask,
  createNewBoard,
  addNewColumn,
  moveTask,
  deleteSubtask,
  editSubtask,
  addSubtask,
  editBoard,
  deleteBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
