import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";
import {Button} from '@mui/material';

export const ReviewAddScreen = () => {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const submitButtonStyles = {
    color: 'white',            
    backgroundColor: '#1BCCCC',
    minWidth: '100%',
    
  };

  const handleSubmitClick = () =>{
    alert('Submit button clicked');
  }

  return (
    
    <div>
      <ButtonBackNavigation/>
      <div style={{padding: '20px'}}>
      <h1 style={{fontSize :'30px', fontWeight:'bold', textAlign: 'center'}}>Add review</h1>
      <FormImagePicker /> 
      <FormTextArea 
      value={text} 
      onChange={handleTextChange}
      /> 
      <Button 
      style={submitButtonStyles} 
      onClick={handleSubmitClick}
      >
        Submit
        </Button>
       </div>
    </div>
  );

};