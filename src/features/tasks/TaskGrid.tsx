import TaskGridItem from "./TaskGridItem";
import { TasksStatusGrid } from "./types";

const TASKS_STATUS_GRID: TasksStatusGrid[] = [
  {
    title: "Todo",
    status: "todo",
  },
  {
    title: "Progress",
    status: "progress",
  },
  {
    title: "Completed",
    status: "completed",
  },
];

const TaskGrid = () => {
  return (
    <div className="grid grid-cols-3 h-full gap-8">
      {TASKS_STATUS_GRID.map(({ status, title }) => (
        <TaskGridItem title={title} key={status} status={status} />
      ))}
    </div>
  );
};

export default TaskGrid;
