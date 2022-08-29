// Temporary comment to show mutation query
// mutation {
//   productCreate(input: {
//     name: "Name",
//     body: "Body",
//     description: "Desc",
//     quantity: 5,
//     price: 250,
//     sellerId: 1
//   },
//     images: [{
//       filename: "Test",
//       folder: "Test2",
//     }, {
//       filename: "Another",
//       folder: "More"
//     }]
//   ){
//   product {
//     name
//     description
//   }
//   }
// }

import { IImage } from "Product";
import { IContext } from "graph";

export const createProduct = async (
  name: string,
  description: string,
  body: string,
  price: number,
  sellerId: number,
  quantity: number,
  images: IImage[],
  { prisma }: IContext
) => {
  const newImages = images.map((image) => {
    return {
      filename: image.filename,
      folder: image.folder,
    };
  });

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      body,
      price,
      visible: true,
      seller: {
        connect: { id: sellerId },
      },
      quantity,
      images: {
        create: newImages,
      },
    },
  });

  return newProduct;
};
