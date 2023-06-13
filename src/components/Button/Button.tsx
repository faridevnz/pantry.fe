import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonProps = {
  variant: "fill" | "link";
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
  //
  const fill = "bg-[#0099FF] text-white";
  const link = "bg-none underline text-[#0099FF]";

  return (
    <>
      <button
        {...props}
        className={classNames(
          "flex gap-[14px] pl-[14px] pr-[14px] pt-[2px] pb-[2px] h-[30px] rounded-[4px] text-[14px] font-extrabold justify-between items-center disabled:bg-[#E0E5EA] disabled:text-[#566A7E]",
          props.variant === "fill" ? fill : link,
          props.className
        )}
      >
        {props.icon && <span>{props.icon}</span>}
        {props.children}
      </button>
    </>
  );
});
