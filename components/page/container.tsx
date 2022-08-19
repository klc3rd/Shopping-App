import Menu from "./menu";

interface IPageContainer {
  children: JSX.Element | JSX.Element[];
}

const PageContainer: React.FC<IPageContainer> = (props) => {
  const { children } = props;

  return (
    <>
      <Menu />
      {children}
    </>
  );
};

export default PageContainer;
