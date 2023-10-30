import React, { useState } from "react";
import FormImagePicker from "../../components/Form/FormImagePicker";
import FormTextArea from "../../components/Form/FormTextArea";
import { ButtonBackNavigation } from "../../components";

export const ReviewAddScreen = () => {
  const [text, setText] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

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
       </div>
    </div>
  );

};