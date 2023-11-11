import React, { useEffect, useState } from "react";
import {
  AdminUserDisplayCard,
  Button,
  ScreenSubTitle,
  ScreenTitle
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {
  PRIORITY_REQUEST_ACTION,
  PriorityRequest
} from "../../schemas/priorityRequest";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

export const AdminVerifySingleUserScreen = () => {
  let { priorityRequestId } = useParams();
  const fetch = useFetch();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [priorityRequest, setPriorityRequest] = useState<PriorityRequest>();

  // Fetch data from backend
  useEffect(() => {
    const getPriorityRequest = async () => {
      try {
        const data = await fetch.get(`/priority-request/${priorityRequestId}`);
        setPriorityRequest(data);
      } catch (e) {
        toast.error("Failed to retrieve data.");
        console.log(e);
      }
    };
    getPriorityRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorityRequestId]);

  const handleApprove = async () => {
    const response: PriorityRequest = await fetch.post(
      `/admin-controller/verify-user/${priorityRequest?.consumer_id}`,
      {
        user_id: priorityRequest?.consumer_id,
        admin_id: user?.user_id, // admin
        priority_request_id: priorityRequest?.priority_request_id,
        action: PRIORITY_REQUEST_ACTION[0]
      }
    );

    if (response.status === "Approved") {
      toast.success("User approved!");
      navigate(-1);
    } else {
      toast.error("Failed to approve user.");
    }
  };
  const handleReject = async () => {
    const response: PriorityRequest = await fetch.post(
      `/admin-controller/verify-user/${priorityRequest?.consumer_id}`,
      {
        user_id: priorityRequest?.consumer_id,
        admin_id: user?.user_id, // admin
        priority_request_id: priorityRequest?.priority_request_id,
        action: PRIORITY_REQUEST_ACTION[2]
      }
    );

    if (response.status === "Rejected") {
      toast.success("User rejected!");
      navigate(-1);
    } else {
      toast.error("Failed to reject user.");
    }
  };
  const handleRequest = async () => {
    const response: PriorityRequest = await fetch.post(
      `/admin-controller/verify-user/${priorityRequest?.consumer_id}`,
      {
        user_id: priorityRequest?.consumer_id,
        admin_id: user?.user_id, // admin
        priority_request_id: priorityRequest?.priority_request_id,
        action: PRIORITY_REQUEST_ACTION[1]
      }
    );

    if (response.status === "Pending") {
      toast.success("Request for more information sent to user.");
      navigate(-1);
    } else {
      toast.error("Failed to request for more information.");
    }
  };

  return (
    <div className="mb-12">
      <ScreenTitle title="Verify User" />
      <div className="flex justify-center mt-1">
        <div
          className={`px-[8px] py-[2px] rounded text-[12px] ${
            priorityRequest?.status === "Approved"
              ? "bg-brand-tertiary"
              : priorityRequest?.status === "Rejected"
              ? "bg-red-300"
              : "bg-brand-darkgray"
          }`}
        >
          {priorityRequest?.status}
        </div>
      </div>

      {/* User Card */}
      {priorityRequest?.consumer.user && (
        <div className="mt-8">
          <AdminUserDisplayCard user={priorityRequest.consumer.user} />
        </div>
      )}

      {/* Address */}
      <ScreenSubTitle title="Address" className="!text-[16px]" />
      <input
        className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
        placeholder={priorityRequest?.consumer.user.address}
        disabled
      />

      {/* House Category + Number of Residents */}
      <div className="flex flex-row gap-4">
        <div>
          <ScreenSubTitle title="House Category" className="!text-[16px]" />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={priorityRequest?.house_category}
            disabled
          />
        </div>
        <div>
          <ScreenSubTitle
            title="Number of Residents"
            className="!text-[16px]"
          />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={
              priorityRequest?.number_of_residents.toString() + " pax"
            }
            disabled
          />
        </div>
      </div>

      {/* Occupation + Household Income */}
      <div className="flex flex-row gap-4">
        <div>
          <ScreenSubTitle title="Occupation" className="!text-[16px]" />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={priorityRequest?.occupation}
            disabled
          />
        </div>
        <div>
          <ScreenSubTitle title="Household Income" className="!text-[16px]" />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={priorityRequest?.household_income}
            disabled
          />
        </div>
      </div>

      {/* Email + Contact Number */}
      <div className="flex flex-row gap-4">
        <div>
          <ScreenSubTitle title="Email" className="!text-[16px]" />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={priorityRequest?.consumer.user.email}
            disabled
          />
        </div>
        <div>
          <ScreenSubTitle title="Contact Number" className="!text-[16px]" />
          <input
            className="border rounded-md bg-white pl-2 mt-1 w-full text-[14px]"
            placeholder={priorityRequest?.consumer.user.contact_number}
            disabled
          />
        </div>
      </div>

      {/* Dates */}
      {priorityRequest && (
        <div className="py-6 text-[12px] italic">
          <div>
            Date created:{" "}
            {new Date(priorityRequest.date_created).toLocaleDateString()}
          </div>
          <div>
            Date updated:{" "}
            {new Date(priorityRequest.date_updated).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-row gap-4 justify-center mt-6">
        <Button label="Approve" onClick={handleApprove} />
        <Button
          label="Reject"
          className="!bg-[#F26C6C]"
          onClick={handleReject}
        />
        <Button
          label="Request"
          className="!bg-brand-gray"
          onClick={handleRequest}
        />
      </div>
    </div>
  );
};
