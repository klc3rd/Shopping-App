import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    getHello: String
  }

  type Mutation {
    userCreate(
      name: String!
      username: String!
      email: String!
      password: String!
    ): UserReturn
  }

  type UserReturn {
    error: String
    user: User
  }

  type User {
    id: ID
    name: String!
    username: String!
    email: String!
    password: String
    verified: Boolean
    role: String
  }
`;
