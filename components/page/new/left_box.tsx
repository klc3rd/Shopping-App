import { useContext, useState } from "react";
import EmptyImage from "./empty_image";
import FileUploadBtn from "./ui/file-upload-btn";
import axios from "axios";
import { NewListingContext } from "./provider";

const LeftBox = () => {
  const newListingCtx = useContext(NewListingContext);
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);

  const onChange = async (formData: FormData) => {
    console.log(newListingCtx);
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        setUploadingStatus(true);
      },
    };

    const response = await axios.post("/api/upload", formData, config);

    if (response.status === 200) {
      setUploadingStatus(false);
    }

    newListingCtx.images.push({
      folder: response.data.folder,
      filename: response.data.filename,
    });
  };

  return (
    <>
      <div className="scroll">
        <div className="new-container-left-box">
          {newListingCtx.images.length === 0 && <EmptyImage />}
        </div>
      </div>
      <div className="new-container-left-btnbox">
        {!uploadingStatus && (
          <FileUploadBtn uploadFileName="image" onChange={onChange}>
            Upload Image
          </FileUploadBtn>
        )}
        {uploadingStatus && (
          <span className="image-btn-loading">Uploading...</span>
        )}
      </div>
    </>
  );
};

export default LeftBox;
