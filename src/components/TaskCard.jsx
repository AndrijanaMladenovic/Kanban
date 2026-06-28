import { useDispatch } from "react-redux";
import { openModal } from "../redux/uiSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, subtract } from "@dnd-kit/utilities";

function TaskCard({ task, colIndex, taskIndex }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${colIndex}-${taskIndex}`,
      data: { colIndex, taskIndex },
    });
  const dispatch = useDispatch();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const total = task.subtasks.length;
  const completedCount = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  if (!task) return null;

  return (
    <div
      className="column-card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(openModal({ colIndex, taskIndex }));
      }}>
      <h3 className="headingM">{task.title}</h3>
      <span className="headingS text-secondary">
        {completedCount} of {total} subtasks
      </span>
    </div>
  );
}

export default TaskCard;
