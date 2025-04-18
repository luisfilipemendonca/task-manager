import Button from "../components/Button";

const Navbar = () => {
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
      <Button variant="primary" size="large">
        Teste botão
      </Button>
      <Button variant="secondary">Teste botão</Button>
    </nav>
  );
};

export default Navbar;
