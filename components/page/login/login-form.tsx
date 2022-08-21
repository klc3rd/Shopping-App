import loginText from "../../../utils/text/login-text";
import Link from "next/link";
import Input from "../form/input";

const LoginForm: React.FC = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-container-heading">User Login</div>
        <div className="login-container-left">
          <form onSubmit={(e) => e.preventDefault()}>
            <Input inputType="text" icon="email">
              Email
            </Input>
            <Input inputType="password" icon="lock">
              Password
            </Input>
            <div className="auth-submit">
              <div>
                <Link href="/password-reset">
                  <span className="login-reset-link">Forgot password</span>
                </Link>
              </div>
              <button className="auth-submit__btn">Login</button>
            </div>
          </form>
        </div>
        <div className="login-container-right">{loginText}</div>
      </div>
    </div>
  );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
