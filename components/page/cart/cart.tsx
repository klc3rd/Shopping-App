import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const CartContainer: React.FC = () => {
  const [cart, setCart] = useState<[{}]>([{}]);

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
    if (data) {
      setCart(data.cart);
    }
  }, [data]);

  return <div className="cart-container"></div>;
};

CartContainer.displayName = "CartContainer";
export default CartContainer;
