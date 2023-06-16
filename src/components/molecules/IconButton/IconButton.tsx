import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Button } from "./../../atoms/Button/Button";

export type ButtonProps = {
  variant: "fill" | "link";
  icon: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props) => {
    //
    return (
      <>
        <Button {...props}>
          {/* icon */}
          <span>{props.icon}</span>
          {/* content */}
          {props.children}
        </Button>
      </>
    );
  }
);
