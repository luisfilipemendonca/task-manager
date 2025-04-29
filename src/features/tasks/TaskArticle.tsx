import { useAppSelector } from "../../app/hooks";
import { getCategoryBy } from "../categories/categoriesSlice";
import { Task } from "./types";

type TaskArticleProps = {
  categoryId: string;
  tasks: Task[];
};

const TaskArticle = ({ tasks, categoryId }: TaskArticleProps) => {
  const category = useAppSelector(getCategoryBy("id", categoryId));

  return (
    <article className="bg-primary-100 border-1 border-primary-500 rounded-sm not-last:mb-8">
      <header className="border-b border-primary-500 p-2 text-center font-bold text-primary-400">
        {category?.description ?? "Unknown"}
      </header>
      <ul className="py-2 px-4">
        {tasks.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </article>
  );
};

export default TaskArticle;
