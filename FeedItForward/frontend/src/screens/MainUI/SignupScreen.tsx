import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export const SignupScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [role, setRole] = useState<Role>("Consumer");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 2;

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigate(-1);
    } else if (currentStep === 2) {
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
    }
  };

  const handleSignup = () => {
    // Input Validation
    if (!role || !password || !confirmPassword) {
      return toast.error("Please input all fields.");
    } else if (password.length < 8 || confirmPassword.length < 8) {
      return toast.error("Password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password must match.");
    }

    // TODO: Link to backend

    toast.success("Signup Successfully.");
    navigate("/auth/login");
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

      <div className="px-4">
        {/* Header */}
        <div>
          <div className="text-brand-dark text-[32px] font-bold">Sign up</div>
          <div className="text-gray-500"></div>
          Already have an account?&nbsp;
          <span className="text-brand-primary">Login</span>
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
