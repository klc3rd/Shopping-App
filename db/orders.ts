import { IOrders } from "Orders";
import { IContext } from "graph";

export const createOrder = async (input: IOrders, { prisma }: IContext) => {
  const result = await prisma.orders.create({ data: input });

  return result;
};
