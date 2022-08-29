import { createProduct } from "../../../../../db/products";
import { IContext } from "graph";
import { IProduct, IImage } from "Product";

interface ReturnProduct {
  error?: string;
  product?: IProduct;
}

interface IProductInput {
  input: IProduct;
  images?: IImage[];
}

export const productCreate = async (
  _: any,
  { input, images }: IProductInput,
  { prisma, session }: IContext
): Promise<ReturnProduct> => {
  const { name, description, body, price, quantity } = input;
  if (!session || session.user.verified !== true) {
    return {
      error: "You must be signed in",
    };
  }

  const sellerId = session.user.id;
  const product = await createProduct(
    name,
    description,
    body,
    price,
    sellerId,
    quantity,
    images!,
    { prisma }
  );

  return {
    product,
  };
};
