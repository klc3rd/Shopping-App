import { useRouter } from "next/router";
import ProductView from "../../../components/page/view-product/view";

const PreviewProductPage = () => {
  const router = useRouter();

  const productID = parseInt(router.query.id as string);

  return (
    <div>
      <ProductView productID={productID} />
    </div>
  );
};

PreviewProductPage.displayName = "PreviewProductPage";
export default PreviewProductPage;
