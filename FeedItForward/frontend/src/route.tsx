import { createBrowserRouter } from "react-router-dom";
import {
  HomeScreen,
  LoginScreen,
  SignupScreen,
  SettingsScreen,
  CustomerServiceSupportScreen,
  MapScreen,
  HawkerListingScreen
} from "./screens/MainUI";
import {
  AdminBanUserScreen,
  AdminProcessReviewsScreen,
  AdminScreen,
  AdminVerifyUsersScreen,
  AdminVerifySingleUserScreen,
  AdminProcessSingleReviewScreen
} from "./screens/AdminUI";
import {
  LeftoverFoodScreen,
  PriorityRequestSubmitScreen,
  ReviewAddScreen,
  ReviewEditScreen
} from "./screens/ConsumerUI";
import { JobPickupScreen } from "./screens/DriverUI";
import { LeftoverFoodSubmitScreen } from "./screens/HawkerUI";
import { AppLayout } from "./components";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
      { path: "/admin/verify-user", element: <AdminVerifyUsersScreen /> },
      {
        path: "/admin/verify-user/:userId",
        element: <AdminVerifySingleUserScreen />
      },
      { path: "/admin/ban-user/:userId", element: <AdminBanUserScreen /> },
      {
        path: "/admin/process-reviews",
        element: <AdminProcessReviewsScreen />
      },
      {
        path: "/admin/process-reviews/:reviewId",
        element: <AdminProcessSingleReviewScreen />
      },

      //  ConsumerUI
      { path: "/leftover-food", element: <LeftoverFoodScreen /> },
      {
        path: "/request/food-priority",
        element: <PriorityRequestSubmitScreen />
      },
      { path: "/review/add", element: <ReviewAddScreen /> },
      { path: "/review/edit/:reviewId", element: <ReviewEditScreen /> },

      // DriverUI
      { path: "/job-pickup/:jobId", element: <JobPickupScreen /> },

      // HawkerUI
      { path: "/leftover-food/submit", element: <LeftoverFoodSubmitScreen /> }
    ]
  }
]);
