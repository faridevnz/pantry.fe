import axios from "axios";

export type Food = {
  id: string;
  name: string;
  icon: string;
  expiration: string;
  category: string;
  quantity: {
    unit: string;
    value: number;
  };
};

const baseUri = import.meta.env.VITE_API_BASE_URL;

export const APIGetFoods = async (): Promise<Food[]> => {
  return (await axios.get<Food[]>(`${baseUri}/foods`)).data;
};
