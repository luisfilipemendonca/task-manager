const Header = () => {
  return (
    <header className="flex justify-between items-center h-15 px-10 bg-primary-400 border-b-2 border-b-primary-400">
      <h1 className="text-2xl text-primary-100 font-medium">Task Manager</h1>
      <div>
        <p className="text-primary-100">User information</p>
      </div>
    </header>
  );
};

export default Header;
