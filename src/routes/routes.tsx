import { createBrowserRouter } from "react-router-dom";
import { SplashScreen } from "../pages/SplashScreen/SplashScreen";
import { Pantry } from "../pages/Pantry/Pantry";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <SplashScreen />,
  },
  {
    path: "/pantry",
    element: <Pantry />,
  },
]);
