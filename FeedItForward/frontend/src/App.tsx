import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";

function App() {
  return (
    <div className="font-roboto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
