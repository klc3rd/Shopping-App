import { useEffect } from "react";
import Image from "next/image";
import path from "path";

interface IImageBox {
  folder: string;
  file: string;
}

const ImageBox: React.FC<IImageBox> = (props) => {
  const { folder, file } = props;
  const fileLocation = path.join("/uploads", folder, file);
  console.log(fileLocation);

  return (
    <div className="uploaded-image">
      <Image
        src={fileLocation}
        alt={fileLocation}
        height="100%"
        width="100%"
        layout="responsive"
      />
    </div>
  );
};

ImageBox.displayName = "ImageBox";
export default ImageBox;
