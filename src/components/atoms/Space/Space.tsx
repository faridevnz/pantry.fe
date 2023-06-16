import { FC } from "react";
import { useApplicationMode } from "../../../hooks/ApplicationMode/ApplicationMode";
import classNames from "classnames";

interface Base {
  value: 4 | 7 | 14 | 28 | 56 | 112;
}
export interface SimpleSpaceProps extends Base {
  direction: "x" | "y";
  type: "simple";
}
export interface CombinedSpaceProps {
  type: "combined";
  direction: "x" | "y";
  spaces: Array<Base["value"]>;
}

export type SapceProps = SimpleSpaceProps | CombinedSpaceProps;

export const Space: FC<SapceProps> = (
  props = { type: "simple", direction: "x", value: 4 }
) => {
  const mode = useApplicationMode();

  const debug_classes =
    "border-dashed border-purple-300 border-[1px] bg-purple-50";

  // simple
  return props.type === "simple" ? (
    <>
      <div
        className={classNames(mode === "debug" ? debug_classes : "")}
        style={{
          width: props.direction === "x" ? `${props.value}px` : "100%",
          height: props.direction === "y" ? `${props.value}px` : "100%",
        }}
      ></div>
    </>
  ) : (
    // combined
    <>
      {props.spaces.map((space) => (
        <Space
          type="simple"
          direction={props.direction}
          value={space}
          key={Math.random()}
        />
      ))}
    </>
  );
};
