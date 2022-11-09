import { IContext } from "graph";

import { createOrder } from "../../../../../db/orders";

import { IOrders } from "Orders";

interface ReturnOrder {
  error?: string;
  message?: string;
}

export const orderCreate = async (
  _: any,
  input: IOrders,
  { prisma, session }: IContext
): Promise<ReturnOrder> => {
  if (!session) {
    return {
      error: "You must be signed in",
    };
  }

  await createOrder(input, { prisma });

  return {
    message: "Order Created",
  };
};
