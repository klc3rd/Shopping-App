import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

const Menu: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="menu">
      {session?.user && (
        <span className="welcome">Welcome, {session.user.name}</span>
      )}

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
          </>
        )}
      </div>
    </nav>
  );
};

Menu.displayName = "Menu";
export default Menu;
