import Link from "next/link";

const Menu = () => {
  return (
    <nav className="menu">
      <div className="menu-box">
        <Link href="/">
          <span className="menu__link">Home</span>
        </Link>
        <Link href="/login">
          <span className="menu__link">Login</span>
        </Link>
        <Link href="/signup">
          <span className="menu__link">Signup</span>
        </Link>
      </div>
    </nav>
  );
};

Menu.displayName = "Menu";
export default Menu;
