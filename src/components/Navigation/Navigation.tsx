import { useLocation, useNavigate } from "react-router-dom";
import { CartIcon } from "../../assets/icons/CartIcon";
import { CookieIcon } from "../../assets/icons/CookieIcon";
import { ParcelIcon } from "../../assets/icons/ParcelIcon";
import { PlaceholderIcon } from "../../assets/icons/PlaceholderIcon";
import classNames from "classnames";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="w-full h-[68px] border-t-[1px] border-[#E0E5EA] fixed bottom-0 flex justify-between items-center pl-[40px] pr-[40px]">
        <PlaceholderIcon />
        <ParcelIcon
          onClick={() => navigate("/pantry")}
          className={classNames(
            location.pathname === "/pantry"
              ? "text-[#0099FF]"
              : "text-[#A1A1A7]"
          )}
        />
        <CookieIcon
          onClick={() => navigate("/recipes")}
          className={classNames(
            location.pathname === "/recipes"
              ? "text-[#0099FF]"
              : "text-[#A1A1A7]"
          )}
        />
        <CartIcon
          className={classNames(
            location.pathname === "/cart" ? "text-[#0099FF]" : "text-[#A1A1A7]"
          )}
        />
      </div>
    </>
  );
};
