import React, { useState } from "react";
import { JobConfirmationModal } from "../../components";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";
import {Button} from '@mui/material';
import {IoChevronBack, IoChevronForward} from "react-icons/io5"
import { ScreenTitle } from "../../components";

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
            <ScreenTitle title='Step 1 of 2: Submit proof of pick up'/>
            <div style = {{padding: '20px'}}>
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
            </div>
          </>
        );
      case 2:
        return (
          <>
            <ScreenTitle title='Step 2 of 2: Submit proof of delivery'/>
            <div style = {{padding: '20px'}}>
            <FormImagePicker
              label="Attach a picture of the food at drop off location"
              labelFontSize="14px"
            />
            <FormImagePicker
              label="Attach a picture of the consumer at drop off location"
              labelFontSize="13px"
            />
            <Button 
              style={confirmButtonStyles} 
              onClick={handleConfirmClick}
            >
                Confirm
            </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
        {StepContent()} 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <IoChevronBack size={28} style={{ color: '#CCC', cursor: 'pointer' }} onClick={handlePreviousStep} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {currentStep} of {totalSteps}
          </span>
          <IoChevronForward size={28} style={{ color: '#CCC', cursor: 'pointer' }} onClick={handleNextStep} />
        </div>
        </div>
  );

};