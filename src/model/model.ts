export interface Recipe {
  id: string;
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
}

export interface Food {
  id: string;
  name: string;
  icon: string;
  expiration: string;
  category: string;
  quantity: {
    unit: string;
    value: number;
  };
}
