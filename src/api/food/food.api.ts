import { FoodResponseDTO } from "./types/response.type";
import { Axios } from "../config";
import { Food } from "../../model/model";

/**
 * GET
 * @returns {Promise<Food[]>}
 */
export const APIGetFoods = async (): Promise<Food[]> => {
  return (await Axios.get<FoodResponseDTO[]>("/foods")).data;
};

/**
 * DELETE
 * @param {string} id - the id of the food to delete from the list
 * @returns {Promise<void>}
 */
export const APIDeleteFood = async (id: string): Promise<void> => {
  await Axios.delete(`/foods/${id}`);
};
