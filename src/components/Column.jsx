import React from "react";
import Task from "./TaskCard.jsx";
import TaskCard from "./TaskCard.jsx";
import { openAddTask } from "../redux/uiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./AddTask.jsx";
import { useSortable } from "@dnd-kit/sortable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function Column({ column, colIndex }) {
  const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];
  const { setNodeRef, isOver } = useDroppable({
    id: `col-${colIndex}`,
  });
  const { isAddTaskOpen, selectedColIndex } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const tasks = column.tasks || [];
  return (
    <div
      className={`w-[280px] min-w-[280px] shrink-0 flex flex-col gap-6 ${
        isOver ? "bg-purple-100" : ""
      }`}
      ref={setNodeRef}>
      <div className="flex gap-3 items-center">
        <span
          className="w-4 h-4 rounded-full shrink-0"
          style={{
            backgroundColor: columnColors[colIndex % columnColors.length],
          }}></span>
        <h1 className="headingS text-secondary uppercase tracking-[2.4px]">
          {column.name} ({tasks.length})
        </h1>
      </div>

      <SortableContext
        items={tasks.map((_, i) => `${colIndex}-${i}`)}
        strategy={verticalListSortingStrategy}>
        {tasks.length === 0 ? (
          <div className="text-gray-400 italic mt-4">
            <button
              className="btn-primary"
              onClick={() => dispatch(openAddTask({ colIndex }))}>
              Add Task
            </button>

            {isAddTaskOpen && selectedColIndex === colIndex && <AddTask />}
          </div>
        ) : (
          tasks.map((task, taskIndex) => (
            <TaskCard
              key={taskIndex}
              task={task}
              colIndex={colIndex}
              taskIndex={taskIndex}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
}

export default Column;
