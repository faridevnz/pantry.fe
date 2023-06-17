import { useEffect, useState } from "react";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/atoms/Space/Space";
import classNames from "classnames";
import { Button } from "../../components/atoms/Button/Button";

// const onPageScroll = () => {
//   console.log("scrolllll ....");
//   // check if the first element is in the viewport
//   const top_element = document.getElementById("0");
//   const top_el_sizes = top_element?.getBoundingClientRect();
//   // check if the laste element is in the viewport
//   const bottom_element = document.getElementById(`${days.length - 1}`);
//   const bottom_el_sizes = bottom_element?.getBoundingClientRect();
//   // viewport
//   const vh = document.body.getBoundingClientRect().height;
//   //
// };

// month names
const month_names = [
  "Gen",
  "Feb",
  "Mar",
  "Apr",
  "Mag",
  "Giu",
  "Lug",
  "Ago",
  "Set",
  "Ott",
  "Nov",
  "Dic",
];

// day names
const day_names = [
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato",
  "domenica",
];

export const Planning = () => {
  const [cursor] = useState<number>(new Date().valueOf());
  const [days, setDays] = useState<number[]>([]);
  const [autoscroll, setAutoscroll] = useState<boolean>(true);
  const day_millis = 24 * 60 * 60 * 1000;

  useEffect(() => {
    setDays([
      cursor - day_millis * 2,
      cursor - day_millis * 1,
      cursor,
      cursor + day_millis * 1,
      cursor + day_millis * 2,
      cursor + day_millis * 3,
      cursor + day_millis * 4,
      cursor + day_millis * 5,
      cursor + day_millis * 6,
      cursor + day_millis * 7,
      cursor + day_millis * 8,
      cursor + day_millis * 9,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  useEffect(() => {
    //
    const today_node = document.getElementById("today");
    if (autoscroll && today_node) {
      today_node.scrollIntoView();
      setAutoscroll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const isToday = (timestamp: number): boolean => {
    return (
      new Date(timestamp).toLocaleDateString() ===
      new Date().toLocaleDateString()
    );
  };

  // render
  return (
    <PageWithNavigation
      title="PLANNING"
      action={
        <div className="w-full flex justify-end items-end">
          <div className="flex gap-[6px]">
            <Button variant="fill">Oggi</Button>
          </div>
        </div>
      }
    >
      {/* days */}
      {days.map((day, index) => (
        <div key={index} id={isToday(day) ? "today" : `${index}`}>
          <Space type="simple" direction="y" value={14} />
          <div className="w-full flex justify-between items-end" key={index}>
            <div className="flex gap-[16px] items-end">
              <span
                className={classNames(
                  "text-[50px] font-bold leading-[42px]",
                  isToday(day) ? "text-[#0099FF]" : "text-[#3E4954]"
                )}
              >
                {new Date(day).getDate()}
              </span>
              <span className="text-[#3E4954] text-[48px] font-medium leading-[38px]">
                {month_names[new Date(day).getMonth()]}
              </span>
            </div>
            <span className="font-bold text-[14px] text-[#3E4954] leading-[14px]">
              {day_names[(new Date(day).getDay() + 6) % 7].toUpperCase()}
            </span>
          </div>
          {/* content */}
          <Space
            type="combined"
            direction="y"
            spaces={[
              28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
            ]}
          />
          {/* space */}
          <Space type="simple" direction="y" value={28} />
        </div>
      ))}
    </PageWithNavigation>
  );
};
