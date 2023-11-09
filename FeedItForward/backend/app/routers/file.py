from fastapi import APIRouter, UploadFile, Depends, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Annotated

from database import get_db
from controllers.file import FileController, FileUploadResponse

router = APIRouter()

tags_metadata = [
    {
        "name": "File (Upload and Retrieval)",
        "description": "API Endpoints for Uploading and Retrieving File"
    },
]

# ------------------------------------------------------------ #
# -------------------- File (Upload and Retrieval) -------------------- #
# ------------------------------------------------------------ #
@router.post('/file/upload', response_model=FileUploadResponse, tags=["File (Upload and Retrieval)"])
async def upload_file(user_id: Annotated[int, Form()], file: Annotated[UploadFile, Form()], db: Session = Depends(get_db)):
    return FileController.uploadFile(user_id, file, db)

@router.post('/files/upload', response_model=FileUploadResponse, tags=["File (Upload and Retrieval)"])
async def upload_files(user_id: Annotated[int, Form()], files: Annotated[list[UploadFile], Form()], db: Session = Depends(get_db)):
    return FileController.uploadFiles(user_id, files, db)

@router.post('/file/retrieve', response_class=FileResponse, tags=["File (Upload and Retrieval)"])
async def retrieve_file(file_path: str):
    return FileController.retrieveFile(file_path=file_path)
