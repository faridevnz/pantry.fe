import { FC } from "react";
import { MenuIcon } from "../../assets/icons/MenuIcon";

export type IngredientCardProps = {
  name: string;
  icon: string;
  expiration: Date;
  quantity: {
    unit: string;
    value: number;
  };
};

export const IngredientCard: FC<IngredientCardProps> = (props) => {
  const daysFromDate = (date: Date) => {
    const diff = date.getTime() - new Date().getTime(); // millis
    return Math.floor(diff / 1000 / 60 / 60 / 24); // in days
  };

  const statusColorFromDate = (date: Date) => {
    const days = daysFromDate(date);
    // compute color
    if (days < 0) {
      return "#F25700"; // red
    }
    if (days < 2) {
      return "#F2BD00"; // orange
    }
    if (days < 4) {
      return "#88F200"; // yellow-green
    }
    return "#10C700";
  };

  return (
    <div className="flex flex-col gap-[15px] p-[16px] justify-start items-center bg-white rounded-[10px] border-[1px] border-[#E0E5EA]">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex justify-start items-center gap-[10px]">
          <span className="font-semibold text-[18px]">{props.icon}</span>
          <span className="font-semibold text-[18px] text-[#3E4954]">
            {props.name}
          </span>
        </div>
        {/* right */}
        <MenuIcon />
      </div>
      {/* separator */}
      <div className="w-full border-t-[1px] border-[#E0E5EA] h-0"></div>

      {/* boody */}
      <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-[8px]">
          <span
            className="w-[4px] h-[14px]"
            style={{ backgroundColor: statusColorFromDate(props.expiration) }}
          ></span>
          <span className="font-medium text-[13px] text-[#3E4954]">
            <span>
              {daysFromDate(props.expiration) < 0
                ? `scaduto da ${daysFromDate(props.expiration) * -1}`
                : daysFromDate(props.expiration) === 0
                ? "scade oggi"
                : `scade in ${daysFromDate(props.expiration)}
            ${daysFromDate(props.expiration) === 1 ? "giorno" : "giorni"}`}
            </span>
          </span>
        </div>
        {/* right */}
        <span className="font-semibold text-[14px] text-[#3E4954]">
          {props.quantity.value} {props.quantity.unit}
        </span>
      </div>
    </div>
  );
};
