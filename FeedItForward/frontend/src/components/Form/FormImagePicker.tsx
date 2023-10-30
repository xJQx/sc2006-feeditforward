import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../styles/FormStyles.css';
import { IoImageOutline} from "react-icons/io5";

const FormImagePicker: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      // upload and process the files here (need backend..?)
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    // will put styling in separate css file -- or inline css can? a bit laze HAHHA 
    return (
        <div style={{marginBottom: '30px'}}>
        <p style={{ textAlign: 'left' }}>Photo</p>
        <div className='dashed-outline-container' style={{ position: 'relative' }}>
          <div {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <IoImageOutline size={64} color="#ccc" />
            <p style={{ color: "#ccc" }}>Click here to upload a picture</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FormImagePicker;
