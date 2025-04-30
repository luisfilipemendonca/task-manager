import Checkbox from "../../components/Checkbox";
import { Task } from "./types";

const TaskItem = ({ id, description }: Task) => {
  const deleteTaskHandler = () => {
    console.log(id);
  };

  const changeTaskStatusHandler = () => {
    console.log(id);
  };

  return (
    <li className="flex py-4">
      <Checkbox onChange={changeTaskStatusHandler} checked={false} />
      <div className="ml-4 flex flex-1 justify-between">
        <span className="mr-4">{description}</span>
        <button onClick={deleteTaskHandler}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
