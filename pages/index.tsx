import { useQuery, gql } from "@apollo/client";
import Hero from "../components/page/hero";
import { Session } from "next-auth";
import TransitionContainer from "../components/page/transition";
import getServerSideProps from "../db/serverProps";

interface IIndex {
  session: Session;
}

const Home: React.FC<IIndex> = (props) => {
  const query = gql`
    {
      getHello
    }
  `;

  const { loading, error, data, refetch } = useQuery(query);

  return (
    <TransitionContainer>
      <Hero />
    </TransitionContainer>
  );
};

export { getServerSideProps };

export default Home;
