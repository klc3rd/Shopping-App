import Input from "../form/input";

const ChangePassword: React.FC = () => {
  return (
    <div className="password-change">
      <div className="password-change-container">
        <span className="password-change-heading">Change Password</span>
        <Input icon="lock" inputType="password">
          New Password
        </Input>
        <Input icon="lock" inputType="password">
          Confirm Password
        </Input>
        <button className="auth-submit__btn">Change Password</button>
      </div>
    </div>
  );
};

ChangePassword.displayName = "ChangePassword";
export default ChangePassword;
