import React from "react";

interface ICartContext {
  children: JSX.Element | JSX.Element[];
}

interface IDefaultValues {
  items?: [
    {
      productID: string;
      qty: number;
    }
  ];
}

const defaultValues: IDefaultValues = {};

const CartContext = React.createContext(defaultValues);

const CartContextProvider: React.FC<ICartContext> = (props) => {
  const { children } = props;

  return (
    <CartContext.Provider value={defaultValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
