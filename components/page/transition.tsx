/**
 * Give transition animations for pages wrapped with this container
 */
import { motion } from "framer-motion";

interface ITransitionContainer {
  children: JSX.Element | JSX.Element[];
}

const TransitionContainer: React.FC<ITransitionContainer> = (props) => {
  const { children } = props;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

TransitionContainer.displayName = "TransitionContainer";
export default TransitionContainer;
