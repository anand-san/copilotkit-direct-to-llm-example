import React, { createContext, useContext, useState, ReactNode } from 'react';

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

interface RecipeContextType {
  ingredients: Ingredient[];
  recipeSteps: RecipeStep[];
  recipeName: string;
  newItemIds: Set<string>;
  addIngredients: (recipeName: string, ingredients: Array<{name: string, quantity: string}>) => void;
  addRecipeSteps: (steps: string[]) => void;
  toggleStepCompletion: (stepId: string) => void;
  setNewItemIds: (ids: Set<string>) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);
  const [recipeName, setRecipeName] = useState<string>("");
  const [newItemIds, setNewItemIds] = useState<Set<string>>(new Set());

  const addIngredients = (recipeName: string, newIngredients: Array<{name: string, quantity: string}>) => {
    const ingredientsWithIds = newIngredients.map((ing, index) => ({
      id: Date.now().toString() + index,
      name: ing.name,
      quantity: ing.quantity
    }));
    
    const newIds = new Set(ingredientsWithIds.map(ing => ing.id));
    setNewItemIds(newIds);
    
    setRecipeName(recipeName);
    setIngredients(prev => [...prev, ...ingredientsWithIds]);
    
    setTimeout(() => {
      setNewItemIds(new Set());
    }, 600);
  };

  const addRecipeSteps = (steps: string[]) => {
    const stepsWithIds = steps.map((step, index) => ({
      id: Date.now().toString() + 'step' + index,
      step: step,
      completed: false
    }));
    
    const newIds = new Set(stepsWithIds.map(step => step.id));
    setNewItemIds(prev => new Set([...prev, ...newIds]));
    
    setRecipeSteps(prev => [...prev, ...stepsWithIds]);
    
    setTimeout(() => {
      setNewItemIds(new Set());
    }, 600);
  };

  const toggleStepCompletion = (stepId: string) => {
    setRecipeSteps(prev =>
      prev.map(s =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      )
    );
  };

  const value: RecipeContextType = {
    ingredients,
    recipeSteps,
    recipeName,
    newItemIds,
    addIngredients,
    addRecipeSteps,
    toggleStepCompletion,
    setNewItemIds
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};