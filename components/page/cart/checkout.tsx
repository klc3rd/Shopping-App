import { useQuery, gql } from "@apollo/client";
import Input from "../form/input";

const CheckoutPage: React.FC = () => {
  const query = gql`
    query {
      cartTotal
    }
  `;

  const { data: cartTotal, refetch } = useQuery(query);

  return (
    <div className="checkout">
      <div className="checkout-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="checkout-container__address">
            <div className="checkout-container__address-left">Name</div>
            <div>
              <Input inputType="text">First and Last</Input>
            </div>
          </div>
          <div className="checkout-container__address">
            <div className="checkout-container__address-left">Address</div>
            <div>
              <Input inputType="text">Address Line 1</Input>
            </div>
          </div>
          <div className="checkout-container__address">
            <div className="checkout-container__address-left"></div>
            <div>
              <Input inputType="text">Address Line 2</Input>
            </div>
          </div>
          <div className="checkout-container__bottom">
            <button
              onClick={() => {
                console.log("test");
              }}
              className="auth-submit__btn"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CheckoutPage.displayName = "CheckoutPage";
export default CheckoutPage;
