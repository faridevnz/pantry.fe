import React from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ToasterProvider } from "./context/Toaster/ToasterContext";
import { ToasterController } from "./components/templates/ToasterController/ToasterController";

function App() {
  return (
    <React.StrictMode>
      <ToasterProvider>
        <RouterProvider router={routes} />
        <ToasterController />
      </ToasterProvider>
    </React.StrictMode>
  );
}

export default App;
