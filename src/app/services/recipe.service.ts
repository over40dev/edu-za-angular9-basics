import { Injectable } from '@angular/core';
import { IIngredient } from '../interfaces/IIngredient';
import { Recipe } from '../classes/recipe';
import * as RecipeData from '../../data.json';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  private recipes: Recipe[] = [];

  constructor() {
    console.log('hey', RecipeData);
    (RecipeData as any).recipes.forEach(recipe => {
      this.recipes.push(new Recipe(recipe));
    });
  }

  public getRecipes(): Recipe[] {
    return this.recipes;
  }
}
