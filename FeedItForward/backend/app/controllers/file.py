from fastapi import HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel

import os
import shutil

import services.user as users_services

server_upload_base_directory = os.path.join(os.getcwd(), "assets", "uploads")

class FileUploadResponse(BaseModel):
    file_path: str

class FileController:
    # ----- File ----- #
    def uploadFile(user_id: int, file: UploadFile, db: Session):
        # user_id must be valid
        db_user = users_services.get_user_by_id(db, user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="Invalid user_id")

        # Validate file type - Must be Image
        if file.content_type not in ["image/jpeg", "image/png", "image/gif"]:
            raise HTTPException(status_code=400, detail="Invalid file type. File type must be jpeg, png, or gif")
        
        # Create upload directory if it does not exist
        user_upload_directory = os.path.join(server_upload_base_directory, "user_{0}".format(user_id))
        if not os.path.exists(user_upload_directory):
            os.makedirs(user_upload_directory)
        
        # Destination File Path
        dest_file_path = os.path.join(user_upload_directory, file.filename)

        # Copy the file contents
        with open(dest_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        file_response = FileUploadResponse(
            file_path=str(os.path.join("user_{0}".format(user_id), file.filename))
        )

        return file_response

    def uploadFiles(user_id: int, files: list[UploadFile], db: Session):
        file_paths = []
        for file in files:
            file_paths.append(FileController.uploadFile(user_id, file, db).file_path)
        
        file_response = FileUploadResponse(file_path=",".join(file_paths))

        return file_response

    def retrieveFile(file_path: str):
        # Full File Path
        full_file_path = os.path.join(server_upload_base_directory, file_path)

        return FileResponse(full_file_path)
