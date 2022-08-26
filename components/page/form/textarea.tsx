import React from "react";

interface ITextArea {
  placeholder?: string;
  className?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, ITextArea>(
  (props, ref) => {
    const { className, placeholder } = props;

    return (
      <textarea
        ref={ref}
        className={`auth-textarea ` + className}
        placeholder={placeholder}
      />
    );
  }
);

export default TextArea;
