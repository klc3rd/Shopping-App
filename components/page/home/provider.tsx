import React, { useState } from "react";

interface IHomeContext {
  cartState?: number;
  updateCartState?: React.Dispatch<React.SetStateAction<number>>;
}

let defaultValue: IHomeContext = {};

const HomeContextProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = (props) => {
  const { children } = props;
  const [cartState, updateCartState] = useState<number>(0);

  defaultValue = {
    cartState,
    updateCartState,
  };

  return (
    <HomeContext.Provider value={defaultValue}>{children}</HomeContext.Provider>
  );
};

export const HomeContext = React.createContext(defaultValue);

export default HomeContextProvider;
