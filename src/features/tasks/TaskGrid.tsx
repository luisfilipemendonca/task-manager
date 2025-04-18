import TaskGridItem from "./TaskGridItem";

const TaskGrid = () => {
  return (
    <div className="grid grid-cols-3 h-full gap-8">
      <TaskGridItem title="Tasks" />
      <TaskGridItem title="In progress" />
      <TaskGridItem title="Completed" />
    </div>
  );
};

export default TaskGrid;
