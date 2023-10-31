import React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import '../../styles/FormStyles.css';

interface FormTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    console.log(newValue); // Log user's input to console 
  };

  return (
    <div style={{marginBottom: '20px'}}>
    <p> Review</p>
    <TextareaAutosize
      className='textarea-custom'
      value={value}
      onChange={handleInputChange}
      placeholder="Enter your review..."
    />
    </div>
  );
};

export default FormTextArea;