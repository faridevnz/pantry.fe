import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/atoms/Space/Space";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { ModalController } from "../../layouts/ModalController/ModalController";
import { CreateFood } from "./modals/CreateFood";
import axios from "axios";
import { IngredientCardSkeleton } from "../../components/IngredientCard/skeleton/IngredientCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { BarcodeScanner } from "../../components/BarcodeScanner/BarcodeScanner";
import { Food } from "../../model/model";
import { APIGetFoods } from "../../api/food/food.api";
import { Button } from "../../components/atoms/Button/Button";
import { IconButton } from "../../components/molecules/IconButton/IconButton";

export const Pantry = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [foods, setFoods] = useState<Food[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [mode, setMode] = useState<"CREATE" | "LIST" | "UPDATE" | "SCANNING">(
    "LIST"
  );
  const [_, setSearchParams] = useSearchParams();

  const onScannCode = (code: string) => {
    // fetch nutritional data
    axios
      .get(`https://world.openfoodfacts.org/api/v3/product/${code}`)
      .then((res) => {
        const nutriments = res.data.product.nutriments;
        if (nutriments) {
          setSearchParams({
            c: nutriments.carbohydrates_100g,
            p: nutriments.proteins_100g,
            f: nutriments.fat_100g,
          });
          setMode("CREATE");
        }
      });
    // destroy camera node
    setMode("LIST");
  };

  const fetchFood = async () => {
    APIGetFoods().then((foods) => {
      setFoods(foods);
      setLoading(false);
    });
  };

  useEffect(() => {
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
          <div className="flex gap-[6px]">
            <Button variant="fill" onClick={() => setMode("SCANNING")}>
              Scann
            </Button>
            <IconButton
              variant="fill"
              icon={<PlusIcon />}
              onClick={() => setMode("CREATE")}
            >
              Crea
            </IconButton>
          </div>
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
      <ModalController
        open={mode === "SCANNING"}
        kill={true}
        className="h-max pb-[100px]"
      >
        <div className="w-full flex flex-col p-[20px]">
          {/* CONTENT */}
          <Space type="simple" direction="y" value={28} />
          {/* header */}
          <div className="w-full flex justify-between items-end">
            <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
              QR
            </span>
            <Button variant="link" onClick={() => onClose("close")}>
              Chiudi
            </Button>
          </div>
          <Space type="simple" direction="y" value={28} />
          <BarcodeScanner onScann={onScannCode} />
        </div>
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
