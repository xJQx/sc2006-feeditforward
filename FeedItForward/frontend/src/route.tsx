import { createBrowserRouter } from "react-router-dom";
import {
  HomeScreen,
  LoginScreen,
  SignupScreen,
  SettingsScreen,
  CustomerServiceSupportScreen,
  MapScreen,
  HawkerListingScreen,
  ProfileScreen,
  NotificationScreen,
  LanguageScreen
} from "./screens/MainUI";
import {
  AdminBanUsersScreen,
  AdminProcessReviewsScreen,
  AdminScreen,
  AdminVerifyUsersScreen,
  AdminVerifySingleUserScreen,
  AdminProcessSingleReviewScreen,
  AdminBanSingleUserScreen
} from "./screens/AdminUI";
import {
  LeftoverFoodRequestScreen,
  LeftoverFoodScreen,
  PriorityRequestSubmitScreen,
  ReviewAddScreen,
  ReviewEditScreen
} from "./screens/ConsumerUI";
import { JobPickupScreen } from "./screens/DriverUI";
import { LeftoverFoodSubmitScreen, ReviewsScreen } from "./screens/HawkerUI";
import { AppLayout } from "./components";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // MainUI
      { path: "/", element: <HomeScreen /> },
      { path: "/auth/login", element: <LoginScreen /> },
      { path: "/auth/signup", element: <SignupScreen /> },
      { path: "/settings", element: <SettingsScreen /> },
      { path: "/settings/profile", element: <ProfileScreen /> },
      { path: "/settings/notification", element: <NotificationScreen /> },
      { path: "/settings/language", element: <LanguageScreen /> },
      { path: "/map", element: <MapScreen /> },
      { path: "/hawker/:hawkerId/listings", element: <HawkerListingScreen /> },
      {
        path: "/customer-service-support",
        element: <CustomerServiceSupportScreen />
      },

      // AdminUI
      { path: "/admin", element: <AdminScreen /> },
      { path: "/admin/verify-user", element: <AdminVerifyUsersScreen /> },
      {
        path: "/admin/verify-user/:priorityRequestId",
        element: <AdminVerifySingleUserScreen />
      },
      { path: "/admin/ban-users", element: <AdminBanUsersScreen /> },
      {
        path: "/admin/ban-user/:userId",
        element: <AdminBanSingleUserScreen />
      },
      {
        path: "/admin/process-reviews",
        element: <AdminProcessReviewsScreen />
      },
      {
        path: "/admin/process-review/:reviewId",
        element: <AdminProcessSingleReviewScreen />
      },

      //  ConsumerUI
      { path: "/leftover-food", element: <LeftoverFoodScreen /> },
      {
        path: "/leftover-food/:leftoverFoodId/request",
        element: <LeftoverFoodRequestScreen />
      },
      {
        path: "/request/food-priority",
        element: <PriorityRequestSubmitScreen />
      },
      { path: "/review/add/:hawkerId", element: <ReviewAddScreen /> },
      { path: "/review/edit/:reviewId", element: <ReviewEditScreen /> },

      // DriverUI
      { path: "/job-pickup/:jobId", element: <JobPickupScreen /> },

      // HawkerUI
      { path: "/reviews/:hawkerId", element: <ReviewsScreen /> },
      {
        path: "/leftover-food/submit/:leftoverFoodId",
        element: <LeftoverFoodSubmitScreen />
      }
    ]
  }
]);
