import { useQuery, gql } from "@apollo/client";

const CheckoutPage: React.FC = () => {
  const query = gql`
    query {
      cartTotal
    }
  `;

  const { data: cartTotal, refetch } = useQuery(query);

  return (
    <div className="checkout">
      <div className="checkout-container"></div>
    </div>
  );
};

CheckoutPage.displayName = "CheckoutPage";
export default CheckoutPage;
