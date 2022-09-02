import Image from "next/image";
import HeroImage from "../../images/hero.avif";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-polygon">
        <div className="hero-box">
          <span className="hero-box__text hero-box__text-1">
            Sell products.&nbsp;
          </span>
          <span className="hero-box__text hero-box__text-2">Make money.</span>
          <p />
          <Link href="/new">
            <span className="hero-box__link">List your item</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

Hero.displayName = "Hero";
export default Hero;
