import { FC, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { Space } from "../../../components/Space/Space";
import {
  Input,
  InputChips,
  InputFoodAutocomplete,
} from "../../../components/Input/Input";
import { PlusIcon } from "../../../assets/icons/PlusIcon";
import axios from "axios";

type CreateRecipeProps = {
  onClose: (type: "success" | "close" | "error") => void;
};
type Form = {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  ingredients: Array<{ food_id: string; quantity: string }>;
};

export const CreateRecipe: FC<CreateRecipeProps> = ({ onClose }) => {
  // form
  const [form, setForm] = useState<Form>({
    name: "",
    description: "",
    difficulty: "",
    category: "",
    time: "",
    ingredients: [],
  });

  const update = <T extends keyof typeof form>(
    key: T,
    value: (typeof form)[T]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onCreateRecipe = async () => {
    const baseUri = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseUri}/recipes`, form);
    onClose("success");
  };

  return (
    <div className="w-full h-full justify-start items-start pl-[21px] pr-[21px] overflow-auto">
      {/* CONTENT */}
      <Space type="simple" direction="y" value={28} />
      {/* header */}
      <div className="w-full flex justify-between items-end">
        <span className="font-bold text-[38px] text-[#3E4954] leading-[38px]">
          + RICETTA
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
      {/* description */}
      <Input
        type="text"
        label="descrizione"
        value={form.description}
        onChange={(event) => update("description", event.target.value)}
      />
      <Space type="simple" direction="y" value={14} />
      {/* category */}
      <InputChips
        label="categoria"
        choices={["COLAZIONE", "PASTO", "SPUNTINO", "BEVANDA"]}
        value={form.category}
        onSelect={(value) => update("category", value)}
      />
      <Space type="simple" direction="y" value={14} />
      {/* difficulty - time */}
      <div className="w-full flex gap-[10px] items-center">
        <InputChips
          label="difficoltà"
          choices={["F", "M", "D"]}
          value={form.difficulty}
          className="w-auto"
          onSelect={(value) => update("difficulty", value)}
        />
        <Input
          type="number"
          label="tempo"
          value={Number(form.time)}
          onChange={(event) => update("time", String(event.target.value))}
        />
      </div>
      {/* ingredient */}
      <Space type="simple" direction="y" value={14} />
      <InputFoodAutocomplete
        onUpdateItem={(items) => update("ingredients", [...items])}
      />
      {/* actions */}
      <Space type="simple" direction="y" value={28} />
      <div className="flex justify-end">
        <Button
          variant="fill"
          icon={<PlusIcon />}
          onClick={() => onCreateRecipe()}
        >
          Create
        </Button>
      </div>
      <Space type="simple" direction="y" value={28} />
    </div>
  );
};
