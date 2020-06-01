import { IIngredient } from './IIngredient';

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  serves: string;
  imageUrl: string;
  ingredients: IIngredient[];
  instructions: string[];
}
