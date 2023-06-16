export type RecipeResponseDTO = {
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
