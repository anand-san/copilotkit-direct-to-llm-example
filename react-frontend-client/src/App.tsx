import "./App.css";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { RecipeProvider } from "./contexts/RecipeContext";
import RecipePlanner from "./components/RecipePlanner";
import { useRecipeActions } from "./hooks/useRecipeActions";

const CopilotActions = () => {
  useRecipeActions();
  return null;
};

function App() {

  return (
    <RecipeProvider>
      <CopilotActions />
      <CopilotSidebar
        disableSystemMessage={true}
        defaultOpen={true}
        labels={{
          title: "Meal Planning Assistant",
          initial: "Hi! 👋 I'm here to help you plan delicious recipes! What would you like to cook today?",
        }}
      >
        <RecipePlanner />
      </CopilotSidebar>
    </RecipeProvider>
  );
}

export default App;
