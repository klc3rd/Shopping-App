import { useRef, useState, useContext, useEffect } from "react";
import LeftBox from "./left_box";
import NewListingProvider, { NewListingContext } from "./provider";
import Input from "../form/input";
import TextArea from "../form/textarea";
import { useRouter } from "next/router";
import { useMutation, gql } from "@apollo/client";
import { useSession } from "next-auth/react";

const NewListing: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const newListingCtx = useContext(NewListingContext);

  const productCreateQuery = gql`
    mutation ($input: ProductInput, $images: [ImageInput]) {
      productCreate(input: $input, images: $images) {
        error
        product {
          id
        }
      }
    }
  `;

  const [addProduct, { data }] = useMutation(productCreateQuery, {
    onError(err) {
      if (err instanceof Error) {
        setGeneralError(err.message);
      }
    },
  });

  const productNameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [productNameError, setProductNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const newPostHandler = async () => {
    clearErrors();

    const sellerId = session!.user.id;
    const name = productNameRef.current!.value;
    const price = priceRef.current!.value;
    const description = descriptionRef.current!.value;
    const quantity = quantityRef.current!.value;
    const body = bodyRef.current!.value;

    if (!name) {
      setProductNameError("You must provide a product name");
      return;
    }

    if (!price) {
      setPriceError("Price is required");
    }

    if (!description) {
      setDescriptionError("You must provide a description");
      return;
    }

    if (!quantity) {
      setQuantityError("Quantity is required");
      return;
    }

    if (!body) {
      setBodyError("Please provide a listing body");
      return;
    }

    const images = newListingCtx.images;
    console.log(images);

    const addProductObj = {
      variables: {
        input: {
          name,
          body,
          description,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          sellerId,
        },
        images: images,
      },
    };

    await addProduct(addProductObj);
  };

  useEffect(() => {
    if (data) {
      const productID = data.productCreate.product.id;
      router.replace(`/product/preview/${productID}`);
    }
  }, [data, router]);

  const clearErrors = () => {
    setGeneralError(null);
    setProductNameError(null);
    setPriceError(null);
    setDescriptionError(null);
    setQuantityError(null);
    setBodyError(null);
  };

  return (
    <NewListingProvider>
      <div className="new">
        <div className="new-container">
          <div className="new-container-left">
            <LeftBox />
          </div>
          <div className="new-container-right">
            <span className="new-container-right-heading">
              New Product Listing
            </span>
            <form onSubmit={(e) => e.preventDefault()} onChange={clearErrors}>
              <div className="new-container-grid">
                <div className="new-container-box">
                  <Input ref={productNameRef}>Product Name</Input>
                  {productNameError && (
                    <span className="error">{productNameError}</span>
                  )}
                </div>
                <div className="new-container-box">
                  <div className="new-container-grid-innerflex">
                    <span>$</span>
                    <Input ref={priceRef} inputType="number" step={0.01}>
                      Price
                    </Input>
                  </div>
                  {priceError && <span className="error">{priceError}</span>}
                </div>
                <div className="new-container-box">
                  <Input ref={descriptionRef}>Description</Input>
                  {descriptionError && (
                    <span className="error">{descriptionError}</span>
                  )}
                </div>
                <div className="new-container-box">
                  <Input ref={quantityRef} inputType="number" step={1}>
                    Quantity
                  </Input>
                  {quantityError && (
                    <span className="error">{quantityError}</span>
                  )}
                </div>
                {bodyError && <span className="error">{bodyError}</span>}
                <TextArea
                  ref={bodyRef}
                  className="new-container-grid-textarea"
                  placeholder="Listing body"
                />
              </div>
              <div className="new-container-submit-box">
                {generalError && (
                  <span className="error" style={{ marginRight: "5rem" }}>
                    {generalError}
                  </span>
                )}
                <button className="auth-submit__btn" onClick={newPostHandler}>
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NewListingProvider>
  );
};

NewListing.displayName = "NewListing";
export default NewListing;
