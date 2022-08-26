import { useContext, useState } from "react";
import EmptyImage from "./empty_image";
import FileUploadBtn from "./ui/file-upload-btn";
import axios from "axios";
import { NewListingContext } from "./provider";

import ImageBox from "./ui/image-box";

const LeftBox = () => {
  const newListingCtx = useContext(NewListingContext);
  const images = newListingCtx.images;
  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [_, renderChanges] = useState<number>(0);

  const onChange = async (formData: FormData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: () => {
        setUploadingStatus(true);
      },
    };

    const response = await axios.post("/api/upload", formData, config);

    if (response.status === 200) {
      setUploadingStatus(false);

      newListingCtx.images.push({
        id: newListingCtx.count,
        folder: response.data.folder,
        filename: response.data.filename,
      });

      newListingCtx.count++;

      // This is to force a rerender anytime an image is added or deleted
      renderChanges((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="new-container-left-box">
        <>
          {images.length === 0 && <EmptyImage />}
          {images.length > 0 &&
            images.map((image) => {
              return (
                <ImageBox
                  key={image.id}
                  id={image.id}
                  folder={image.folder}
                  file={image.filename}
                  setRender={renderChanges}
                />
              );
            })}
        </>
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
