import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../styles/FormStyles.css';
import { IoImageOutline, IoAdd, IoPencilSharp} from "react-icons/io5";

interface FormImagePickerProps {
  isEdit?: boolean;
  label: string;
  labelFontSize?: string;
}



const FormImagePicker: React.FC<FormImagePickerProps> = ({ isEdit, label, labelFontSize }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // upload and process the files here (need backend..?)
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const labelStyle = {
    fontSize: labelFontSize, 
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={labelStyle}>{label}</p>
      <div className='dashed-outline-container' style={{ position: 'relative' }}>
        <div {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <input {...getInputProps()} />
          <IoImageOutline size={64} color="#ccc" />
          <p style={{ color: "#ccc" }}>Click here to upload a picture</p>
          {isEdit && (
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', display: 'flex', gap: '5px' }}>
              <IoAdd size={20} color="#000" />
              <IoPencilSharp size={20} color="#000" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormImagePicker;