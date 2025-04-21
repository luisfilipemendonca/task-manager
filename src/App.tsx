import { useState } from "react";
import Sidepanel from "./components/Sidepanel";
import TaskGrid from "./features/tasks/TaskGrid";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-full">
      <Header />
      <div className="flex" style={{ height: "calc(100% - 60px)" }}>
        <Navbar />
        <Main>
          <TaskGrid />
        </Main>
      </div>
      <Sidepanel
        description="Create a resource"
        isOpen={isOpen}
        closeCallback={() => setIsOpen((prevState) => !prevState)}
      >
        <button onClick={() => console.log("teste")}>Teste</button>
        <button onClick={() => console.log("teste1")}>Teste 1</button>
      </Sidepanel>
    </div>
  );
};

export default App;
