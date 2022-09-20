import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { HomeContext } from "../home/provider";
import { useContext } from "react";

import { ICartReturn } from "Cart";

import CartItem from "./cart_item";

const CartContainer: React.FC = () => {
  const [cart, setCart] = useState<[ICartReturn] | null>(null);

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

  const { data, refetch } = useQuery(query);

  useEffect(() => {
    refetch();

    if (data) {
      setCart(data.cart);
    }
  }, [data, homeCtx.cartState]);

  return (
    <div className="cart-container">
      {cart &&
        cart.map((item) => <CartItem key={item.product.id} item={item} />)}
    </div>
  );
};

CartContainer.displayName = "CartContainer";
export default CartContainer;
