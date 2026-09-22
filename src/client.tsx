import { getRouter } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import "./styles.css";

const router = getRouter();

const root = createRoot(document.getElementById("app")!);
root.render(<RouterProvider router={router} />);

