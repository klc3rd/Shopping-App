import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { HomeContext } from "../home/provider";
import { useContext } from "react";

import Link from "next/link";

import { ICartReturn } from "Cart";

import CartItem from "./cart_item";

const CartContainer: React.FC = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [cart, setCart] = useState<[ICartReturn] | null>(null);
  const [total, setTotal] = useState<String>("");

  const homeCtx = useContext(HomeContext);

  const query = gql`
    query {
      cart {
        product {
          id
          name
          description
          body
          price
          images {
            id
            folder
            filename
          }
        }
        quantity
      }
    }
  `;

  const totalQuery = gql`
    query {
      cartTotal
    }
  `;

  const { data, refetch } = useQuery(query);
  const { data: totalData, refetch: refetchTotal } = useQuery(totalQuery);

  useEffect(() => {
    refetch();
    refetchTotal();

    if (data) {
      setCart(data.cart);
    }

    if (totalData) {
      setTotal(formatter.format(totalData.cartTotal));
    }
  }, [data, homeCtx.cartState, refetch]);

  return (
    <div className="cart-container">
      {cart &&
        cart.map((item) => (
          <div className="cart-item" key={item.product.id}>
            <CartItem item={item} />
          </div>
        ))}
      <div className="cart-container">
        <div className="cart-item">
          <div className="cart-quantity">
            <div className="cart-total-left">Total</div>
            <div className="cart-linetotal">
              <div className="cart-total-right">{total}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-container">
        <div className="cart-item">
          <div className="cart-item-checkout">
            <Link href="/cart/checkout">
              <span className="auth-submit__btn">Checkout</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CartContainer.displayName = "CartContainer";
export default CartContainer;
