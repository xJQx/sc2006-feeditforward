import React, { useEffect, useState } from "react";
import { ScreenTitle } from "../../components";
import useFetch from "../../hooks/useFetch";
import { PickupJob } from "../../schemas/pickupJob";
import { FaCircle } from "react-icons/fa6";
import { useAuthContext } from "../../contexts/AuthContext";
import { PickupJobModal } from "../../components/Modal";

export const PickupJobSelectionScreen = () => {
  const { user } = useAuthContext();
  const fetch = useFetch();

  const [pickupJobInProgress, setPickupJobInProgress] = useState<PickupJob>();
  const [pickupJobsAvailable, setPickupJobsAvailable] = useState<PickupJob[]>(
    []
  );
  const [pickupJobsCompleted, setPickupJobsCompleted] = useState<PickupJob[]>(
    []
  );
  const [currentJobNumber, setCurrentJobNumber] = useState(0);

  useEffect(() => {
    const getPickupJobsDataAvailable = async () => {
      const data: PickupJob[] = await fetch.get("/pickup-jobs/available");
      setPickupJobsAvailable(data);
    };
    const getPickupJobsDataCompleted = async () => {
      if (!user) return;
      const data: PickupJob[] = await fetch.get(
        `/pickup-jobs/driverid/${user.user_id}`
      );
      setPickupJobsCompleted(data.filter(job => job.status === "Completed"));
      setPickupJobInProgress(
        data.filter(job => job.status === "In Progress")[0]
      );
    };

    getPickupJobsDataAvailable();
    getPickupJobsDataCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-8">
      <ScreenTitle title="Pickup Job Selection" />

      {/* In Progress */}
      {pickupJobInProgress && (
        <div className="mt-8">
          <div className="text-[18px] text-center animate-pulse mb-3">
            Job in progress... 🚗
          </div>
          <PickupJobModal pickupJob={pickupJobInProgress} isAccepted={true} />
        </div>
      )}

      {/* Available */}
      {!pickupJobInProgress && (
        <div className="mt-4">
          {/* Header */}
          <div className="text-[20px] font-bold text-center">Available</div>
          <div className="text-center text-[14px]">
            {currentJobNumber < pickupJobsAvailable.length
              ? currentJobNumber + 1
              : pickupJobsAvailable.length}{" "}
            of {pickupJobsAvailable.length}
          </div>

          {/* Pickup Job Card */}
          {currentJobNumber < pickupJobsAvailable.length ? (
            <>
              {pickupJobsAvailable.map((job, index) => (
                <div className="mt-2" key={`available-${job.pickup_job_id}`}>
                  {currentJobNumber === index && (
                    <div className="animate-out fade-out-50 animate-in fade-in-50">
                      <PickupJobModal
                        pickupJob={job}
                        setCurrentJobNumber={setCurrentJobNumber}
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="text-center mt-4 animate-pulse">
              No more pickup jobs available!
            </div>
          )}
        </div>
      )}

      {/* Completed (History) */}
      <div className="mt-12">
        {/* Header */}
        <div className="text-[20px] font-bold text-center">
          Completed (History)
        </div>
        <div className="text-center text-[14px]">
          Total: {pickupJobsCompleted.length}
        </div>

        {/* Completed Jobs */}
        <div>
          {pickupJobsCompleted.map(job => (
            <span
              key={`completed-${job.pickup_job_id}`}
              className="flex items-center gap-[6px]"
            >
              <FaCircle className="w-[6px] h-[6px]" />
              Pickup Job #{job.pickup_job_id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
