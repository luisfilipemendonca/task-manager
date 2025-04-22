type BackdropProps = {
  clickCallback: () => void;
};

const Backdrop = ({ clickCallback }: BackdropProps) => {
  return (
    <div
      tabIndex={0}
      onClick={clickCallback}
      className="fixed h-full w-full bg-primary-500/60"
    ></div>
  );
};

export default Backdrop;
