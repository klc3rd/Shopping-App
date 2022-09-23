import loginProps from "../db/serverProps/loginProps";
import TransitionContainer from "../components/page/transition";
import AccountPage from "../components/page/account/account";
import { Session } from "next-auth";

const Account: React.FC = (props) => {
  return (
    <TransitionContainer>
      <div className="account">
        <AccountPage />
      </div>
    </TransitionContainer>
  );
};

export { loginProps as getServerSideProps };
Account.displayName = "Account";
export default Account;
