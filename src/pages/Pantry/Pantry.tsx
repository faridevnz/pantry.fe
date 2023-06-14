import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../../components/Button/Button";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/Space/Space";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { APIGetFoods, Food } from "../../api/food";
import { IngredientCardSkeleton } from "../../components/IngredientCard/skeleton/IngredientCardSkeleton";
import { ModalController } from "../../layouts/ModalController/ModalController";
import { CreateFood } from "./modals/CreateFood";

export const Pantry = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [foods, setFoods] = useState<Food[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [mode, setMode] = useState<"CREATE" | "LIST" | "UPDATE">("LIST");

  const fetchFood = async () => {
    APIGetFoods().then((foods) => {
      setFoods(foods);
      setLoading(false);
    });
  };

  useEffect(() => {
    //
    fetchFood();
  }, []);

  useEffect(() => {
    foods?.forEach((food) => {
      setCategories((prev) => {
        return Array.from(new Set<string>(prev).add(food.category));
      });
    });
  }, [foods]);

  const onClose = (type: "success" | "close" | "error") => {
    // fetch if success
    if (type === "success") fetchFood();
    // close modal
    setMode("LIST");
  };

  return (
    <>
      <PageWithNavigation>
        <Space type="simple" direction="y" value={14} />
        {/* header */}
        <div className="w-full flex justify-between items-end">
          <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
            CIBO
          </span>
          <Button
            variant="fill"
            icon={<PlusIcon />}
            onClick={() => setMode("CREATE")}
          >
            Crea
          </Button>
        </div>
        {/* content */}
        <Space type="simple" direction="y" value={28} />

        {loading && <Skeleton />}

        {categories.map((category) => (
          <Section label={category} key={category}>
            {foods
              ?.filter((food) => food.category === category)
              .map((food, index) => (
                <IngredientCard
                  name={food.name}
                  icon={food.icon}
                  expiration={new Date(food.expiration)}
                  quantity={food.quantity}
                  key={index}
                />
              ))}
          </Section>
        ))}
      </PageWithNavigation>

      {/* modals */}
      <ModalController open={mode === "CREATE"}>
        <CreateFood
          onClose={(type: "success" | "close" | "error") => {
            onClose(type);
          }}
        />
      </ModalController>
    </>
  );
};

const Skeleton = () => {
  return (
    <>
      {/* label */}
      <div className="flex justify-start items-center">
        <Space type="simple" direction="x" value={4} />
        <TextSkeleton />
      </div>
      {/* content */}
      <Space type="simple" direction="y" value={7} />
      <IngredientCardSkeleton />
      <Space type="simple" direction="y" value={14} />
      {/* label */}
      <div className="flex justify-start items-center">
        <Space type="simple" direction="x" value={4} />
        <TextSkeleton />
      </div>
      {/* content */}
      <Space type="simple" direction="y" value={7} />
      <IngredientCardSkeleton />
      <Space type="simple" direction="y" value={7} />
      <IngredientCardSkeleton />
      <Space type="simple" direction="y" value={14} />
    </>
  );
};

const TextSkeleton = () => {
  return <div className="h-[18px] w-[140px] bg-[#E0E5EA70]"></div>;
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
