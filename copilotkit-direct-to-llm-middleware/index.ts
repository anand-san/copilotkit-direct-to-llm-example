import express, {
  type Request,
  type Response,
  type NextFunction,
  type ErrorRequestHandler,
} from "express";
import cors from "cors";
import {
  CopilotRuntime,
  copilotRuntimeNodeHttpEndpoint,
  EmptyAdapter,
} from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";

const PORT = 4000;
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000/ag-ui";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const serviceAdapter = new EmptyAdapter();

app.use("/graphql", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const runtime = new CopilotRuntime({
      agents: {
        default: new HttpAgent({
          url: AGENT_URL,
        }),
      },
    });

    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: "/graphql",
      runtime,
      serviceAdapter,
    });

    await handler(req, res);
  } catch (error: unknown) {
    console.error(
      "GraphQL handler error:",
      error instanceof Error ? error.message : String(error)
    );
    next(error);
  }
});

app.use(((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", error.message);
  res.status(500).json({ error: "Internal server error" });
}) as ErrorRequestHandler);

process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (error: unknown) => {
  console.error("Unhandled Rejection:", error);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`CopilotKit Runtime listening on port ${PORT}`);
  console.log(`Cross Search AI AG-UI Agent URL: ${AGENT_URL}`);
  console.log(
    `CopilotKit-Runtime GraphQL endpoint: http://localhost:${PORT}/graphql`
  );
  console.log(
    `CopilotKit-Runtime Health endpoint: http://localhost:${PORT}/healthz`
  );
});
