import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@copilotkit/react-ui/styles.css";
import "./index.css";
import App from "./App.tsx";
import { CopilotKit } from "@copilotkit/react-core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CopilotKit
      runtimeUrl={import.meta.env.VITE_COPILOTKIT_AGUI_URL}
      agent="default"
    >
      <App />
    </CopilotKit>
  </StrictMode>
);
