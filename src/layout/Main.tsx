import { PropsWithChildren } from "react";

type MainProps = PropsWithChildren;

const Main = ({ children }: MainProps) => {
  return (
    <main className="ml-60 p-8 pb-0 w-full flex flex-col">{children}</main>
  );
};

export default Main;
