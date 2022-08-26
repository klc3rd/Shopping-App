import { useRef } from "react";
import LeftBox from "./left_box";
import NewListingProvider from "./provider";
import Input from "../form/input";
import TextArea from "../form/textarea";

const NewListing: React.FC = () => {
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

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
            <div className="new-container-grid">
              <Input ref={productNameRef}>Product Name</Input>
              <div className="new-container-grid-innerflex">
                <span>$</span>
                <Input ref={priceRef} inputType="number">
                  Price XXXX.XX
                </Input>
              </div>
              <div className="new-container-grid-bottom">
                <Input ref={descriptionRef}>Description</Input>
              </div>
              <TextArea
                ref={bodyRef}
                className="new-container-grid-textarea"
                placeholder="Listing body"
              />
            </div>
          </div>
        </div>
      </div>
    </NewListingProvider>
  );
};

NewListing.displayName = "NewListing";
export default NewListing;
