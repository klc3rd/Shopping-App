import Panel from "./panel";

interface IAccountContainer {
  children: JSX.Element | JSX.Element[];
}

const AccountContainer: React.FC<IAccountContainer> = (props) => {
  const { children } = props;

  return (
    <div className="account-container">
      <Panel />
      {children}
    </div>
  );
};

AccountContainer.displayName = "AccountContainer";
export default AccountContainer;
