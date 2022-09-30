import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    user: User
    product(id: Int): Product
    products: [Product]
    cart: [CartReturn]
    cartCount: Int
  }

  type Mutation {
    userCreate(
      name: String!
      username: String!
      email: String!
      password: String!
    ): UserReturn

    userUpdateName(name: String!): String!
    userUpdateUsername(username: String!): String!
    userUpdateEmail(email: String!): String!
    userUpdatePassword(password: String!): String!

    productCreate(input: ProductInput, images: [ImageInput]): ProductReturn

    cartAddProduct(productID: Int!): CartAddReturn
    cartDeleteProduct(productID: Int!): CartAddReturn
    cartDeleteAllOfProduct(productID: Int!): CartAddReturn
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
    id: Int
    filename: String!
    folder: String!
  }

  type UserReturn {
    error: String
    user: User
  }

  type CartReturn {
    product: Product
    quantity: Int
  }

  type CartAddReturn {
    error: String
    message: String
  }

  type ProductReturn {
    error: String
    product: Product
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
