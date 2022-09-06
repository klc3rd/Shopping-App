import { useRouter } from "next/router";
import ProductView from "../../components/page/view-product/view";
import TransitionContainer from "../../components/page/transition";

const PreviewProductPage = () => {
  const router = useRouter();

  const productID = parseInt(router.query.id as string);

  return (
    <TransitionContainer>
      <div className="view-product">
        <ProductView mode="view" productID={productID} />
      </div>
    </TransitionContainer>
  );
};

PreviewProductPage.displayName = "PreviewProductPage";
export default PreviewProductPage;
