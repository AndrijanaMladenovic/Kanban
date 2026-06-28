import React, { useState } from "react";
import data from "../data/data.json";
import plusIcon from "../assets/icon-add-task-mobile.svg";
import iconBoard from "../assets/icon-board.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTheme,
  setSelectedBoardIndex,
  hideSideBar,
} from "../redux/uiSlice";
import logo from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import sunIcon from "../assets/icon-light-theme.svg";
import moonIcon from "../assets/icon-dark-theme.svg";
import hide from "../assets/icon-hide-sidebar.svg";
import show from "../assets/icon-show-sidebar.svg";
import { openCreateNewBoard } from "../redux/uiSlice";
import CreateBoard from "./CreateBoard";

export default function SidebarBoards() {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  const enabled = useSelector((state) => state.ui.isDarkTheme);
  const toggleHideSideBar = useSelector((state) => state.ui.sideBar);
  const isBoardOpen = useSelector((state) => state.ui.isBoardOpen);
  const selectedBoardIndex = useSelector(
    (state) => state.ui.selectedBoardIndex,
  );

  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  if (!toggleHideSideBar) {
    return (
      <div className="hidden md:flex flex-col p-6 items-start cursor-pointer justify-between content-evenly bg-white w-72 h-screen shrink-0">
        <div className="flex gap-3 flex-col  ">
          <div className="p-6">
            {isDarkTheme ? (
              <img src={logoLight} alt="" className="h-6 w-auto " />
            ) : (
              <img src={logo} alt="" className="h-6 w-auto " />
            )}
          </div>
          <p className="heading-s text-secondary uppercase text-center">
            all boards <span>({boards.length})</span>
          </p>
          {boards.map((board, index) => {
            return (
              <div
                key={index}
                className={
                  selectedBoardIndex === index
                    ? "board-item-active"
                    : "board-item"
                }>
                <img src={iconBoard} alt="" />
                <button
                  className="headingM"
                  onClick={() => dispatch(setSelectedBoardIndex(index))}
                  key={index}>
                  {board.name}
                </button>
              </div>
            );
          })}
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => dispatch(openCreateNewBoard())}
              className="btn-secondary cursor-pointer">
              + Create New Board
            </button>
          </div>
        </div>
        <div>
          {isBoardOpen && <CreateBoard />}

          <div className="flex items-center gap-2">
            <img src={sunIcon} alt="" />
            <button
              onClick={() => dispatch(changeTheme())}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition
          ${enabled ? "bg-primary" : "bg-primary-hover"}`}>
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition
            ${enabled ? "translate-x-7" : "translate-x-0"}`}
              />
            </button>

            <img src={moonIcon} alt="" />
          </div>
          <div
            onClick={() => dispatch(hideSideBar())}
            className="flex items-center mt-4 gap-3">
            <img className="text-secondary" src={hide} alt="" />
            <span className="text-secondary headingS">Hide side bar</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => dispatch(hideSideBar())}
      className="hidden md:flex items-center gap-2 fixed left-0 bottom-8 cursor-pointer btn-primary">
      <img src={show} alt="" />
      <h1>Show side bar</h1>
    </div>
  );
}
