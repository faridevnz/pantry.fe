import { FC } from "react";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { Recipe } from "../../api/recipe";
import { CartIcon } from "../../assets/icons/CartIcon";
import { ClockIcon } from "../../assets/icons/ClockIcon";
import { FireIcon } from "../../assets/icons/FireIcon";

export type RecipeCardProps = {
  name: string;
  description: string;
  difficulty: "F" | "D" | "M";
  category: string;
  time: number;
  nutritional_values: {
    calories: number;
    fats: number;
    carbohydrates: number;
    proteins: number;
  };
  food: {
    all: {
      count: number;
    };
    missing: {
      count: number;
    };
  };
};

export const RecipeCard: FC<RecipeCardProps> = (props) => {
  const difficultyColor = (difficulty: Recipe["difficulty"]) => {
    // compute color
    if (difficulty === "D") {
      return "#F25700"; // red
    }
    if (difficulty === "M") {
      return "#F2BD00"; // orange
    }
    return "#88F200"; // yellow-green
  };

  return (
    <div className="flex flex-col gap-[15px] p-[16px] justify-start items-center bg-white rounded-[10px] border-[1px] border-[#E0E5EA]">
      {/* header */}

      <div className="w-full flex flex-col gap-[6px]">
        <div className="w-full flex justify-between items-center">
          {/* left */}
          <div className="flex justify-start items-center gap-[10px]">
            <span className="font-semibold text-[18px] text-[#3E4954]">
              {props.name}
            </span>
          </div>
          {/* right */}
          <MenuIcon />
        </div>
        <span className="font-medium text-[12px] text-[#3E4954]">
          {props.description}
        </span>
      </div>

      {/* separator */}
      <div className="w-full border-t-[1px] border-[#E0E5EA] h-0"></div>

      {/* boody */}

      <div className="w-full flex flex-col gap-[4px]">
        {/* left  */}
        {/* line 1 */}
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-[4px]">
            <FireIcon />
            <span className="text-[16px] text-[#3E4954] font-semibold">
              {props.nutritional_values.calories}{" "}
              <span className="font-medium">Kcal</span>
            </span>
          </div>
          <div className="flex h-full gap-[8px]">
            <div className="flex gap-[7px] items-center">
              <span className="text-[14px]">🍞</span>
              <span className="text-[14px] font-medium text-[#3E4954]">
                {props.nutritional_values.carbohydrates}
                <span className="text-[12px] ml-[1px]">gr</span>
              </span>
            </div>
            {/* separator */}
            <div className="w-[1px] h-[17px] bg-[#D9D9D9]"></div>
            <div className="flex gap-[7px] items-center">
              <span className="text-[14px]">🥩</span>
              <span className="text-[14px] font-medium text-[#3E4954]">
                {props.nutritional_values.proteins}
                <span className="text-[12px] ml-[1px]">gr</span>
              </span>
            </div>
            {/* separator */}
            <div className="w-[1px] h-[17px] bg-[#D9D9D9]"></div>
            <div className="flex gap-[7px] items-center">
              <span className="text-[14px]">🥑</span>
              <span className="text-[14px] font-medium text-[#3E4954]">
                {props.nutritional_values.fats}
                <span className="text-[12px] ml-[1px]">gr</span>
              </span>
            </div>
          </div>
        </div>

        {/* line 2 */}
        <div className="w-full flex justify-between">
          <div className="flex gap-[8px] items-center">
            <span
              className="w-[4px] h-[14px]"
              style={{ backgroundColor: difficultyColor(props.difficulty) }}
            ></span>
            <span className="font-medium text-[14px] text-[#3E4954]">
              {props.difficulty === "F"
                ? "FACILE"
                : props.difficulty === "D"
                ? "DIFFICILE"
                : "MEDIO"}
            </span>
            {/* separator */}
            <div className="w-[1px] h-[17px] bg-[#D9D9D9]"></div>
            {/* time */}
            <div className="flex items-center h-full gap-[6px]">
              <ClockIcon />
              <span className="font-semibold text-[14px] text-[#3E495]">
                {props.time} <span className="text-[12px]">min</span>
              </span>
            </div>
          </div>
          {/* right */}
          <div className="flex gap-[6px] items-center">
            <span className="font-semibold text-[14px] text-[#3E4954]">
              {props.food.missing.count !== 0
                ? props.food.missing.count
                : props.food.all.count}
            </span>
            <CartIcon
              width={14}
              stroke={props.food.missing.count !== 0 ? "#F25700" : "#10C700"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
