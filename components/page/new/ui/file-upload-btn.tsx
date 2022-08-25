import { useRef } from "react";

export interface IFileUploadButton {
  acceptedFileTypes?: string;
  children: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}

const FileUploadButton: React.FC<IFileUploadButton> = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <div>
      <form ref={formRef}>
        <button type="button" className="image-btn" onClick={onClickHandler}>
          {props.children}
        </button>
        <input
          accept={props.acceptedFileTypes}
          multiple={false}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
        />
      </form>
    </div>
  );
};

FileUploadButton.defaultProps = {
  acceptedFileTypes: "",
};
FileUploadButton.displayName = "FileUploadButton";
export default FileUploadButton;
