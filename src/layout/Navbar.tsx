import { useEffect, useRef, useState } from "react";
import Sidepanel from "../components/Sidepanel";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Select, { SelectApi } from "../components/Select";

const Navbar = () => {
  const sidepanelButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<SelectApi>(null);

  useEffect(() => {
    setTimeout(() => {
      console.log(selectRef.current?.getSelectedOption());
    }, 2000);
  }, []);

  return (
    <nav
      className="fixed w-60 py-8 px-4 bg-primary-200 border-r-2 border-r-primary-400"
      style={{ height: "calc(100% - 60px)" }}
    >
      <ul>
        <li>
          <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-400 text-primary-100 mb-8 py-2 text-center text-xl">
            Primeiro
          </button>
        </li>
        <li>
          <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-300 text-primary-100 mb-8 py-2 text-center text-xl">
            Segundo
          </button>
        </li>
        <li>
          <button className="w-full hover:bg-primary-400 cursor-pointer border-1 border-primary-500 rounded-sm bg-primary-300 text-primary-100 mb-8 py-2 text-center text-xl">
            Terceiro
          </button>
        </li>
      </ul>
      <button
        className="focus:bg-amber-600"
        onClick={() => setIsOpen(true)}
        ref={sidepanelButtonRef}
      >
        Open Sidepanel
      </button>
      <Sidepanel<HTMLButtonElement>
        description="Create a resource"
        isOpen={isOpen}
        closeCallback={() => setIsOpen((prevState) => !prevState)}
        openElement={sidepanelButtonRef}
      >
        <Sidepanel.Header>
          <h2>Sidepanel title</h2>
        </Sidepanel.Header>
        <Sidepanel.Body>
          <Textarea label="Teste" id="textarea-id" />
          <Select
            id="select-id"
            label="Select test"
            selectApiRef={selectRef}
            options={[
              { id: "1", value: "valor 1", label: "Valor 1" },
              { id: "2", value: "valor 2", label: "Valor 2" },
              { id: "3", value: "valor 3", label: "Valor 3" },
              { id: "4", value: "valor 4", label: "Valor 4" },
              { id: "5", value: "valor 5", label: "Valor 5" },
              { id: "6", value: "valor 6", label: "Valor 6" },
              { id: "7", value: "valor 7", label: "Valor 7" },
              { id: "8", value: "valor 8", label: "Value 8" },
              { id: "9", value: "valor 9", label: "Valor 9" },
              { id: "10", value: "valor 10", label: "Valor 10" },
              { id: "11", value: "valor 11", label: "Valor 11" },
              { id: "12", value: "valor 12", label: "Valor 12" },
            ]}
          />
          <Select
            id="select-id"
            label="Select test"
            onSelect={(option) => {
              console.log(option);
            }}
            selectedOption={{ id: "1", value: "valor 1", label: "Valor 1" }}
            options={[
              { id: "1", value: "valor 1", label: "Valor 1" },
              { id: "2", value: "valor 2", label: "Valor 2" },
              { id: "3", value: "valor 3", label: "Valor 3" },
            ]}
            renderOption={({ option }) => (
              <span>{option.value} - from render option</span>
            )}
          />
        </Sidepanel.Body>
        <Sidepanel.Footer>
          {({ closeCallback }) => (
            <>
              <Button variant="secondary" onClick={closeCallback}>
                Close
              </Button>
              <Button>Submit</Button>
            </>
          )}
        </Sidepanel.Footer>
      </Sidepanel>
    </nav>
  );
};

export default Navbar;
