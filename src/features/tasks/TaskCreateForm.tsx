import {
  Dispatch,
  SetStateAction,
  RefObject,
  useMemo,
  useRef,
  FormEvent,
} from "react";
import { useAppSelector } from "../../app/hooks";
import Button from "../../components/Button";
import Select, { OptionProps, SelectApi } from "../../components/Select";
import Sidepanel from "../../components/Sidepanel";
import Textarea from "../../components/Textarea";
import { categoriesSelector } from "../categories/categoriesSlice";

type TaskCreateFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openElementRef: RefObject<HTMLButtonElement | null>;
};

const TaskCreateForm = ({
  isOpen,
  openElementRef,
  setIsOpen,
}: TaskCreateFormProps) => {
  const categories = useAppSelector(categoriesSelector);

  const categoryOptions = useMemo<OptionProps<void>[]>(() => {
    return categories.map((category) => ({
      id: category.id,
      label: category.description,
      value: category.id,
    }));
  }, [categories]);

  const selectRef = useRef<SelectApi<(typeof categoryOptions)[0]>>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCreateTaskSubmit = (e: FormEvent) => {
    e.preventDefault();

    const taskDescription = textareaRef.current?.value;
    const taskCategory = selectRef.current?.getSelectedOption()?.value;

    if (!taskDescription || !taskCategory) return;

    console.log(taskDescription, taskCategory);
  };

  return (
    <Sidepanel
      closeCallback={() => setIsOpen(false)}
      description="Create new task"
      isOpen={isOpen}
      openElement={openElementRef}
    >
      <Sidepanel.Header>Create new task</Sidepanel.Header>
      <Sidepanel.Body>
        <form id="create-task-form" onSubmit={handleCreateTaskSubmit}>
          <Textarea
            id="task-description"
            label="Task description"
            ref={textareaRef}
          />
          <Select
            type="normal"
            options={categoryOptions}
            label="Task category"
            id="task-category"
            selectApiRef={selectRef}
          />
        </form>
      </Sidepanel.Body>
      <Sidepanel.Footer>
        {({ closeCallback }) => (
          <>
            <Button type="button" variant="secondary" onClick={closeCallback}>
              Cancel
            </Button>
            <Button form="create-task-form">Submit</Button>
          </>
        )}
      </Sidepanel.Footer>
    </Sidepanel>
  );
};

export default TaskCreateForm;
