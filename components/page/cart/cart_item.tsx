import Image from "next/image";
import path from "path";
import { ICartReturn } from "Cart";

interface ICartItem {
  item: ICartReturn;
}

const cartItem: React.FC<ICartItem> = (props) => {
  const { item } = props;

  console.log(item);

  return (
    <div className="cart-item">
      {item.product.images[0] && (
        <Image
          src={path.join(
            "/uploads" +
              "/" +
              item.product.images[0].folder +
              "/" +
              item.product.images[0].filename
          )}
          width="100%"
          height="100%"
        />
      )}
      {!item.product.images[0] && (
        <div className="view-product-noimages cart-item-smalltext">
          No Image
        </div>
      )}
      <div className="cart-item-name">{item.product.name}</div>
    </div>
  );
};

export default cartItem;
