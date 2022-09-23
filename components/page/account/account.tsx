import { useRef, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Input from "../form/input";

const AccountPage: React.FC = (props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="account-container">
      Edit Account
      <div className="account-edit">
        <div className="account-heading">Name</div>
        <div>
          <Input ref={nameRef} icon="user">
            {data?.user.name}
          </Input>
        </div>
        <div className="account-heading">Username</div>
        <div>
          <Input ref={usernameRef} icon="user">
            {data?.user.username}
          </Input>
        </div>
        <div className="account-heading">Email</div>
        <div>
          <Input ref={emailRef} icon="email">
            {data?.user.email}
          </Input>
        </div>
      </div>
    </div>
  );
};

AccountPage.displayName = "AccountPage";
export default AccountPage;
