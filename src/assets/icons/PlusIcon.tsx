import { SVGAttributes } from "react";

export const PlusIcon = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M14 8H8v6H6V8H0V6h6V0h2v6h6v2Z" />
  </svg>
);
