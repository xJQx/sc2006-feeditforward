import React from "react";
import { ScreenTitle } from "../../components";
import { AdminCard } from "../../components/Cards";

export const AdminScreen = () => {
  return (
    <div>
      <ScreenTitle title="Admin Management" />

      {/* Cards */}
      <div className="flex flex-col justify-center items-center mt-12 gap-5">
        <AdminCard
          img={{
            src: "/images/admin-lock.png",
            alt: "lock"
          }}
          title="Verify User"
          description="Verify a user's application for priority food"
          href="/admin/verify-user"
        />
        <AdminCard
          img={{
            src: "/images/admin-ban.png",
            alt: "hammer"
          }}
          title="Ban User"
          description="Ban a user by their user_id for a specified duration"
          href="/admin/ban-users"
        />
        <AdminCard
          img={{
            src: "/images/admin-smiley.png",
            alt: "smiley face"
          }}
          title="Process Reviews"
          description="Process flagged reviews for deletion"
          href="/admin/process-reviews"
        />
      </div>
    </div>
  );
};
