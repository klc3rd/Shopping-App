import { useState, useContext, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { ICartReturn } from "Cart";
import RemoveBtn from "./remove-btn";

import { HomeContext } from "../home/provider";

interface ICartItem {
  item: ICartReturn;
}

const CartItem: React.FC<ICartItem> = (props) => {
  const { item } = props;
  const [removeState, setRemoveState] = useState<boolean>(false);
  const homeCtx = useContext(HomeContext);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const deleteOneQuery = gql`
    mutation ($productID: Int!) {
      cartDeleteProduct(productID: $productID) {
        error
        message
      }
    }
  `;

  const deleteAllQuery = gql`
    mutation ($productID: Int!) {
      cartDeleteAllOfProduct(productID: $productID) {
        error
        message
      }
    }
  `;

  const [deleteOne] = useMutation(deleteOneQuery);
  const [deleteAll] = useMutation(deleteAllQuery);

  const deleteOneHandler = async () => {
    console.log(item.product.id);
    await deleteOne({ variables: { productID: item.product.id } });
    homeCtx.updateCartState!((val) => val + 1);
  };

  const deleteAllHandler = async () => {
    await deleteAll({ variables: { productID: item.product.id } });
    homeCtx.updateCartState!((val) => val + 1);
  };

  return (
    <div className="cart-item">
      {item.product.images[0] && (
        <Image
          src={path.join(
            "/uploads" +
              "/" +
              item.product.images[0].folder +
              "/" +
              item.product.images[0].filename
          )}
          width="100%"
          height="100%"
          alt="Product Image"
        />
      )}
      {!item.product.images[0] && (
        <div className="view-product-noimages cart-item-smalltext">
          No Image
        </div>
      )}
      <div className="cart-item-name">
        <Link href={`product/${item.product.id}`}>
          <span className="cart-link">{item.product.name}</span>
        </Link>
      </div>
      <div className="cart-quantity">
        x{item.quantity}
        <div
          className="cart-remove"
          onClick={() => {
            setRemoveState((val) => !val);
          }}
        >
          {!removeState && <RemoveBtn />}
          {removeState && (
            <>
              <span className="cart-remove__link" onClick={deleteOneHandler}>
                One
              </span>
              <span className="cart-remove__link" onClick={deleteAllHandler}>
                All
              </span>
            </>
          )}
        </div>
        <div className="cart-linetotal">
          {formatter.format(item.quantity * item.product.price)}
        </div>
      </div>
    </div>
  );
};

CartItem.displayName = "CartItem";
export default CartItem;
