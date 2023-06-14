import axios from "axios";

export type Recipe = {
  name: string;
  description: string;
  difficulty: "F" | "D" | "M";
  category: string;
  time: number;
  nutritional_values: {
    calories: number;
    fats: number;
    carbohydrates: number;
    proteins: number;
  };
  food: {
    all: {
      count: number;
    };
    missing: {
      count: number;
    };
  };
};

const baseUri = import.meta.env.VITE_API_BASE_URL;

export const APIGetRecipes = async (): Promise<Recipe[]> => {
  return (await axios.get<Recipe[]>(`${baseUri}/recipes`)).data;
};
