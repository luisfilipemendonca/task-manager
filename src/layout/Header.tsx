const Header = () => {
  return (
    <header className="flex justify-between items-center h-15 px-10 bg-primary-200 border-b-1 border-b-primary-500">
      <h1 className="text-2xl text-primary-500 font-medium">Task Manager</h1>
      <div>
        <p className="text-primary-500">User information</p>
      </div>
    </header>
  );
};

export default Header;
