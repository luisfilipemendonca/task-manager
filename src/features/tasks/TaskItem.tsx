import { useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import Checkbox from "../../components/Checkbox";
import { Task } from "./types";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { removeTask } from "./tasksSlice";

const TaskDeleteButton = ({ taskId }: { taskId: Task["id"] }) => {
  const dispatch = useAppDispatch();
  const deleteTaskButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button ref={deleteTaskButtonRef} onClick={() => setIsOpen(true)}>
        Delete
      </button>
      <Modal
        isOpen={isOpen}
        closeCallback={() => setIsOpen(false)}
        openElement={deleteTaskButtonRef}
        labelledBy="delete-task-title"
        describedBy="delete-task-description"
      >
        <Modal.Header>
          <h2 id="delete-task-title">Confirmation</h2>
        </Modal.Header>
        <Modal.Body>
          <p id="delete-task-description">
            Are you sure you want to delete this task?
          </p>
        </Modal.Body>
        <Modal.Footer>
          {({ closeCallback }) => {
            const deleteTaskHandler = () => {
              dispatch(removeTask(taskId));
              closeCallback();
            };

            return (
              <>
                <Button variant="secondary" onClick={closeCallback}>
                  Close
                </Button>
                <Button onClick={deleteTaskHandler}>Confirm</Button>
              </>
            );
          }}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const TaskItem = ({ id, description }: Task) => {
  const changeTaskStatusHandler = () => {
    console.log(id);
  };

  return (
    <li className="flex py-4">
      <Checkbox onChange={changeTaskStatusHandler} checked={false} />
      <div className="ml-4 flex flex-1 justify-between">
        <span className="mr-4">{description}</span>
        <TaskDeleteButton taskId={id} />
      </div>
    </li>
  );
};

export default TaskItem;
