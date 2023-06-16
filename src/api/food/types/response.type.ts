export type FoodResponseDTO = {
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
