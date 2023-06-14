import {
  FC,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Space } from "../Space/Space";
import classNames from "classnames";
import { DeleteRowIcon } from "../../assets/icons/DeleteRowIcon";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { Button } from "../Button/Button";
import { APIGetFoods, Food } from "../../api/food";

export type InputProps = {
  label: string;
  type: "icons" | "chips" | InputHTMLAttributes<HTMLInputElement>["type"];
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props) => {
  return (
    <div className={classNames("w-full flex flex-col h-auto", props.className)}>
      {/* label */}
      <div className="flex">
        <Space type="simple" direction="x" value={4} />
        <span className="uppercase text-[14px] font-bold text-[#566A7E]">
          {props.label}
        </span>
      </div>
      {/* space */}
      <Space type="simple" direction="y" value={4} />
      {/* input */}
      {/* <div className="w-full h-[38px] bg-white border-[1px] border-[#B8E3FF] rounded-[4px]"></div> */}
      {props.type === "icons" ? (
        <InputIcons
          onSelect={(event, icon) =>
            props.onChange?.({
              target: { ...event.target, value: icon },
            } as any)
          }
          selected={String(props.value)}
        />
      ) : (
        <input
          {...props}
          className="w-full h-[36px] rounded-[3px] pl-[14px] pr-[14px] text-[14px] border-[2px] border-[#E0E5EA] outline-none focus:border-[#B8E3FF] focus:outline-[2px] focus:outline-[#0099FF] outline-offset-0"
        />
      )}
    </div>
  );
});

export const InputChips: FC<{
  onSelect: (value: string) => void;
  choices: string[];
  value?: string;
  label: string;
  className?: string;
}> = ({ value, onSelect, choices, label, className }) => {
  return (
    <div className={classNames("w-full flex flex-col h-auto", className)}>
      {/* label */}
      <div className="flex">
        <Space type="simple" direction="x" value={4} />
        <span className="uppercase text-[14px] font-bold text-[#566A7E]">
          {label}
        </span>
      </div>
      {/* space */}
      <Space type="simple" direction="y" value={7} />
      {/* input */}
      {/* <div className="w-full h-[38px] bg-white border-[1px] border-[#B8E3FF] rounded-[4px]"></div> */}
      <div className="w-auto h-auto flex gap-[6px]">
        {choices.map((choice, index) => (
          <div
            key={index}
            className="flex justify-center items-center min-w-[42px] h-[38px] rounded-[4px] bg-[#E0E5EA10] border-[2px] px-[10px]"
            style={{ borderColor: value === choice ? "#0099FF" : "#E0E5EA" }}
            onClick={() => onSelect(choice)}
          >
            <span
              className="text-[10px] font-bold"
              style={{
                color: value === choice ? "#0099FF" : "#566A7E",
              }}
            >
              {choice}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const IconsMap = {
  FRUTTA: [
    "🍑",
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍒",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
  ],
  VERDURA: [
    "🍅",
    "🥬",
    "🥕",
    "🧅",
    "🍆",
    "🥒",
    "🌽",
    "🥔",
    "🥑",
    "🌶",
    "🫒",
    "🫘",
    "🥦",
    "🫑",
    "🧄",
  ],
  ALTRO: [
    "🥩",
    "🥖",
    "🌭",
    "🥫",
    "🍱",
    "🌰",
    "🍗",
    "🧀",
    "🍟",
    "🍚",
    "🍤",
    "🥜",
    "🍖",
    "🥚",
    "🌮",
    "🍲",
    "🦑",
    "🍕",
    "🧈",
    "🍔",
    "🍝",
    "🐠",
  ],
  DOLCI: ["🍦", "🍪", "🍰", "🍯", "🍮", "🍫"],
  BEVANDE: ["🥛", "☕️", "🍷", "🍺", "💧"],
};
const InputIcons = ({
  onSelect,
  selected,
}: {
  onSelect: (event: React.MouseEvent, value: string) => void;
  selected?: string;
}) => {
  const module = 3;

  const [items, setItems] = useState({});

  useEffect(() => {
    const ds: { [key in keyof typeof IconsMap]?: Array<Array<string>> } = {};
    Object.entries<string[]>(IconsMap).forEach(([category, icons]) => {
      const cols = Math.ceil(icons.length / module);
      const key = category as keyof typeof IconsMap;
      ds[key] = [];
      for (let i = 0; i < cols; i++) {
        ds[key]?.push(icons.slice(i * module, (i + 1) * module));
      }
    });
    setItems(ds);
  }, []);

  return (
    <>
      <div className="w-full border-[2px] border-[#E0E5EA] h-auto bg-white rounded-[10px] flex px-[20px] py-[12px] overflow-scroll">
        {Object.entries<Array<Array<string>>>(items).map(
          ([category, icons], index) => (
            <div className="flex" key={index}>
              {/*  init space */}
              {index !== 0 && <Space type="simple" direction="x" value={14} />}
              {/* category group */}
              <div className="flex flex-col pt-[6px]">
                {category.split("").map((char, index) => (
                  <span
                    className="text-[8px] font-extrabold text-[#566A7E]"
                    key={index}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <Space type="simple" direction="x" value={7} />
              {icons?.map((col_icons, index) => (
                <div className="flex" key={index}>
                  <div className="flex flex-col">
                    {col_icons.map((icon, i) => (
                      <span
                        onClick={(event) => onSelect(event, icon)}
                        className="text-[24px] px-[6px] rounded-[3px]"
                        style={{
                          backgroundColor:
                            selected === icon ? "#E0E5EA" : "white",
                        }}
                        key={`${index}-${i}`}
                      >
                        {icon}
                      </span>
                    ))}
                  </div>
                  <Space type="simple" direction="x" value={4} />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
};

export const InputFoodAutocomplete: FC<{
  className?: string;
  onUpdateItem: (items: { food_id: string; quantity: string }[]) => void;
}> = ({ className, onUpdateItem }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [choices, setChoices] = useState<
    Array<{ icon: string; id: string; name: string; quantity: number }>
  >([]);
  const [ingredients, setIngredients] = useState<
    Array<{ icon: string; id: string; name: string; quantity: number }>
  >([]);
  const [q, setQ] = useState<string>("");

  useEffect(() => {
    APIGetFoods().then((food) => setFoods(food));
  }, []);

  useEffect(() => {
    console.log(choices);
  }, [choices]);

  useEffect(() => {
    onUpdateItem(
      ingredients.map((i) => {
        return { food_id: i.id, quantity: String(i.quantity) };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const onUpdateQuery = (q: string) => {
    setQ(q);
  };

  useEffect(() => {
    setChoices(
      q.length > 2
        ? foods
            .filter((food) => food.name.toLowerCase().includes(q.toLowerCase()))
            .map((food) => ({
              id: food.id,
              icon: food.icon,
              name: food.name,
              quantity: 0,
            }))
        : []
    );
  }, [foods, q]);

  const onAddIngredient = (id: string) => {
    setIngredients((prev) => {
      const food = foods.find((f) => f.id === id);
      return [
        ...prev,
        {
          id: id,
          icon: food!.icon,
          name: food!.name,
          quantity: Number(food!.quantity),
        },
      ];
    });
  };

  const updateIngredient = (id: string, data: (typeof ingredients)[number]) => {
    setIngredients((prev) => [
      ...prev.map((i) => {
        return i.id === id ? { ...data } : i;
      }),
    ]);
  };

  return (
    <div className={classNames("w-full flex flex-col h-auto", className)}>
      {/* label */}
      <div className="flex justify-between items-center">
        <div className="flex">
          <Space type="simple" direction="x" value={4} />
          <span className="uppercase text-[14px] font-bold text-[#566A7E]">
            ingredienti
          </span>
        </div>
        <Button variant="fill" icon={<PlusIcon />} />
      </div>
      {/* space */}
      <Space type="simple" direction="y" value={7} />
      {/* input */}
      <div className="w-auto h-auto flex flex-col gap-[4px]">
        {/* ------------------------ */}
        <Input
          type="text"
          label=""
          value={q}
          onChange={(event) => {
            onUpdateQuery(event.target.value);
          }}
        />
        <div className="w-full h-auto flex flex-col bg-white border-[2px] border-[#E0E5EA] rounded-[4px]">
          {choices.map((choice) => (
            <div
              key={choice.id}
              className="w-full flex items-center h-[38px] gap-[12px] px-[12px]"
              onClick={() => {
                onAddIngredient(choice.id);
                onUpdateQuery("");
              }}
            >
              <span className="text-[18px]">{choice.icon}</span>
              <span className="text-[16px] text-[#3E4954] font-semibold">
                {choice.name}
              </span>
            </div>
          ))}
        </div>
        {ingredients.map((ingredient) => (
          <AutocompleteFoodCard
            key={ingredient.id}
            icon={ingredient.icon}
            name={ingredient.name}
            quantity={ingredient.quantity}
            onUpdateQuantity={(quantity) => {
              updateIngredient(ingredient.id, { ...ingredient, quantity });
            }}
          />
        ))}
      </div>
    </div>
  );
};
const AutocompleteFoodCard: FC<{
  icon: string;
  name: string;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
}> = ({ icon, name, quantity, onUpdateQuantity }) => {
  return (
    <div className="w-full flex items-center px-[16px] bg-white border-[2px] border-[#E0E5EA] rounded-[4px] h-[44px]">
      <div className="flex w-full justify-between">
        {/* left */}
        <div className="flex items-center gap-[12px]">
          <div className="flex">{icon}</div>
          <div className="text-[#3E4954] text-[14px] font-semibold">{name}</div>
        </div>
        {/* right */}
        <div className="flex justify-between">
          <input
            type="number"
            value={quantity}
            className="w-[60px] border-[2px] border-[#E0E5EA] rounded-[4px] px-[6px] mr-[8px]"
            onChange={(event) => onUpdateQuantity(Number(event.target.value))}
          />
          <DeleteRowIcon />
        </div>
      </div>
    </div>
  );
};
