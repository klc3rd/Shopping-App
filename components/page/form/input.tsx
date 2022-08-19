import React, { useState } from "react";
import Icons from "../../icons";

interface IInput {
  children: string;
  icon?: string;
  inputType?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { children, icon, inputType } = props;

  const [viewPassword, setViewPassword] = useState<boolean>(false);

  // Allows changing of the input type if it is a password
  // field and if the icon is clicked
  let renderType;
  if (inputType !== "password" && viewPassword == false) {
    renderType = "text";
  } else if (inputType === "password" && viewPassword === false) {
    renderType = "password";
  } else if (viewPassword === true) {
    renderType = "text";
  }

  return (
    <div className="auth">
      <input
        className="auth-input"
        type={renderType}
        placeholder={children}
        ref={ref}
      />
      {icon && (
        <div
          onClick={() => {
            setViewPassword((passwordStatus) => !passwordStatus);
          }}
          className="auth-icon-container"
        >
          <Icons icon={icon} />
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
