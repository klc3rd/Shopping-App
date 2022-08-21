import LoginForm from "../components/page/login/login-form";
import TransitionContainer from "../components/page/transition";

const Login = () => {
  return (
    <TransitionContainer>
      <LoginForm />
    </TransitionContainer>
  );
};

Login.displayName = "Login";
export default Login;
