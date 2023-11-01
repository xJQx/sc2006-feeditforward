import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";
import {Button} from '@mui/material';
import {IoChevronBack, IoChevronForward} from "react-icons/io5"

export const JobPickupScreen = () => {
  const [text, setText] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const confirmButtonStyles = {
    color: 'white',            
    backgroundColor: '#1BCCCC',
    minWidth: '100%',
  };

  const handleConfirmClick = () =>{
    alert(`Step ${currentStep} confirmed`)
  }

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Step {currentStep} of {totalSteps}: <br /> Submit proof of pick up</h1>
            
            <FormImagePicker
              label="Attach a picture of the food at pick up location"
              labelFontSize="14px"
            />
            
            <FormImagePicker
              label="Attach a picture of the hawker at pick up location"
              labelFontSize="14px"
            />
            <Button 
              style={confirmButtonStyles} 
              onClick={handleConfirmClick}
            >
                Confirm
            </Button>
            <div style={{ margin: '20px 0' }}></div>
          </>
        );
      case 2:
        return (
          <>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>Step {currentStep} of {totalSteps}: <br /> Submit proof of delivery</h1>
            <FormImagePicker
              label="Attach a picture of the food at drop off location"
              labelFontSize="14px"
            />
            <FormImagePicker
              label="Attach a picture of the consumer at drop off location"
              labelFontSize="14px"
            />
            <Button 
              style={confirmButtonStyles} 
              onClick={handleConfirmClick}
            >
                Confirm
            </Button>
            <div style={{ margin: '20px 0' }}></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ButtonBackNavigation />
      <div style={{ padding: '20px', gap: '20px' }}>
        {StepContent()} 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <IoChevronBack size={28} style={{ color: '#CCC', cursor: 'pointer' }} onClick={handlePreviousStep} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {currentStep} of {totalSteps}
          </span>
          <IoChevronForward size={28} style={{ color: '#CCC', cursor: 'pointer' }} onClick={handleNextStep} />
        </div>
      </div>
    </div>
  );

};