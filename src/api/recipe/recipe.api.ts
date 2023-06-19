import { RecipeResponseDTO } from "./types/response.type";
import { Axios } from "../config";
import { Recipe } from "../../model/model";

/**
 * GET
 * @returns {Promise<Recipe[]>}
 */
export const APIGetRecipes = async (): Promise<Recipe[]> => {
  return (await Axios.get<RecipeResponseDTO[]>(`/recipes`)).data;
};

/**
 * DELETE
 * @param {string} id
 * @returns {Promise<void>}
 */
export const APIDeleteRecipe = async (id: string): Promise<void> => {
  await Axios.delete(`/recipes/${id}`);
};
