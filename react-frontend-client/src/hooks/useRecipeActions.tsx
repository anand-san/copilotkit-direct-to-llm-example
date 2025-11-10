import { useCopilotAction } from "@copilotkit/react-core";
import { useRecipe } from "../contexts/RecipeContext";

export const useRecipeActions = () => {
  const { addIngredients, addRecipeSteps } = useRecipe();

  useCopilotAction({
    name: "manage_ingredients",
    description: "Add or update ingredients for a recipe with their quantities",
    available: "remote",
    parameters: [
      {
        name: "recipe_name",
        type: "string",
        description: "The name of the recipe",
        required: true,
      },
      {
        name: "ingredients",
        type: "object[]",
        description: "Array of ingredient objects with 'name' and 'quantity' properties",
        required: true,
      },
    ],
    handler: async ({ recipe_name, ingredients }) => {
      addIngredients(recipe_name, ingredients);
    },
  });

  useCopilotAction({
    name: "manage_recipe_steps",
    description: "Add cooking steps for a recipe that can be tracked and marked as completed",
    available: "remote",
    parameters: [
      {
        name: "steps",
        type: "string[]",
        description: "Array of cooking step descriptions",
        required: true,
      },
    ],
    handler: async ({ steps }) => {
      addRecipeSteps(steps);
    },
  });
};