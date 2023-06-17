import { FC, useEffect, useState } from "react";

export type ToasterProps = {
  index: number;
  start: boolean;
  time: number;
  message: string;
  subject: {
    icon: string;
    text: string;
  };
  onComplete: () => void;
};

export const Toaster: FC<ToasterProps> = ({
  index,
  start,
  time,
  message,
  subject,
  onComplete,
}) => {
  //

  const [percentage, setPercentage] = useState<number>(0);
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const timeout_ids: NodeJS.Timeout[] = [];
    if (start) {
      // complete after time
      timeout_ids.push(
        setTimeout(() => {
          timeout_ids.push(
            setTimeout(() => {
              onComplete();
            }, 200)
          );
          setAnimate(false);
        }, time)
      );
      // if index is 0 -> run
      index === 0 && run();
    }
    // reset
    return () => timeout_ids.forEach((id) => clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const run = () => {
    setPercentage(96);
  };

  // render
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
        <div className="w-[16px] h-[16px] bg-[#EAEAEA] rounded-full border-[2px] border-b-[#0099FF] border-r-[#0099FF] border-t-[#0099FF] animate-spin"></div>
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
