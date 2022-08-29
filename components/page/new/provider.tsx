import React from "react";

interface INewListingContext {
  count: number;
  images: {
    id: number;
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
