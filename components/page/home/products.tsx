import ProductCard from "./product-card";
import { useQuery, gql } from "@apollo/client";
import { IPassedProduct } from "Product";

const ProductsPage: React.FC = () => {
  const query = gql`
    query {
      products {
        id
        name
        quantity
        description
        price
        body
        images {
          filename
          folder
        }
      }
    }
  `;

  const { data } = useQuery(query);

  return (
    <div className="products">
      <div className="products-container">
        {data?.products &&
          data.products.map((product: IPassedProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
