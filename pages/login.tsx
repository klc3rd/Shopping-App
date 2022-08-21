import TransitionContainer from "../components/page/transition";

const Login = () => {
  return (
    <TransitionContainer>
      <div className="login">
        <div className="login-container">
          <div className="login-container-left">Left</div>
          <div className="login-container-right">Right</div>
        </div>
      </div>
    </TransitionContainer>
  );
};

Login.displayName = "Login";
export default Login;
