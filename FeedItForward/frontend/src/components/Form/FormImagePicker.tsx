import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoImageOutline } from "react-icons/io5";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { FaPlus, FaFileImage } from "react-icons/fa6";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { serverDomainUrl } from "../../utils/serverDomainUrl";

interface FormImagePickerProps {
  isEdit?: boolean;
  label: string;
  labelClassNames?: string;
  filePaths: Array<string>;
  setFilePaths: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const FormImagePicker = (props: FormImagePickerProps) => {
  const { isEdit, label, labelClassNames, filePaths, setFilePaths } = props;
  const { user } = useAuthContext();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Upload file to backend
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("user_id", user?.user_id.toString() ?? "0");

    try {
      const fileUploadResponse = await fetch(`${serverDomainUrl}/file/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
      });
      if (fileUploadResponse.ok) {
        const { file_path }: { file_path: string } =
          await fileUploadResponse.json();
        console.log(file_path);
        setFilePaths(prev => [...prev, file_path]);
      } else {
        console.log("Failed to upload photo!");
        toast.error("Failed to upload photo!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to upload photo!");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (filePath: string) => {
    setFilePaths(prev => prev.filter(p => p !== filePath));
    toast.success(`Image ${filePath.split("\\")[1]} removed`);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p className={labelClassNames}>{label}</p>

      {/* Upload Container */}
      <div
        className="border-[2px] border-dashed border-[#CCC] rounded-[8px] p-[20px] w-full h-[180px] flex justify-center items-center mt-[5px]"
        style={{ position: "relative" }}
      >
        <div
          className="flex flex-col items-center text-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <IoImageOutline size={64} color="#ccc" />
          <p className="text-[#ccc]">Click here to upload a picture</p>
          {isEdit && (
            <div className="absolute bottom-[10px] right-[10px] flex gap-[8px]">
              <FaPlus size={20} color="#000" />
              <FaPencilAlt size={20} color="#000" />
            </div>
          )}
        </div>
      </div>

      {/* Files Uploaded */}
      {filePaths.map(filePath => (
        <div
          key={filePath}
          className="flex flex-row items-center gap-[2px] mt-1"
        >
          <div>
            <FaFileImage className="w-[14px] h-[14px] text-brand-tertiary-active" />
          </div>
          <span className="text-[12px] text-brand-tertiary-active font-bold">
            {filePath.split("\\")[1]}
          </span>
          <div onClick={() => handleRemoveFile(filePath)}>
            <FaTimes className="text-[14px] text-brand-primary-active" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormImagePicker;
