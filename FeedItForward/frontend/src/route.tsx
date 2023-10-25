import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeScreen,
  LoginScreen,
  SignupScreen,
  SettingsScreen,
  CustomerServiceSupportScreen,
  MapScreen,
  HawkerListingScreen
} from "./screens/MainUI";
import { AdminScreen } from "./screens/AdminUI";
import {
  LeftoverFoodScreen,
  PriorityRequestSubmitScreen,
  ReviewAddScreen,
  ReviewEditScreen
} from "./screens/ConsumerUI";
import { JobPickupScreen } from "./screens/DriverUI";
import { LeftoverFoodSubmitScreen } from "./screens/HawkerUI";

export const router = createBrowserRouter([
  // MainUI
  { path: "/", element: <HomeScreen /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/signup", element: <SignupScreen /> },
  { path: "/settings", element: <SettingsScreen /> },
  { path: "/map", element: <MapScreen /> },
  { path: "/hawker/listings", element: <HawkerListingScreen /> },
  {
    path: "/customer-service-support",
    element: <CustomerServiceSupportScreen />
  },

  // AdminUI
  { path: "/admin", element: <AdminScreen /> },

  //  ConsumerUI
  { path: "/leftover-food", element: <LeftoverFoodScreen /> },
  { path: "/request/food-priority", element: <PriorityRequestSubmitScreen /> },
  { path: "/review/add", element: <ReviewAddScreen /> },
  { path: "/review/edit/:reviewId", element: <ReviewEditScreen /> },

  // DriverUI
  { path: "/job-pickup/:jobId", element: <JobPickupScreen /> },

  // HawkerUI
  { path: "/leftover-food/submit", element: <LeftoverFoodSubmitScreen /> }
]);
