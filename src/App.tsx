import Header from "./layout/Header";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex" style={{ height: "calc(100% - 60px)" }}>
        <Navbar />
        <Main />
      </div>
    </div>
  );
};

export default App;
