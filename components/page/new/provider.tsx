import React from "react";
import { v4 as uuid } from "uuid";

interface INewListingContext {
  count: number;
  images: {
    folder: string;
    filename: string;
  }[];
}

const defaultValue: INewListingContext = {
  count: 0,
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
