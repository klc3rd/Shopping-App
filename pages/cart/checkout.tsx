import CartProps from "../../db/serverProps/cartProps";
import { ICartReturn } from "Cart";
import { IUser } from "Users";
import TransitionContainer from "../../components/page/transition";
import CheckoutPage from "../../components/page/cart/checkout";

interface ICheckout {
  user: IUser;
  cart: ICartReturn;
}

const Checkout: React.FC<ICheckout> = (props) => {
  const { cart, user } = props;

  return (
    <TransitionContainer>
      <div className="cart">
        <CheckoutPage />
      </div>
    </TransitionContainer>
  );
};

export { CartProps as getServerSideProps };

Checkout.displayName = "Checkout";
export default Checkout;
