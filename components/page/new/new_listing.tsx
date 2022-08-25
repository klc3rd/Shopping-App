import LeftBox from "./left_box";
import NewListingProvider from "./provider";

const NewListing: React.FC = () => {
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
          </div>
        </div>
      </div>
    </NewListingProvider>
  );
};

NewListing.displayName = "NewListing";
export default NewListing;
