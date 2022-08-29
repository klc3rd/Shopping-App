import { IProduct } from "Product";
import { IContext } from "graph";

export const Product = {
  images: async ({ id }: IProduct, _: any, { prisma }: IContext) => {
    const images = await prisma.image.findMany({ where: { productID: id } });

    return images;
  },
};
