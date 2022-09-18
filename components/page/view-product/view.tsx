import { useQuery, useMutation, gql } from "@apollo/client";
import Link from "next/link";
import path from "path";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Gallery from "./gallery";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface IProductView {
  productID: number;
  mode: string;
}

const ProductView: React.FC<IProductView> = (props) => {
  const router = useRouter();

  const { productID, mode } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: session } = useSession();

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

  const addCartMutation = gql`
    mutation ($productID: Int!) {
      cartAddProduct(productID: $productID) {
        message
      }
    }
  `;

  const { data } = useQuery(query, { variables: { productID } });
  const [addProduct] = useMutation(addCartMutation, {
    variables: { productID },
  });

  const addToCart = async () => {
    await addProduct({ variables: { productID } });
    router.push("/cart");
  };

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
              {mode == "view" && data?.product.quantity > 0 && session?.user && (
                <span>
                  <button className="cart-add-btn" onClick={addToCart}>
                    Add to Cart
                  </button>
                </span>
              )}
              {mode == "preview" && (
                <span style={{ marginTop: "1rem" }}>
                  <Link href="/">
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
