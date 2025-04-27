import { useRef, useState } from "react";

import Button from "../../components/Button";
import TaskCreateForm from "./TaskCreateForm";

const TasksCta = () => {
  const createTaskButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end mb-8">
      <Button ref={createTaskButtonRef} onClick={() => setIsOpen(true)}>
        Add task
      </Button>
      <TaskCreateForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        openElementRef={createTaskButtonRef}
      />
    </div>
  );
};

export default TasksCta;
