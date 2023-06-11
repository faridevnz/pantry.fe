import { CartIcon } from "../../assets/icons/CartIcon";
import { ParcelIcon } from "../../assets/icons/ParcelIcon";
import { PlaceholderIcon } from "../../assets/icons/PlaceholderIcon";

export const Navigation = () => {
  return (
    <>
      <div className="w-full h-[68px] border-t-[1px] border-[#E0E5EA] fixed bottom-0 flex justify-between items-center pl-[40px] pr-[40px]">
        <PlaceholderIcon />
        <PlaceholderIcon />
        <ParcelIcon />
        <CartIcon />
      </div>
    </>
  );
};
