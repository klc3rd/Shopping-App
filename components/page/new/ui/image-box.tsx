import { useContext, Dispatch } from "react";
import Image from "next/image";
import path from "path";
import { NewListingContext } from "../provider";

interface IImageBox {
  id: number;
  folder: string;
  file: string;
  setCount: Dispatch<any>;
}

const ImageBox: React.FC<IImageBox> = (props) => {
  const { id, folder, file, setCount } = props;

  const newListingCtx = useContext(NewListingContext);

  const fileLocation = path.join("/uploads", folder, file);
  console.log(fileLocation);

  const clickHandler = () => {
    newListingCtx.images = newListingCtx.images.filter((image) => {
      console.log(image);
      return image.id !== id;
    });

    setCount((prevCount: number) => prevCount + 1);
  };

  return (
    <div className="uploaded-image">
      <Image
        src={fileLocation}
        alt={fileLocation}
        height="100%"
        width="100%"
        layout="responsive"
        onClick={clickHandler}
      />
    </div>
  );
};

ImageBox.displayName = "ImageBox";
export default ImageBox;
