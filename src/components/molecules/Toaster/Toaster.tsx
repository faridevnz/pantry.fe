import { FC, useEffect, useRef, useState } from "react";
import { Toaster as ToasterType } from "../../../context/Toaster/ToasterContext";
import classNames from "classnames";

export type ToasterProps = {
  index: number;
  type: ToasterType["type"];
  start: boolean;
  time: number;
  message: string;
  subject: {
    icon: string;
    text: string;
  };
  // callbacks
  onComplete: () => void;
};

export const Toaster: FC<ToasterProps> = ({
  index,
  type,
  start,
  time,
  message,
  subject,
  // callbacks
  onComplete,
}) => {
  //

  const [percentage, setPercentage] = useState<number>(0);
  const [outcome, setOutcome] = useState<typeof type>(type);
  const [animate, setAnimate] = useState<boolean>(false);
  const delayed = useRef<boolean>(false);

  // effects

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const timeout_ids: NodeJS.Timeout[] = [];
    if (start) {
      // complete after time
      timeout_ids.push(
        setTimeout(() => {
          // check to close or await for complete
          if (outcome !== "async") timeout_ids.push(complete());
          else delayed.current = true;
        }, time)
      );
      // if index is 0 -> run
      index === 0 && run();
    }
    // reset
    return () => timeout_ids.forEach((id) => clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    const timeout_ids: NodeJS.Timeout[] = [];
    if (["success", "error"].includes(type) && start) {
      setOutcome(type);
      timeout_ids.push(
        setTimeout(
          () => {
            complete();
          },
          delayed.current ? 500 : time
        )
      );
    }
    // return
    return () => timeout_ids.forEach((t_id) => clearTimeout(t_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, start]);

  // functions

  const complete = (): NodeJS.Timeout => {
    setAnimate(false);
    return setTimeout(() => {
      onComplete();
    }, 200);
  };

  const run = () => {
    setPercentage(96);
  };

  // render
  const loaderStyle: {
    [k in typeof type]: string;
  } = {
    async:
      "bg-[#EAEAEA] border-[2px] border-b-[#0099FF] border-r-[#0099FF] border-t-[#0099FF] animate-spin",
    success: "border-[3px] border-[#10C700]",
    error: "border-[3px] border-[#F25700]",
    info: "hidden",
  };

  return (
    <div
      className="fixed bottom-[-100px] left-[10px] right-[10px] rounded-[10px] border-[2px] border-[#e5e7eb] bg-white flex flex-col gap-[2px] items-center p-[20px]"
      style={{
        zIndex: 1000 - index,
        transform: `translateY(-${index * (10 - index)}px)`,
        scale: `${1 - index / 50}`,
        transition: "bottom 200ms ease-in-out, scale 300ms ease-in-out",
        bottom: animate ? "100px" : "-100px",
      }}
    >
      <div className="w-full flex justify-between items-center">
        {/* subject */}
        <div className="flex gap-[6px]">
          <span className="text-[14px] text-[#3E4954] font-semibold">
            {subject.icon}
          </span>
          <span className="text-[14px] text-[#3E4954] font-semibold">
            {subject.text}
          </span>
        </div>
        {/* loader */}
        <div
          className={classNames(
            "w-[16px] h-[16px] rounded-full transition-all duration-200 delay-500",
            loaderStyle[outcome]
          )}
        ></div>
      </div>
      <div className="w-full flex items-center">
        <span className="text-[12px] text-[#3E4954] font-medium">
          {message}
        </span>
      </div>
      {/* bottom bar */}
      <div
        className="border-b-[3px] border-[#0099FF] left-[2%] absolute bottom-[-2px] h-[1px] w-0 rounded-full"
        style={{
          transition: `all ${time}ms ease-in-out`,
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
