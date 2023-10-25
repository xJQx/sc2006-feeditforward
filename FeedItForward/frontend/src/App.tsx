import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuthContext } from "./contexts/AuthContext";
import { router } from "./route";

function App() {
  const { isLoggedIn, user } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Not logged in!");
    }
  }, [isLoggedIn]);

  return (
    <div className="font-roboto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
