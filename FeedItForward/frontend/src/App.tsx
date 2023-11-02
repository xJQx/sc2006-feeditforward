import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="font-roboto">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
