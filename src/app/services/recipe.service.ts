import { Injectable } from '@angular/core';
import { IIngredient } from '../interfaces/IIngredient';
import { IRecipeCreate, IRecipe } from '../interfaces/IRecipe';
import { Recipe } from '../classes/recipe';
import * as RecipeData from '../../data.json';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipes: IRecipe[] = [];

  constructor() {
    console.log('hey', RecipeData);
    (RecipeData as any).recipes.forEach((recipe) => {
      this.recipes.push(new Recipe(recipe));
    });
  }

  public getRecipes(): Recipe[] {
    return this.recipes;
  }

  public getRecipeById(id: number): Recipe {
    return _.find(this.recipes, (recipe) => recipe.id === id);
  }

  public createRecipe(newRecipe: IRecipeCreate) {
    const recipeData: IRecipe = { ...newRecipe, id: this.getNextId() };
    const recipe = new Recipe(recipeData);
    this.recipes.push(recipe);
    return recipe;
  }

  public updateRecipe(recipe: IRecipe): IRecipe {
    const index = _.findIndex(this.recipes, (r: IRecipe) => r.id === recipe.id);
    this.recipes[index] = recipe;
    return recipe;
  }

  public deleteRecipe(id: number): void {
    const index = _.findIndex(this.recipes, (r: IRecipe) => r.id === id);
    if (index === -1) return;
    this.recipes.splice(index, 1);
  }

  // original function
  // public createRecipe(
  //   title: string,
  //   description: string,
  //   serves: string,
  //   imageUrl: string,
  //   ingredients: IIngredient[],
  //   instructions: string[]
  // ) {
  //   const newRecipeData = {
  //     id: this.getNextId(),
  //     title,
  //     description,
  //     serves,
  //     imageUrl,
  //     ingredients: [...ingredients],
  //     instructions: [...instructions]
  //   }

  //   const newRecipe = new Recipe(newRecipeData);

  //   this.recipes.push(newRecipe);
  //   return newRecipe;
  // }

  private getNextId() {
    const max = _.maxBy(this.recipes, (recipe) => recipe.id);
    return max.id + 1;
  }
}
