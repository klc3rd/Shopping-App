import Image from "next/image";
import path from "path";
import { IPassedProduct } from "Product";
import Link from "next/link";

interface IProductCard {
  product: IPassedProduct;
}

const ProductCard: React.FC<IProductCard> = (props) => {
  const { product } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="products-card">
      <div className="products-card__image">
        {product?.images[0] && (
          <Image
            src={path.join(
              "/uploads/" +
                product.images[0].folder +
                "/" +
                product.images[0].filename
            )}
            alt="Product Image"
            width="100%"
            height="100%"
            layout="responsive"
          />
        )}
        {!product.images[0] && (
          <div className="products-card__image-none">No Product Image</div>
        )}
      </div>
      <div className="products-card-right">
        <div className="products-card-right-top">
          <span className="products-card-right__header">{product?.name}</span>
          <span className="products-card-right__header-small">
            <Link href={`/product/${product?.id}`}>
              <span className="products-card-right__header-small-link">
                {product?.name} &rarr;
              </span>
            </Link>
          </span>
          <span className="products-card-right__description">
            {product?.description}
          </span>
        </div>
        <div className="products-card-right-bottom">
          <div className="products-card-right-bottom-left">
            <span className="products-card-right__price">
              {formatter.format(product?.price)}
            </span>
            <span className="products-card-right__quantity">
              Available - {product?.quantity}
            </span>
          </div>
          <div className="products-card-right-bottom-right">
            <Link href={`/product/${product?.id}`}>
              <span className="products-card-link">View Product &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.displayName = "ProductCard";
export default ProductCard;
