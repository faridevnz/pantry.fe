import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../../components/Button/Button";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/Space/Space";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { APIGetFoods, Food } from "../../api/food";

export const Pantry = () => {
  const [foods, setFoods] = useState<Food[]>();

  useEffect(() => {
    //
    APIGetFoods().then((foods) => setFoods(foods));
  }, []);

  return (
    <>
      <PageWithNavigation>
        <Space type="simple" direction="y" value={14} />
        {/* header */}
        <div className="w-full flex justify-end">
          <Button variant="fill" icon={<PlusIcon />}>
            Crea
          </Button>
        </div>
        {/* content */}
        <Space type="simple" direction="y" value={7} />
        <Section label="VERDURA">
          {foods
            ?.filter((food) => food.category === "VERDURA")
            .map((food, index) => (
              <IngredientCard
                name={food.name}
                icon={food.icon}
                expiration={new Date(food.expiration)}
                quantity={food.quantity}
                key={index}
              />
            ))}
          {/*  */}
        </Section>
        <Section label="CARNE">
          {foods
            ?.filter((food) => food.category === "CARNE")
            .map((food, index) => (
              <IngredientCard
                name={food.name}
                icon={food.icon}
                expiration={new Date(food.expiration)}
                quantity={food.quantity}
                key={index}
              />
            ))}
          {/*  */}
        </Section>
        <Section label="FRUTTA">
          {foods
            ?.filter((food) => food.category === "FRUTTA")
            .map((food, index) => (
              <IngredientCard
                name={food.name}
                icon={food.icon}
                expiration={new Date(food.expiration)}
                quantity={food.quantity}
                key={index}
              />
            ))}
          {/*  */}
        </Section>
      </PageWithNavigation>
    </>
  );
};

const Section = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <>
      {/* label */}
      <div className="flex justify-start items-center">
        <Space type="simple" direction="x" value={4} />
        <span className="uppercase text-[14px] font-bold text-[#566A7E]">
          {label}
        </span>
      </div>
      {/* content */}
      <Space type="simple" direction="y" value={7} />
      <div className="flex flex-col gap-[7px]">{children}</div>
      <Space type="simple" direction="y" value={14} />
    </>
  );
};
