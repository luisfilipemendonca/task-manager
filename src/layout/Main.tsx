import { PropsWithChildren } from "react";

type MainProps = PropsWithChildren;

const Main = ({ children }: MainProps) => {
  return <main className="ml-50 p-16 pb-0 w-full">{children}</main>;
};

export default Main;
