import classNames from "classnames";
import { FC } from "react";

export interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  // template
  return (
    <div className="w-full bg-[#E0E5EA] h-[8px] rounded-[4px] relative">
      <div
        className={classNames(
          `bg-[#566A7E] absolute h-full rounded-[4px] duration-1000 transition-[width]`
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
