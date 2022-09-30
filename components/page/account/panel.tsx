import Link from "next/link";

const Panel: React.FC = () => {
  return (
    <nav className="account-panel">
      <Link href="/account/orders">
        <span className="account-panel__link">View Orders</span>
      </Link>
      <Link href="/account">
        <span className="account-panel__link">Edit Account</span>
      </Link>
      <Link href="/account/password">
        <span className="account-panel__link">Change Password</span>
      </Link>
      <Link href="/account/products">
        <span className="account-panel__link">Your Products</span>
      </Link>
    </nav>
  );
};

Panel.displayName = "Panel";
export default Panel;
