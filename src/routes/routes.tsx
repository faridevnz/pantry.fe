import { createBrowserRouter } from "react-router-dom";
import { SplashScreen } from "../pages/SplashScreen/SplashScreen";
import { Pantry } from "../pages/Pantry/Pantry";
import { Recipes } from "../pages/Recipes/Recipes";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <SplashScreen />,
  },
  {
    path: "/pantry",
    element: <Pantry />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
]);
