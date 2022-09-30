import {
  userCreate,
  userUpdateName,
  userUpdateUsername,
  userUpdateEmail,
  userUpdatePassword,
} from "./Users";
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
  userUpdateName,
  userUpdateUsername,
  userUpdateEmail,
  userUpdatePassword,
};
