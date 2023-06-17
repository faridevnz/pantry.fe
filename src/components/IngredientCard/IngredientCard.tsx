import { FC, useState } from "react";
import { MenuIcon } from "../../assets/icons/MenuIcon";

export type IngredientCardProps = {
  name: string;
  icon: string;
  expiration: Date;
  quantity: {
    unit: string;
    value: number;
  };
  // callbacks
  onDelete: () => void;
  onUpdate: () => void;
};

export const IngredientCard: FC<IngredientCardProps> = (props) => {
  //

  const [menu, setMenu] = useState<boolean>(false);

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

  const onOpenMenu = (
    event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setMenu(true);
  };

  const onDeleteClicked = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setMenu(false);
    props.onDelete();
  };

  const onUpdateClicked = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setMenu(false);
    props.onUpdate();
  };

  return (
    <div
      className="flex flex-col gap-[15px] p-[16px] justify-start items-center bg-white rounded-[10px] border-[1px] border-[#E0E5EA]"
      onClick={() => setMenu(false)}
    >
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
        <MenuIcon onClick={(event) => onOpenMenu(event)} />
      </div>
      {/* separator */}
      <div className="w-full border-t-[1px] border-[#E0E5EA] h-0 relative">
        {/* menu */}
        {menu && (
          <div className="absolute right-0 top-[-14px] w-[100px] bg-white rounded-[4px] border-[1px] border-[#E0E5EA] flex flex-col">
            <span
              className="w-full px-[12px] h-[38px] flex items-center text-[14px] font-semibold"
              onClick={(event) => onUpdateClicked(event)}
            >
              Modifica
            </span>
            <span
              className="w-full px-[12px] h-[38px] flex items-center text-[14px] font-semibold"
              onClick={(event) => onDeleteClicked(event)}
            >
              Elimina
            </span>
          </div>
        )}
      </div>

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
