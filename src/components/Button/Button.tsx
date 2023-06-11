import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonProps = {
  variant: "fill" | "outline" | "link";
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
  return (
    <>
      <button
        className={classNames(
          "flex gap-[14px] pl-[14px] pr-[14px] pt-[2px] pb-[2px] h-[30px] rounded-[4px] text-[14px] font-extrabold justify-between items-center",
          props.variant === "fill" ? "bg-[#0099FF] text-white" : ""
        )}
        {...props}
      >
        {props.icon && <span>{props.icon}</span>}
        {props.children}
      </button>
    </>
  );
});
