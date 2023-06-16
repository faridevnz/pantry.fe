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
