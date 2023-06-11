import { FC, ReactNode } from "react";
import { Navigation } from "../../components/Navigation/Navigation";

export interface PageWithNavigation {
  children: ReactNode;
}

export const PageWithNavigation: FC<PageWithNavigation> = ({ children }) => {
  return (
    <div className="w-full h-[100svh] flex flex-col justify-between items-start">
      <div className="w-full h-[calc(100svh_-_68px)] pl-[21px] pr-[21px] overflow-scroll">
        {children}
      </div>
      <Navigation />
    </div>
  );
};
