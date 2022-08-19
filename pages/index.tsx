import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import Hero from "../components/page/hero";
import TransitionContainer from "../components/page/transition";

const Home: NextPage = () => {
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

export default Home;
