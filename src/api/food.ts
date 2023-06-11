import axios from "axios";

export type Food = {
  name: string;
  icon: string;
  expiration: string;
  category: string;
  quantity: {
    unit: string;
    value: string;
  };
};

export const APIGetFoods = async (): Promise<Food[]> => {
  return (await axios.get<Food[]>("http://0.0.0.0:3333/foods")).data;
};
