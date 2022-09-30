import loginProps from "../../db/serverProps/loginProps";
import TransitionContainer from "../../components/page/transition";
import PasswordPage from "../../components/page/account/password";

const ChangePasswordPage: React.FC = () => {
  return (
    <TransitionContainer>
      <div className="account">
        <PasswordPage />
      </div>
    </TransitionContainer>
  );
};

export { loginProps as getServerSideProps };
ChangePasswordPage.displayName = "ChangePasswordPage";
export default ChangePasswordPage;
