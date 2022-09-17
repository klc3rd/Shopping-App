import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const CartMenuButton: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const query = gql`
    query {
      cartCount
    }
  `;

  const { data } = useQuery(query);

  useEffect(() => {
    if (data) {
      setCartCount(data.cartCount);
    }
  }, [data]);

  console.log(data);

  return (
    <Link href="/cart">
      <span className="menu__link cart-menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cart-menu__btn"
          viewBox="0 0 512 512"
        >
          <title>Cart</title>
          <circle
            cx="176"
            cy="416"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <circle
            cx="400"
            cy="416"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M48 80h64l48 272h256"
          />
          <path
            d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
        <span className="cart-menu__txt">{cartCount}</span>
      </span>
    </Link>
  );
};

CartMenuButton.displayName = "CartMenuButton";
export default CartMenuButton;
