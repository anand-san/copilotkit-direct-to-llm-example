import { createContext } from "react";

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export interface RecipeStep {
  id: string;
  step: string;
  completed: boolean;
}

export interface RecipeContextType {
  ingredients: Ingredient[];
  recipeSteps: RecipeStep[];
  recipeName: string;
  newItemIds: Set<string>;
  addIngredients: (
    recipeName: string,
    ingredients: Array<{ name: string; quantity: string }>
  ) => void;
  addRecipeSteps: (steps: string[]) => void;
  toggleStepCompletion: (stepId: string) => void;
  setNewItemIds: (ids: Set<string>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(
  undefined
);
