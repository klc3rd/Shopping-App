import React from "react";
import { v4 as uuid } from "uuid";

interface INewListingContext {
  productId: string;
  images: {
    id: number;
    folder: string;
    filename: string;
  }[];
}

const defaultValue: INewListingContext = {
  productId: uuid(), // generate default UUID to use for product reference, so it is available for multiple uploads simultaneously
  images: [],
};

export const NewListingContext = React.createContext(defaultValue);

interface INewListingProvider {
  children: JSX.Element | JSX.Element[];
}

const NewListingProvider: React.FC<INewListingProvider> = (props) => {
  const { children } = props;

  return (
    <NewListingContext.Provider value={defaultValue}>
      {children}
    </NewListingContext.Provider>
  );
};

export default NewListingProvider;
