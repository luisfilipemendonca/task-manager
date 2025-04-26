import { useRef, useState } from "react";

import Button from "../../components/Button";
import CategoriesCreateForm from "./CategoriesCreateForm";

const CategoriesCreateButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} ref={buttonRef}>
        Create
      </Button>
      <CategoriesCreateForm
        isOpen={isOpen}
        openElementRef={buttonRef}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default CategoriesCreateButton;
