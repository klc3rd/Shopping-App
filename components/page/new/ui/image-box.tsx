import { useContext, Dispatch } from "react";
import Image from "next/image";
import path from "path";
import { NewListingContext } from "../provider";

interface IImageBox {
  id: number;
  folder: string;
  file: string;
  setRender: Dispatch<any>;
}

const ImageBox: React.FC<IImageBox> = (props) => {
  const { id, folder, file, setRender } = props;

  const newListingCtx = useContext(NewListingContext);

  const fileLocation = path.join("/uploads", folder, file);

  const clickHandler = () => {
    newListingCtx.images = newListingCtx.images.filter((image) => {
      console.log(image);
      return image.id !== id;
    });

    setRender((prevCount: number) => prevCount + 1);
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
