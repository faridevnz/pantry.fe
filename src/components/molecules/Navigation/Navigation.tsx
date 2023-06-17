import { useLocation, useNavigate } from "react-router-dom";
import { CartIcon } from "../../../assets/icons/CartIcon";
import { CookieIcon } from "../../../assets/icons/CookieIcon";
import { ParcelIcon } from "../../../assets/icons/ParcelIcon";
import classNames from "classnames";
import { TestIcon } from "../../../assets/icons/TestIcon";
import { PlanningIcon } from "../../../assets/icons/PlanningIcon";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // fixed bottom-0
  return (
    <>
      <div
        className="w-full h-[68px] border-t-[1px] border-[#E0E5EA] flex justify-between items-center pl-[40px] pr-[40px] shrink-0"
        style={{ height: "88px", paddingBottom: "20px" }}
      >
        {/* planning */}
        <PlanningIcon
          onClick={() => navigate("/planning")}
          className={classNames(
            location.pathname === "/planning"
              ? "text-[#0099FF]"
              : "text-[#A1A1A7]"
          )}
        />

        {/* pantry */}
        <ParcelIcon
          onClick={() => navigate("/pantry")}
          className={classNames(
            location.pathname === "/pantry"
              ? "text-[#0099FF]"
              : "text-[#A1A1A7]"
          )}
        />

        {/* recipes */}
        <CookieIcon
          onClick={() => navigate("/recipes")}
          className={classNames(
            location.pathname === "/recipes"
              ? "text-[#0099FF]"
              : "text-[#A1A1A7]"
          )}
        />

        {/* cart */}
        <CartIcon
          className={classNames(
            location.pathname === "/cart" ? "text-[#0099FF]" : "text-[#A1A1A7]"
          )}
        />

        {/* demo */}
        <TestIcon
          onClick={() => navigate("/demo")}
          className={classNames(
            location.pathname === "/demo" ? "text-[#0099FF]" : "text-[#A1A1A7]"
          )}
        />
      </div>
    </>
  );
};
