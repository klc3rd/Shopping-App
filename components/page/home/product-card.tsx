import Image from "next/image";
import path from "path";
import { IPassedProduct } from "Product";

interface IProductCard {
  product: IPassedProduct;
}

const ProductCard: React.FC<IProductCard> = (props) => {
  const { product } = props;

  return (
    <div className="products-card">
      <div className="products-card__image">
        {product.images[0] && (
          <Image
            src={path.join(
              "/uploads/" +
                product.images[0].folder +
                "/" +
                product.images[0].filename
            )}
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
        <span className="products-card-right__header">{product.name}</span>
        <span className="products-card-right__description">
          {product.description}
        </span>
      </div>
    </div>
  );
};

ProductCard.displayName = "ProductCard";
export default ProductCard;
