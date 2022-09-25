import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { HomeContext } from "./home/provider";
import { useRouter } from "next/router";

import CartButton from "./cart/cart_menu_button";

import { useQuery, gql } from "@apollo/client";

const Menu: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const HomeCtx = useContext(HomeContext);

  const nameQuery = gql`
    query {
      user {
        name
      }
    }
  `;

  const { data } = useQuery(nameQuery);

  useEffect(() => {
    if (data) {
      setName(data.user.name);
    }
  }, [data, HomeCtx.cartState]);

  return (
    <nav className="menu">
      {name && <span className="welcome">Welcome, {name}</span>}

      <div className="menu-box">
        <Link href="/">
          <span
            className={`menu__link ${
              router.pathname === "/" ? "menu__active" : ""
            }`}
          >
            Home
          </span>
        </Link>
        {(!session || session.user.verified === false) && (
          <>
            <Link href="/login">
              <span
                className={`menu__link ${
                  router.pathname === "/login" ? "menu__active" : ""
                }`}
              >
                Login
              </span>
            </Link>
            <Link href="/signup">
              <span
                className={`menu__link ${
                  router.pathname === "/signup" ? "menu__active" : ""
                }`}
              >
                Signup
              </span>
            </Link>
          </>
        )}
        {!!session && session.user.verified === true && (
          <>
            <Link href="/new">
              <span
                className={`menu__link ${
                  router.pathname === "/new" ? "menu__active" : ""
                }`}
              >
                Sell
              </span>
            </Link>
            <Link href="/account">
              <span
                className={`menu__link ${
                  router.pathname === "/account" ? "menu__active" : ""
                }`}
              >
                Account
              </span>
            </Link>
            <Link href="/">
              <span
                className="menu__link"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </span>
            </Link>
            {session && session.user.verified === true && (
              <span>
                <CartButton />
              </span>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

Menu.displayName = "Menu";
export default Menu;
