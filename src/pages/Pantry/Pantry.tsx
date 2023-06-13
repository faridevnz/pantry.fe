import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../../components/Button/Button";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/Space/Space";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { APIGetFoods, Food } from "../../api/food";
import { IngredientCardSkeleton } from "../../components/IngredientCard/skeleton/IngredientCardSkeleton";

export const Pantry = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [foods, setFoods] = useState<Food[]>();

  useEffect(() => {
    //
    APIGetFoods().then((foods) => {
      setFoods(foods);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <PageWithNavigation>
        <Space type="simple" direction="y" value={14} />
        {/* header */}
        <div className="w-full flex justify-between items-end">
          <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
            CIBO
          </span>
          <Button variant="fill" icon={<PlusIcon />}>
            Crea
          </Button>
        </div>
        {/* content */}
        <Space type="simple" direction="y" value={28} />
        <Section label="VERDURA" loading={loading}>
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
          {loading && <IngredientCardSkeleton />}
        </Section>
        <Section label="CARNE" loading={loading}>
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
          {loading && (
            <>
              <IngredientCardSkeleton />
              <IngredientCardSkeleton />
            </>
          )}
        </Section>
        <Section label="FRUTTA" loading={loading}>
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

const TextSkeleton = () => {
  return <div className="h-[18px] w-[140px] bg-[#E0E5EA70]"></div>;
};

const Section = ({
  children,
  label,
  loading,
}: {
  children: ReactNode;
  label: string;
  loading?: boolean;
}) => {
  return (
    <>
      {/* label */}
      <div className="flex justify-start items-center">
        <Space type="simple" direction="x" value={4} />
        {!loading ? (
          <span className="uppercase text-[14px] font-bold text-[#566A7E]">
            {label}
          </span>
        ) : (
          <TextSkeleton />
        )}
      </div>
      {/* content */}
      <Space type="simple" direction="y" value={7} />
      <div className="flex flex-col gap-[7px]">{children}</div>
      <Space type="simple" direction="y" value={14} />
    </>
  );
};
