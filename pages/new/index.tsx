import validateProps from "../../db/serverProps/validateProps";
import NewListing from "../../components/page/new/new_listing";

const NewListingPage: React.FC = () => {
  return (
    <div>
      <NewListing />
    </div>
  );
};

export { validateProps as getServerSideProps };
export default NewListingPage;
