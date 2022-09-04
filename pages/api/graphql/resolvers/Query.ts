import { IContext } from "graph";

interface Iid {
  id: number;
}

export const Query = {
  user: async (_: any, { id }: Iid, { prisma }: IContext) => {
    const user = await prisma.user.findUnique({ where: { id: id } });

    return user;
  },

  product: async (_: any, { id }: Iid, { prisma }: IContext) => {
    const product = await prisma.product.findUnique({ where: { id: id } });

    return product;
  },

  products: async (_: any, { id }: Iid, { prisma }: IContext) => {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
      where: {
        NOT: {
          quantity: 0,
        },
      },
    });

    return products;
  },
};
