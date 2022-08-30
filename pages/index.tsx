import Hero from "../components/page/hero";
import TransitionContainer from "../components/page/transition";

const Home: React.FC = () => {
  return (
    <TransitionContainer>
      <Hero />
    </TransitionContainer>
  );
};

export default Home;
