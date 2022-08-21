import tosText from "../../../utils/text/tos-text";

const Tos: React.FC = () => {
  return <textarea className="auth-tos__text" disabled value={tosText} />;
};

Tos.displayName = "Tos";
export default Tos;
