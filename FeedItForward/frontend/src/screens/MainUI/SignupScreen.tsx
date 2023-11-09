import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormButton,
  FormContainer,
  FormInput,
  FormSelect,
  Logo
} from "../../components";
import toast from "react-hot-toast";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Role } from "../../schemas/user";
import useFetch from "../../hooks/useFetch";
import { AdminCreate } from "../../schemas/admin";
import { ConsumerCreate } from "../../schemas/consumer";
import { DriverCreate } from "../../schemas/driver";
import { HawkerCreate } from "../../schemas/hawker";
import { Geometry } from "../../schemas/misc";

export const SignupScreen = () => {
  const navigate = useNavigate();
  const fetch = useFetch();

  // Common Inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [role, setRole] = useState<Role>("Consumer");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Driver Inputs
  const [vehicleNumber, setVehicleNumber] = useState<string>("");
  const [licenceNumber, setLicenceNumber] = useState<string>("");

  // Hawker Inputs
  const [businessName, setBusinessName] = useState<string>("");
  const [operatingHours, setOperatingHours] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>(""); // Helper for geometry. Will be coverting to Geometry with the help of OneMap API

  // Steps Navigation
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number>(2);

  useEffect(() => {
    if (role === "Driver" || role === "Hawker") {
      setTotalSteps(3);
    } else {
      setTotalSteps(2);
    }
  }, [role]);

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else if (currentStep <= totalSteps) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  const handleNextStep = () => {
    if (currentStep === 1) {
      // input validation
      if (!name || !email || !address || !contactNumber) {
        return toast.error("Please input all fields.");
      }

      setCurrentStep(prevStep => prevStep + 1);
    } else if (currentStep === 2) {
      // Input Validation
      if (!role || !password || !confirmPassword) {
        return toast.error("Please input all fields.");
      } else if (password.length < 8 || confirmPassword.length < 8) {
        return toast.error("Password must be at least 8 characters.");
      } else if (password !== confirmPassword) {
        return toast.error("Password and Confirm Password must match.");
      }

      if (role === "Hawker" || role === "Driver")
        setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleSignup = async () => {
    // Input Validation
    if (!role || !password || !confirmPassword) {
      return toast.error("Please input all fields.");
    } else if (password.length < 8 || confirmPassword.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password must match.");
    }

    // Input Validation for Driver
    if (role === "Driver" && (!vehicleNumber || !licenceNumber)) {
      return toast.error("Please input all fields.");
    }

    // Input Validation for Hawker
    if (
      role === "Hawker" &&
      (!businessName || !operatingHours || !foodType || !postalCode)
    ) {
      return toast.error("Please input all fields.");
    }

    // Signup
    let success = false;
    try {
      switch (role) {
        case "Admin":
          const admin: AdminCreate = {
            name: name,
            email: email,
            address: address,
            contact_number: contactNumber,
            password: password,
            role: role
          };
          const adminResponse = await fetch.post("/auth/signup/admin", admin);
          if (adminResponse) success = true;
          break;
        case "Consumer":
          const consumer: ConsumerCreate = {
            name: name,
            email: email,
            address: address,
            contact_number: contactNumber,
            password: password,
            role: role
          };
          const consumerResponse = await fetch.post(
            "/auth/signup/consumer",
            consumer
          );
          if (consumerResponse) success = true;
          break;
        case "Driver":
          const driver: DriverCreate = {
            name: name,
            email: email,
            address: address,
            contact_number: contactNumber,
            password: password,
            role: role,
            vehicle_number: vehicleNumber,
            licence_number: licenceNumber
          };
          const driverResponse = await fetch.post(
            "/auth/signup/driver",
            driver
          );
          if (driverResponse) success = true;
          break;
        case "Hawker":
          // Convert Postal Code to Latitude and Longtitude
          const geoCodedResponse = await fetch.get(`/geo-coding/${postalCode}`);

          if (geoCodedResponse) {
            const geometry: Geometry = {
              type: "Point",
              latitude: parseFloat(geoCodedResponse.latitude),
              longitude: parseFloat(geoCodedResponse.longitude)
            };

            // Hawker Signup
            const hawker: HawkerCreate = {
              name: name,
              email: email,
              address: address,
              contact_number: contactNumber,
              password: password,
              role: role,
              business_name: businessName,
              operating_hours: operatingHours,
              food_type: foodType,
              geometry: geometry
            };

            const hawkerResponse = await fetch.post(
              "/auth/signup/hawker",
              hawker
            );
            if (hawkerResponse) success = true;
          } else {
            return toast.error("Invalid Postal Code!");
          }
          break;
      }
    } catch (e: any) {
      console.log(e);
      if (Array.isArray(e.detail)) toast.error(e.detail[0].msg);
      else toast.error(e.detail);
    }

    if (success) {
      toast.success("Signup Successfully.");
      navigate("/auth/login");
    } else {
      toast.error("Failed to signup!");
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="w-full flex justify-center items-center gap-3 my-12 mb-8">
        <Logo />

        <div className="font-voltaire text-[36px] text-brand-primary-active">
          FeedItForward
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Header */}
        <div>
          <div className="text-brand-dark text-[32px] font-bold">Sign up</div>
          <div className="text-gray-500"></div>
          Already have an account?&nbsp;
          <Link to="/auth/login" className="text-brand-primary">
            Login
          </Link>
        </div>
        {/* Login with Email */}
        <FormContainer onFormSubmit={handleSignup}>
          <div className="flex flex-col gap-4 mt-6">
            {/* Inputs */}
            {currentStep === 1 && (
              <StepOneInputs
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                address={address}
                setAddress={setAddress}
                contactNumber={contactNumber}
                setContactNumber={setContactNumber}
              />
            )}
            {currentStep === 2 && (
              <StepTwoInputs
                role={role}
                setRole={setRole}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}
            {currentStep === 3 && role === "Driver" && (
              <StepThreeDriverInputs
                vehicleNumber={vehicleNumber}
                setVehicleNumber={setVehicleNumber}
                licenceNumber={licenceNumber}
                setLicenceNumber={setLicenceNumber}
              />
            )}
            {currentStep === 3 && role === "Hawker" && (
              <StepThreeHawkerInputs
                businessName={businessName}
                setBusinessName={setBusinessName}
                operatingHours={operatingHours}
                setOperatingHours={setOperatingHours}
                foodType={foodType}
                setFoodType={setFoodType}
                postalCode={postalCode}
                setPostalCode={setPostalCode}
              />
            )}

            {/* Steps Navigation */}
            <div className="flex items-center justify-center gap-[10px] text-brand-darkgray mt-2">
              <IoChevronBack
                className="w-6 h-6 cursor-pointer"
                onClick={handlePreviousStep}
              />
              <span>
                {currentStep} of {totalSteps}
              </span>
              <IoChevronForward
                className="w-6 h-6 cursor-pointer"
                onClick={handleNextStep}
              />
            </div>

            {/* Signup Button */}
            <div>
              {currentStep !== totalSteps ? (
                <Button
                  label="Next"
                  className="text-white text-[18px] font-bold font-roboto !w-full py-3 rounded-md"
                  onClick={handleNextStep}
                />
              ) : (
                <FormButton label="Create Account" />
              )}

              {currentStep === totalSteps && (
                <div className="text-[12px] text-center mt-2">
                  By signing up, you are agreeing to our Terms of Service and
                  Privacy Policy.
                </div>
              )}
            </div>
          </div>
        </FormContainer>
      </div>
    </>
  );
};

// Helper Components
interface StepOneInputsProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  contactNumber: string;
  setContactNumber: React.Dispatch<React.SetStateAction<string>>;
}

const StepOneInputs = (props: StepOneInputsProps) => {
  const {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    contactNumber,
    setContactNumber
  } = props;

  return (
    <>
      {/* Name */}
      <FormInput
        label="Name"
        type="text"
        placeholder="Enter your name"
        value={name}
        setValue={setName}
      />
      {/* Email */}
      <FormInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
      />
      {/* Address */}
      <FormInput
        label="Address"
        type="text"
        placeholder="Enter your address"
        value={address}
        setValue={setAddress}
      />
      {/* Contact Number */}
      <FormInput
        label="Contact Number"
        type="string"
        placeholder="Enter your contact number"
        value={contactNumber}
        setValue={setContactNumber}
      />
    </>
  );
};

interface StepTwoInputsProps {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}
const StepTwoInputs = (props: StepTwoInputsProps) => {
  const {
    role,
    setRole,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
  } = props;

  return (
    <>
      {/* Role */}
      <FormSelect
        label="Role"
        placeholder="Enter your role"
        value={role}
        setValue={setRole}
      />
      {/* Password */}
      <FormInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
      />
      {/* Confirm Password */}
      <FormInput
        label="Confirm Password"
        type="password"
        placeholder="Enter your password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
    </>
  );
};

interface StepThreeDriverInputsProps {
  vehicleNumber: string;
  setVehicleNumber: React.Dispatch<React.SetStateAction<string>>;
  licenceNumber: string;
  setLicenceNumber: React.Dispatch<React.SetStateAction<string>>;
}
const StepThreeDriverInputs = (props: StepThreeDriverInputsProps) => {
  const { vehicleNumber, setVehicleNumber, licenceNumber, setLicenceNumber } =
    props;

  return (
    <>
      {/* Vehicle Number */}
      <FormInput
        label="Vehicle Number"
        type="text"
        placeholder="Enter your vehicle number"
        value={vehicleNumber}
        setValue={setVehicleNumber}
      />

      {/* Licence Number */}
      <FormInput
        label="Licence Number"
        type="text"
        placeholder="Enter your licence number"
        value={licenceNumber}
        setValue={setLicenceNumber}
      />
    </>
  );
};

interface StepThreeHawkerInputsProps {
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  operatingHours: string;
  setOperatingHours: React.Dispatch<React.SetStateAction<string>>;
  foodType: string;
  setFoodType: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
}
const StepThreeHawkerInputs = (props: StepThreeHawkerInputsProps) => {
  const {
    businessName,
    setBusinessName,
    operatingHours,
    setOperatingHours,
    foodType,
    setFoodType,
    postalCode,
    setPostalCode
  } = props;

  return (
    <>
      {/* Business Name */}
      <FormInput
        label="Business Name"
        type="text"
        placeholder="Enter your business name"
        value={businessName}
        setValue={setBusinessName}
      />
      {/* Operating Hours */}
      <FormInput
        label="Operating Hours"
        type="text"
        placeholder="Enter your operating hours"
        value={operatingHours}
        setValue={setOperatingHours}
      />
      {/* Food Type */}
      <FormInput
        label="Food Type"
        type="text"
        placeholder="Enter your food type"
        value={foodType}
        setValue={setFoodType}
      />
      {/* Postal Code */}
      <FormInput
        label="Postal Code"
        type="text"
        placeholder="Enter your postal code"
        value={postalCode}
        setValue={setPostalCode}
      />
    </>
  );
};
