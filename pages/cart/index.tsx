import CartProps from "../../db/serverProps/cartProps";
import { ICartReturn } from "Cart";
import { IUser } from "Users";
import TransitionContainer from "../../components/page/transition";
import CartContainer from "../../components/page/cart/cart";

interface ICart {
  user: IUser;
  cart: ICartReturn;
}

const Cart: React.FC<ICart> = (props) => {
  const { cart, user } = props;

  return (
    <TransitionContainer>
      <div className="cart">
        <CartContainer />
      </div>
    </TransitionContainer>
  );
};

export { CartProps as getServerSideProps };

Cart.displayName = "Cart";
export default Cart;
