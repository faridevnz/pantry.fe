import { ReactNode, useEffect, useState } from "react";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../../components/Button/Button";
import { PageWithNavigation } from "../../layouts/PageWithNavigation/PageWithNavigation";
import { Space } from "../../components/Space/Space";
import { IngredientCard } from "../../components/IngredientCard/IngredientCard";
import { APIGetFoods, Food } from "../../api/food";
import { ModalController } from "../../layouts/ModalController/ModalController";
import { CreateFood } from "./modals/CreateFood";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import { IngredientCardSkeleton } from "../../components/IngredientCard/skeleton/IngredientCardSkeleton";

export const Pantry = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [foods, setFoods] = useState<Food[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [mode, setMode] = useState<"CREATE" | "LIST" | "UPDATE" | "SCANNING">(
    "LIST"
  );
  // init qr code reader
  let html5Qrcode: Html5Qrcode | null = null;

  const onScannCode = (code: string) => {
    // stop scanning
    html5Qrcode?.stop();
    // fetch nutritional data
    axios
      .get(`https://world.openfoodfacts.org/api/v3/product/${code}`)
      .then((res) => console.log(res.data.product.nutriments));
    // destroy camera node
    setMode("LIST");
  };

  const start_scanner = () => {
    setMode("SCANNING");
    Html5Qrcode.getCameras().then((cameras) => {
      const camera_id = cameras[0].id;
      html5Qrcode = new Html5Qrcode("qr-reader", {
        verbose: true,
        useBarCodeDetectorIfSupported: true,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
      });
      html5Qrcode?.start(
        camera_id,
        { fps: 60, qrbox: 350, aspectRatio: 0.65 },
        onScannCode,
        () => null
      );
    });
  };

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
          <div className="flex gap-[6px]">
            <Button id="btn" variant="fill" onClick={start_scanner}>
              Scann
            </Button>
            <Button
              variant="fill"
              icon={<PlusIcon />}
              onClick={() => setMode("CREATE")}
            >
              Crea
            </Button>
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
      <ModalController open={mode === "SCANNING"}>
        <div id="qr-reader" className="w-full h-[100%]"></div>
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
