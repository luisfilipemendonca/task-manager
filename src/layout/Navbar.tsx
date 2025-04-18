const Navbar = () => {
  return (
    <nav
      className="fixed w-50 p-8 bg-primary-200 border-r-1 border-r-primary-500"
      style={{ height: "calc(100% - 60px)" }}
    >
      <ul>
        <li>Primeiro</li>
        <li>Segundo</li>
        <li>Terceiro</li>
      </ul>
    </nav>
  );
};

export default Navbar;
