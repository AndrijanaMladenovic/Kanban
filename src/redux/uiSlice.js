import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBoardIndex: 0,
  // isModalOpen: false,
  // isEditOpen: false,
  isModalOpen: true,
  isEditOpen: true,
  selectedTask: null,
  isEditBoardOpen: false,
  isDarkTheme: false,
  sideBar: false,
  isAddTaskOpen: false,
  isBoardOpen: false,
  isAddColumnOpen: false,
  colIndex: null,
  isDeleteBoardOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedBoardIndex: (state, action) => {
      state.selectedBoardIndex = action.payload;
    },
    openModal: (state, action) => {
      state.selectedTask = action.payload; // {colIndex, taskIndex}
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedTask = null;
      state.isEditOpen = false;
    },
    changeTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    hideSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    openEditTask: (state, action) => {
      state.selectedTask = action.payload;
      state.isEditOpen = true;
    },
    closeEditTask: (state) => {
      state.isEditOpen = false;
    },
    openAddTask: (state, action) => {
      state.isAddTaskOpen = true;
      state.colIndex = action.payload.colIndex;
    },
    closeAddTask: (state) => {
      state.isAddTaskOpen = false;
      state.colIndex = null;
    },
    openCreateNewBoard: (state) => {
      state.isBoardOpen = true;
      state.colIndex = null;
    },
    closeCreateNewBoard: (state) => {
      state.isBoardOpen = false;
    },
    openAddColumn: (state) => {
      state.isAddColumnOpen = true;
    },
    closeAddColumn: (state) => {
      state.isAddColumnOpen = false;
    },
    openEditBoard: (state) => {
      state.isEditBoardOpen = true;
    },
    closeEditBoard: (state) => {
      state.isEditBoardOpen = false;
    },
    openDeleteBoard: (state) => {
      state.isDeleteBoardOpen = true;
    },
    closeDeleteBoard: (state) => {
      state.isDeleteBoardOpen = false;
    },
  },
});

export const {
  setSelectedBoardIndex,
  openModal,
  closeModal,
  closeEditBoard,
  openEditBoard,
  changeTheme,
  hideSideBar,
  openEditTask,
  openAddTask,
  closeEditTask,
  closeAddTask,
  openCreateNewBoard,
  closeCreateNewBoard,
  openAddColumn,
  closeAddColumn,
  openDeleteBoard,
  closeDeleteBoard,
} = uiSlice.actions;
export default uiSlice.reducer;
