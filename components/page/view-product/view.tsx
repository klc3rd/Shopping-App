import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import path from "path";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Gallery from "./gallery";

interface IProductView {
  productID: number;
  mode: string;
}

const ProductView: React.FC<IProductView> = (props) => {
  const { productID, mode } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const query = gql`
    query ($productID: Int) {
      product(id: $productID) {
        name
        description
        price
        quantity
        body
        images {
          id
          filename
          folder
        }
      }
    }
  `;

  const { data } = useQuery(query, { variables: { productID } });

  return (
    <div className="view-product-container">
      <div className="view-product-container-grid">
        <div className="view-product-container-grid-left">
          {data?.product.images.length === 0 && (
            <div className="view-product-noimages">No product images</div>
          )}
          {data?.product.images.length === 1 && (
            <Image
              src={`${path.join(
                "/uploads" +
                  "/" +
                  data.product.images[0].folder +
                  "/" +
                  data.product.images[0].filename
              )}`}
              width="100%"
              height="100%"
              layout="responsive"
              alt={data.product.images[0].filename}
            />
          )}
          {data?.product.images.length > 1 && (
            <Gallery images={data.product.images} />
          )}
        </div>
        <div className="view-product-container-grid-right">
          <div className="view-product-container-top">
            <div className="view-product-container-top__left">
              <span className="view-product-container__name">
                {data?.product.name}
              </span>
              <span className="view-product-container__description">
                {data?.product.description}
              </span>
            </div>
            <div className="view-product-container-top__right">
              <span className="view-product-container__price">
                {formatter.format(data?.product.price)}
              </span>
              <span className="view-product-container__quantity">
                {data?.product.quantity} in stock
              </span>
              {mode == "preview" && (
                <span style={{ marginTop: "1rem" }}>
                  <Link href="/products">
                    <span className="auth-submit__btn">Go to Listings</span>
                  </Link>
                </span>
              )}
            </div>
          </div>
          <hr className="view-product-container__divider" />
          <ReactMarkdown>{data?.product.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

ProductView.displayName = "ProductView";
export default ProductView;
