import TransitionContainer from "../components/page/transition";
import SignupForm from "../components/page/signup/form";

const SignUp = () => {
  return (
    <TransitionContainer>
      <div className="signup">
        <SignupForm />
      </div>
    </TransitionContainer>
  );
};

SignUp.displayName = "SignUp";
export default SignUp;
