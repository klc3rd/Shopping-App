import { IContext } from "graph";
import { IUser } from "Users";

export const Query = {
  getHello: () => "Hello, world!",
  user: async (_: any, { id }: { id: string }, { prisma }: IContext) => {
    const user = await prisma.user.findUnique({ where: { id: id } });

    return user;
  },
};
