import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import TaskGrid from "./features/tasks/TaskGrid";
import Header from "./layout/Header";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";

import { getCategories } from "./features/categories/categoriesSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="h-full">
      <Header />
      <div className="flex" style={{ height: "calc(100% - 60px)" }}>
        <Navbar />
        <Main>
          <TaskGrid />
        </Main>
      </div>
    </div>
  );
};

export default App;
