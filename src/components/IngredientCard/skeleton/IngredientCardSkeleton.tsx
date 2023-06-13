import { FC } from "react";
import { MenuIcon } from "../../../assets/icons/MenuIcon";

export const IngredientCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-[15px] p-[16px] justify-start items-center bg-[#E0E5EA50] rounded-[10px] border-[1px] border-[#E0E5EA]">
      {/* header */}
      <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex justify-start items-center gap-[10px]">
          <span className="font-semibold h-[20px] w-[20px] bg-[#E0E5EA]"></span>
          <span className="font-semibold h-[20px] w-[206px] bg-[#E0E5EA]"></span>
        </div>
        {/* right */}
        <MenuIcon className="opacity-30" />
      </div>
      {/* separator */}
      <div className="w-full border-t-[1px] border-[#E0E5EA] h-0"></div>

      {/* boody */}
      <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-[8px]">
          <span className="w-[4px] h-[14px] bg-[#E0E5EA]"></span>
          <span className="font-medium h-[14px] bg-[#E0E5EA] w-[90px]"></span>
        </div>
        {/* right */}
        <span className="font-semibold h-[20px] w-[60px] bg-[#E0E5EA]"></span>
      </div>
    </div>
  );
};
