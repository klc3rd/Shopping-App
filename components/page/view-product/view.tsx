interface IProductView {
  productID: number;
}

const ProductView: React.FC<IProductView> = (props) => {
  const { productID } = props;

  return <div></div>;
};

ProductView.displayName = "ProductView";
export default ProductView;
