import { useRef, useState } from "react";
import Sidepanel from "../components/Sidepanel";
import Textarea from "../components/Textarea";

const Navbar = () => {
  const sidepanelButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        <Textarea label="Teste" id="textarea-id" />
      </Sidepanel>
    </nav>
  );
};

export default Navbar;
