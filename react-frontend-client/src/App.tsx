import { useCopilotAction } from "@copilotkit/react-core";
import "./App.css";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState<Array<{id: string, name: string, quantity: string}>>([]);
  const [recipeSteps, setRecipeSteps] = useState<Array<{id: string, step: string, completed: boolean}>>([]);
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());
  const [recipeName, setRecipeName] = useState<string>("");

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
      const newIngredients = ingredients.map((ing, index) => ({
        id: Date.now().toString() + index,
        name: ing.name,
        quantity: ing.quantity
      }));
      
      const newIds = new Set(newIngredients.map(ing => ing.id));
      setNewItemIds(newIds);
      
      setRecipeName(recipe_name);
      setIngredients(prev => [...prev, ...newIngredients]);
      
      setTimeout(() => {
        setNewItemIds(new Set());
      }, 600);
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
      const newSteps = steps.map((step, index) => ({
        id: Date.now().toString() + 'step' + index,
        step: step,
        completed: false
      }));
      
      const newIds = new Set(newSteps.map(step => step.id));
      setNewItemIds(prev => new Set([...prev, ...newIds]));
      
      setRecipeSteps(prev => [...prev, ...newSteps]);
      
      setTimeout(() => {
        setNewItemIds(new Set());
      }, 600);
    },
  });

  return (
    <>
      <CopilotSidebar
        disableSystemMessage={true}
        defaultOpen={true}
        labels={{
          title: "Meal Planning Assistant",
          initial: "Hi! 👋 I'm here to help you plan delicious recipes! What would you like to cook today?",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <h2>{recipeName || "Recipe Planner"}</h2>
          
          <div className="recipe-section">
            <h3>Ingredients</h3>
            <div className="ingredients-container">
              {ingredients.length === 0 ? (
                <p style={{ color: "#888", fontStyle: "italic" }}>No ingredients yet. Ask your assistant to help plan a recipe!</p>
              ) : (
                ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className={`ingredient-item ${
                      newItemIds.has(ingredient.id) ? "pop-in" : ""
                    }`}
                  >
                    <span className="ingredient-quantity">{ingredient.quantity}</span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="recipe-section">
            <h3>Cooking Steps</h3>
            <div className="steps-container">
              {recipeSteps.length === 0 ? (
                <p style={{ color: "#888", fontStyle: "italic" }}>No cooking steps yet. Ask your assistant to add recipe steps!</p>
              ) : (
                recipeSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`step-item ${
                      newItemIds.has(step.id) ? "pop-in" : ""
                    } ${step.completed ? "completed" : ""}`}
                    onClick={() => {
                      setRecipeSteps(prev =>
                        prev.map(s =>
                          s.id === step.id ? { ...s, completed: !s.completed } : s
                        )
                      );
                    }}
                  >
                    <span className="step-text">{step.step}</span>
                    {step.completed && <span className="checkmark">✓</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CopilotSidebar>
    </>
  );
}

export default App;
