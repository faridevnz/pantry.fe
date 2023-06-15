import { FC, useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { Space } from "../../../components/Space/Space";
import { Input, InputChips } from "../../../components/Input/Input";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

type CreateFoodProps = {
  onClose: (type: "success" | "close" | "error") => void;
};
type Form = {
  name: string;
  category: string;
  icon: string;
  quantity: {
    unit: string;
    value: string;
  };
  calories: string;
  proteins: string;
  carbohydrates: string;
  fats: string;
  expiration: string;
};

export const CreateFood: FC<CreateFoodProps> = ({ onClose }) => {
  const [searchParams, _] = useSearchParams();

  const isoStringToGlobalDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString().split("/").reverse().join("-");
  };

  // form
  const [form, setForm] = useState<Form>({
    name: "",
    category: "",
    icon: "",
    quantity: {
      unit: "GR",
      value: "",
    },
    calories: "",
    proteins: "",
    carbohydrates: "",
    fats: "",
    expiration: isoStringToGlobalDate(new Date().toISOString()),
  });

  useEffect(() => {
    update("proteins", String(Math.floor(Number(searchParams.get("p") ?? ""))));
    update(
      "carbohydrates",
      String(Math.floor(Number(searchParams.get("c") ?? "")))
    );
    update("fats", String(Math.floor(Number(searchParams.get("f") ?? ""))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      calories: String(
        Number(prev.proteins) * 4 +
          Number(prev.carbohydrates) * 4 +
          Number(prev.fats) * 9
      ),
    }));
  }, [form.proteins, form.carbohydrates, form.fats]);

  const update = <T extends keyof typeof form>(
    key: T,
    value: (typeof form)[T]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onCreateFood = async () => {
    const baseUri = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseUri}/foods`, form);
    onClose("success");
  };

  return (
    <div className="w-full h-full justify-start items-start pl-[21px] pr-[21px] overflow-auto">
      {/* CONTENT */}
      <Space type="simple" direction="y" value={28} />
      {/* header */}
      <div className="w-full flex justify-between items-end">
        <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
          + CIBO
        </span>
        <Button variant="link" onClick={() => onClose("close")}>
          Chiudi
        </Button>
      </div>
      <Space type="simple" direction="y" value={28} />
      {/* name */}
      <Input
        type="text"
        label="nome"
        value={form.name}
        onChange={(event) => update("name", event.target.value)}
      />
      <Space type="simple" direction="y" value={14} />
      {/* category */}
      <InputChips
        label="categoria"
        choices={["VERDURA", "CARNE", "FRUTTA", "ALTRO"]}
        value={form.category}
        onSelect={(value) => update("category", value)}
      />
      <Space type="simple" direction="y" value={14} />
      {/* icon */}
      <Input
        type="icons"
        label="icon"
        value={form.icon}
        onChange={(event) => update("icon", event.target.value)}
      />
      <Space type="simple" direction="y" value={14} />
      {/* unit - quantity */}
      <div className="w-full flex gap-[10px] items-center">
        <InputChips
          label="unità"
          choices={["GR", "PZ", "ML"]}
          value={form.quantity.unit}
          className="w-auto"
          onSelect={(value) =>
            update("quantity", { unit: value, value: form.quantity.value })
          }
        />
        <Input
          type="number"
          label="quantità"
          value={form.quantity.value}
          onChange={(event) =>
            update("quantity", {
              unit: form.quantity.unit,
              value: event.target.value,
            })
          }
        />
      </div>
      <Space type="simple" direction="y" value={14} />
      <Space type="simple" direction="y" value={7} />
      {/* info */}
      <div className="text-[#566A7E] font-medium text-[14px]">
        valori nutrizionali calcolati su 100 grammi di prodotto
      </div>
      {/* pro - carbo -fat */}
      <Space type="simple" direction="y" value={14} />
      <div className="w-full flex gap-[10px] items-center">
        <Input
          type="number"
          label="prot"
          value={form.proteins}
          onChange={(event) => update("proteins", event.target.value)}
        />
        <Input
          type="number"
          label="carbo"
          value={form.carbohydrates}
          onChange={(event) => update("carbohydrates", event.target.value)}
        />
        <Input
          type="number"
          label="grassi"
          value={form.fats}
          onChange={(event) => update("fats", event.target.value)}
        />
      </div>
      {/* kcal - expiration */}
      <Space type="simple" direction="y" value={14} />
      <div className="w-full flex gap-[10px] items-center">
        <Input type="number" label="kcal" disabled value={form.calories} />
        <Input
          type="date"
          label="scadenza"
          className="w-2/4"
          value={form.expiration}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, expiration: event.target.value }))
          }
        />
      </div>
      {/* actions */}
      <Space type="simple" direction="y" value={28} />
      <div className="flex justify-end gap-[10px]">
        <Button variant="fill" disabled>
          Scan
        </Button>
        <Button
          variant="fill"
          icon={<PlusIcon />}
          onClick={() => onCreateFood()}
        >
          Create
        </Button>
      </div>
      <Space type="simple" direction="y" value={28} />
    </div>
  );
};
