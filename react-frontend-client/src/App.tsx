import "./App.css";
import { CopilotSidebar } from "@copilotkit/react-ui";

function App() {
  return (
    <>
      <CopilotSidebar
        disableSystemMessage={true}
        defaultOpen={true}
        labels={{
          title: "Your Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <h2>Welcome to the Copilotkit Direct To LLM Example</h2>
          <p>
            This is a simple example demonstrating the integration of Copilotkit
            with a React frontend.
          </p>
        </div>
      </CopilotSidebar>
    </>
  );
}

export default App;
