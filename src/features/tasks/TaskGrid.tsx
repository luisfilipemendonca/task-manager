import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import TaskGridItem from "./TaskGridItem";
import { fetchTasks } from "./tasksSlice";

const TaskGrid = () => {
  const dispatch = useAppDispatch();
  const { tasks, status } = useAppSelector((state) => state.tasks);

  console.log(status, tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 h-full gap-8">
      <TaskGridItem title="Tasks" />
      <TaskGridItem title="In progress" />
      <TaskGridItem title="Completed" />
    </div>
  );
};

export default TaskGrid;
