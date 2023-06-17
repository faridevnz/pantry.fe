import { createBrowserRouter } from "react-router-dom";
import { SplashScreen } from "../pages/SplashScreen/SplashScreen";
import { Pantry } from "../pages/Pantry/Pantry";
import { Recipes } from "../pages/Recipes/Recipes";
import { Demo } from "../pages/Demo/Demo";
import { Planning } from "../pages/Planning/Planning";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <SplashScreen />,
  },
  {
    path: "/planning",
    element: <Planning />,
  },
  {
    path: "/pantry",
    element: <Pantry />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
]);
