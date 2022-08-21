import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Menu: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="menu">
      <div className="menu-box">
        <Link href="/">
          <span className="menu__link">Home</span>
        </Link>
        {!session && (
          <>
            <Link href="/login">
              <span className="menu__link">Login</span>
            </Link>
            <Link href="/signup">
              <span className="menu__link">Signup</span>
            </Link>
          </>
        )}
        {!!session && (
          <>
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
