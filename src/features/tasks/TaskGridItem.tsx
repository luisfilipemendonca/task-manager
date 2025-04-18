import TaskArticle from "./TaskArticle";

type TaskGridItemProps = {
  title: string;
};

const TaskGridItem = ({ title }: TaskGridItemProps) => {
  return (
    <section className="relative">
      <div className="absolute h-full bg-primary-200 mx-[10%] w-[80%] -z-10 rounded-t-sm"></div>
      <div className="w-[80%] mx-[10%] z-10">
        <h2 className="text-center text-xl text-primary-500 font-medium border-b-2 border-b-primary-500 p-3">
          {title}
        </h2>
      </div>
      <div className="mt-8">
        <TaskArticle />
        <TaskArticle />
        <TaskArticle />
      </div>
    </section>
  );
};

export default TaskGridItem;
