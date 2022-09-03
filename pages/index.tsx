import Hero from "../components/page/hero";
import TransitionContainer from "../components/page/transition";
import Products from "../components/page/home/products";

const Home: React.FC = () => {
  return (
    <TransitionContainer>
      <Hero />
      <Products />
    </TransitionContainer>
  );
};

export default Home;
