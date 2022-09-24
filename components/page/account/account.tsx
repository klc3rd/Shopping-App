import { useRef, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Input from "../form/input";

const AccountPage: React.FC = (props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const getUser = gql`
    query {
      user {
        name
        username
        email
      }
    }
  `;

  const { data, refetch } = useQuery(getUser);

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
      setUsername(data.user.username);
      setEmail(data.user.email);
    }
  }, [data, setName, setUsername, setEmail]);

  const updateHandler = () => {
    const newName = nameRef.current!.value;
    const newUsername = usernameRef.current!.value;
    const newEmail = emailRef.current!.value;

    /*
     * TODO: Add update logic here
     */

    nameRef.current!.value = "";
    usernameRef.current!.value = "";
    emailRef.current!.value = "";

    refetch();
  };

  return (
    <div className="account-container">
      <span>Edit Account</span>
      <span className="account-message">{message}</span>
      <div className="account-edit">
        <div className="account-heading">Name</div>
        <div>
          {name && (
            <Input ref={nameRef} icon="user">
              {name}
            </Input>
          )}
        </div>
        <div className="account-heading">Username</div>
        <div>
          {username && (
            <Input ref={usernameRef} icon="user">
              {username}
            </Input>
          )}
        </div>
        <div className="account-heading">Email</div>
        <div>
          {email && (
            <Input ref={emailRef} icon="email">
              {email}
            </Input>
          )}
        </div>
      </div>
      <div className="account-bottom">
        <button onClick={updateHandler} className="auth-submit__btn">
          Update User
        </button>
      </div>
    </div>
  );
};

AccountPage.displayName = "AccountPage";
export default AccountPage;
