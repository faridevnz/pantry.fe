import React, { FC, ReactNode } from "react";
import { Navigation } from "../../components/molecules/Navigation/Navigation";
import { Space } from "../../components/atoms/Space/Space";

export interface PageWithNavigation {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

export const PageWithNavigation: FC<PageWithNavigation> = ({
  children,
  title,
  action,
  onScroll,
}) => {
  // render
  return (
    <div className="w-full h-[100svh] flex flex-col items-start overflow-hidden">
      {/* header */}
      <div className="w-full h-auto flex flex-col">
        <Space type="simple" direction="y" value={14} />
        <div className="w-full flex justify-between items-end px-[21px]">
          <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
            {title}
          </span>
          {action}
        </div>
        <Space type="simple" direction="y" value={14} />
      </div>

      {/* page content */}
      <div
        // h-[calc(100svh_-_68px)]
        className="w-full px-[21px] overflow-scroll"
        style={{ flex: "auto" }}
        onScroll={(event) => onScroll?.(event)}
      >
        {children}
      </div>

      {/* navbar */}
      <Navigation />
    </div>
  );
};
