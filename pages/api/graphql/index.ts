import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { typeDefs } from "./schema/schema";

import prisma from "../../../db/prisma";
import { Query } from "./resolvers/Query";
import { Product } from "./resolvers/Product";
import { Mutation } from "./resolvers/Mutations/Mutation";
import { ServerResponse } from "http";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { Query, Product, Mutation },
  context: async ({ req, res }) => {
    const session = await await unstable_getServerSession(
      req,
      res,
      authOptions
    );
    return {
      prisma,
      session,
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
