import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    getHello: String
    user(id: ID): User
  }

  type Mutation {
    userCreate(
      name: String!
      username: String!
      email: String!
      password: String!
    ): UserReturn

    productCreate(input: ProductInput, images: [ImageInput]): ProductReturn
  }

  input ProductInput {
    name: String!
    description: String!
    body: String!
    sellerId: Int
    price: Float
    quantity: Int
  }

  input ImageInput {
    productID: Int
    filename: String!
    folder: String!
  }

  type UserReturn {
    error: String
    user: User
  }

  type ProductReturn {
    error: String
    product: Product
    imagesCreate(input: [ImageInput]): [Image]
  }

  type User {
    id: Int
    name: String!
    username: String!
    email: String!
    password: String
    verified: Boolean
    role: String
  }

  type Product {
    id: Int
    name: String!
    description: String!
    body: String!
    sellerId: User
    price: Float
    quantity: Int
    images: [Image]
  }

  type Image {
    id: Int
    filename: String!
    folder: String!
    productID: Int
  }
`;
