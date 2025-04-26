import { Dispatch, FormEvent, RefObject, SetStateAction, useRef } from "react";
import { useAppDispatch } from "../../app/hooks";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Sidepanel from "../../components/Sidepanel";
import { postCategory } from "./categoriesSlice";

type CategoriesCreateFormProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openElementRef: RefObject<HTMLButtonElement | null>;
};

const CategoriesCreateForm = ({
  isOpen,
  setIsOpen,
  openElementRef,
}: CategoriesCreateFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleCreateCategorySubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputRef.current?.value) {
      dispatch(postCategory(inputRef.current.value));
    }
  };

  return (
    <Sidepanel
      isOpen={isOpen}
      description="Create category"
      openElement={openElementRef}
      closeCallback={() => setIsOpen(false)}
    >
      <Sidepanel.Header>Create category</Sidepanel.Header>
      <Sidepanel.Body>
        <form id="create-category-form" onSubmit={handleCreateCategorySubmit}>
          <Input label="Category name" id="category-name" ref={inputRef} />
        </form>
      </Sidepanel.Body>
      <Sidepanel.Footer>
        {({ closeCallback }) => (
          <>
            <Button type="button" variant="secondary" onClick={closeCallback}>
              Cancel
            </Button>
            <Button form="create-category-form">Save</Button>
          </>
        )}
      </Sidepanel.Footer>
    </Sidepanel>
  );
};

export default CategoriesCreateForm;
