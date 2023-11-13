import { PICKUP_JOB_ACTION, PickupJob } from "../../schemas/pickupJob";
import { CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

interface PickupJobModalProps {
  pickupJob: PickupJob;
  setCurrentJobNumber?: React.Dispatch<React.SetStateAction<number>>;
  isAccepted?: boolean;
}

export const PickupJobModal = (props: PickupJobModalProps) => {
  const { pickupJob, setCurrentJobNumber, isAccepted = false } = props;
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetch = useFetch();

  const handleAcceptJob = async () => {
    if (!user) return;

    try {
      const data: PickupJob = await fetch.post(
        "/driver-controller/process-pickup-job",
        {
          action: PICKUP_JOB_ACTION[0],
          pickup_job_id: pickupJob.pickup_job_id,
          driver_id: user.user_id,
          photo_proofs: []
        }
      );

      if (data.status === "In Progress") {
        toast.success(`Pickup Job #${pickupJob.pickup_job_id} accepted.`);
        navigate(0); // refresh
      } else {
        toast.error("Failed to accept pickup job.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleIgnoreJob = () => {
    if (setCurrentJobNumber) {
      setCurrentJobNumber(prev => prev + 1);
    }
  };

  const handleSubmitProofs = () => {
    navigate(`/pickup-job/${pickupJob.pickup_job_id}`);
  };

  return (
    <>
      <div className="flex flex-col bg-brand-light p-4 pr-8 rounded-lg drop-shadow-xl">
        <div>
          {/* PickupJob ID */}
          <div className="font-bold text-[18px] mb-2">
            Pickup Job #{pickupJob.pickup_job_id}
          </div>
          {/* Description */}
          <div className="text-[14px]">{pickupJob.description}</div>
        </div>

        {/* Food Details */}
        {/* <div className="mt-6">
                  <div className="font-bold text-[18px] mb-2">Food Details</div>
                  <ul>
                    <span className="flex items-center gap-[6px]">
                      <FaCircle className="w-[6px] h-[6px]" />
                      {pickupJob.leftover_food.name}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <FaCircle className="w-[6px] h-[6px]" />
                      Cooked {pickupJob.leftover_food.time_passed} ago
                    </span>
                  </ul>
                </div> */}

        {/* Addresses */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Pickup */}
          <div className="flex gap-1">
            <div className="h-full">
              <CiLocationOn className="w-7 h-7 text-brand-primary-active" />
            </div>
            <div className="flex flex-col">
              <div className="text-[18px] font-bold mb-1">Pickup address</div>
              <div className="text-[14px] text-gray-500">
                <div>{pickupJob.leftover_food.hawker.business_name}</div>
                <div>{pickupJob.leftover_food.hawker.user.address}</div>
              </div>
            </div>
          </div>

          {/* Drop -ff */}
          <div className="flex gap-1">
            <div className="h-full">
              <CiLocationOn className="w-7 h-7 text-gray-500" />
            </div>
            <div className="flex flex-col">
              <div className="text-[18px] font-bold mb-1">Drop-off address</div>
              <div className="text-[14px] text-gray-500">
                <div>
                  {pickupJob.consumer.user.name} ({pickupJob.consumer.user.role}
                  )
                </div>
                <div>{pickupJob.consumer.user.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons - Ignore / Accept */}
        {!isAccepted && (
          <div className="flex justify-between gap-4 mt-6">
            <div
              className="bg-transparent rounded-md border border-gray-500 text-gray-500 active:bg-gray-500 active:text-white w-full px-6 py-[6px] text-center"
              onClick={handleIgnoreJob}
            >
              Ignore
            </div>
            <div
              className="bg-brand-primary active:bg-brand-primary-active rounded-md w-full px-6 py-[6px] text-center text-white font-bold"
              onClick={handleAcceptJob}
            >
              Accept
            </div>
          </div>
        )}
        {/* Button - Submit Proof */}
        {isAccepted && (
          <div
            className="bg-brand-primary active:bg-brand-primary-active rounded-md w-full px-6 py-[6px] text-center text-white font-bold mt-6"
            onClick={handleSubmitProofs}
          >
            Submit Photo Proofs
          </div>
        )}
      </div>
    </>
  );
};
