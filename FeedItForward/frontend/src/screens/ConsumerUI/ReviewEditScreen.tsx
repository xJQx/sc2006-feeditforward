import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";
import {Button} from '@mui/material';

export const ReviewEditScreen = () => {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const cancelButtonStyles = {
    color: '#1BCCCC',            
    minWidth: '45%', 
    borderColor: '#1BCCCC'
  };

  const saveButtonStyles = {
    color: 'white',            
    backgroundColor: '#1BCCCC',
    minWidth: '45%'
  };
 
  const handleCancelClick = () =>{
    alert('Cancel button clicked');
  }

  const handleSaveClick = () =>{
    alert('Save button clicked');
  }

  return (
    
    <div>
      <ButtonBackNavigation/>
      <div style={{padding: '20px'}}>
      <h1 style={{fontSize :'30px', fontWeight:'bold', textAlign: 'center'}}>Edit review</h1>
      <FormImagePicker
      label = "Photo"
      isEdit /> 

      <FormTextArea 
      value={text} 
      onChange={handleTextChange}
      isEdit
      /> 
   

      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Button 
          style={cancelButtonStyles} 
          onClick={handleCancelClick}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          style={saveButtonStyles} 
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
      </div>
    </div>
  );

};