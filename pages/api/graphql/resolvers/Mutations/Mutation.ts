import { userCreate } from "./Users";
import { productCreate } from "./Products";
import {
  cartAddProduct,
  cartDeleteProduct,
  cartDeleteAllOfProduct,
} from "./Cart";

export const Mutation = {
  userCreate,
  productCreate,
  cartAddProduct,
  cartDeleteProduct,
  cartDeleteAllOfProduct,
};
