import React from "react";
import { useRecipe } from "../contexts/RecipeContext/useRecipeContext";

const RecipePlanner: React.FC = () => {
  const {
    ingredients,
    recipeSteps,
    recipeName,
    newItemIds,
    toggleStepCompletion,
  } = useRecipe();

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{recipeName || "Recipe Planner"}</h2>

      <div className="recipe-section">
        <h3>Ingredients</h3>
        <div className="ingredients-container">
          {ingredients.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>
              No ingredients yet. Ask your assistant to help plan a recipe!
            </p>
          ) : (
            ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className={`ingredient-item ${
                  newItemIds.has(ingredient.id) ? "pop-in" : ""
                }`}
              >
                <span className="ingredient-quantity">
                  {ingredient.quantity}
                </span>
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
            <p style={{ color: "#888", fontStyle: "italic" }}>
              No cooking steps yet. Ask your assistant to add recipe steps!
            </p>
          ) : (
            recipeSteps.map((step) => (
              <div
                key={step.id}
                className={`step-item ${
                  newItemIds.has(step.id) ? "pop-in" : ""
                } ${step.completed ? "completed" : ""}`}
                onClick={() => toggleStepCompletion(step.id)}
              >
                <span className="step-text">{step.step}</span>
                {step.completed && <span className="checkmark">✓</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePlanner;
