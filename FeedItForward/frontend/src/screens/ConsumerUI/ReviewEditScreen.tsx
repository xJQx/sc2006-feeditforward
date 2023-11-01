import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ScreenTitle } from "../../components";
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
      <ScreenTitle title = "Edit review"/>
      <div style={{padding: '20px'}}>
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