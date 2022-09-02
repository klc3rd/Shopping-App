import validateProps from "../../db/serverProps/validateProps";
import NewListing from "../../components/page/new/new_listing";
import TransitionContainer from "../../components/page/transition";

const NewListingPage: React.FC = () => {
  return (
    <TransitionContainer>
      <div>
        <NewListing />
      </div>
    </TransitionContainer>
  );
};

export { validateProps as getServerSideProps };
export default NewListingPage;
