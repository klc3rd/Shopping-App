import { IImage } from "Product";
import { useState, useEffect } from "react";
import path from "path";
import Image from "next/image";

interface IGallery {
  images: IImage[];
}
const Gallery: React.FC<IGallery> = (props) => {
  const { images } = props;
  const [shownImage, setShownImage] = useState<IImage | null>(null);

  // Set first image
  useEffect(() => {
    if (shownImage === null) {
      setShownImage({
        id: images[0].id,
        folder: images[0].folder,
        filename: images[0].filename,
      });
    }
  }, [images, shownImage]);

  const changeImageHandler = (id: number) => {
    const selectedImage = images.filter((image) => image.id === id);

    setShownImage({
      id: selectedImage[0].id,
      folder: selectedImage[0].folder,
      filename: selectedImage[0].filename,
    });
  };

  return (
    <div className="gallery">
      <div>
        <Image
          src={`${path.join(
            "/uploads/" + shownImage?.folder + "/" + shownImage?.filename
          )}`}
          width="100%"
          height="100%"
          layout="responsive"
          alt={shownImage?.filename}
        />
      </div>
      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              changeImageHandler(image.id!);
            }}
          >
            <Image
              src={`${path.join(
                "/uploads/" + image.folder + "/" + image.filename
              )}`}
              width="100%"
              height="100%"
              layout="responsive"
              alt="Product Image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = "Gallery";
export default Gallery;
