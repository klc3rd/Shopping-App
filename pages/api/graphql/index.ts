import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { typeDefs } from "./schema/schema";

import prisma from "../../../db/prisma";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { ServerResponse } from "http";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation },
  context: { prisma },
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
