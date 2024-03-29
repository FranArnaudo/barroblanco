type CardWrapperProps = {
  children: JSX.Element | JSX.Element[];
};
const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="w-full flex items-center justify-center  ">
      <div className="w-full flex items-center justify-center rounded-lg flex-col shadow-2xl pt-10 pl-4 pr-5 pb-10 md:m-12 md:p-12  md:mt-0 gap-4 bg-white md:max-w-2/3">
        {children}
      </div>
    </div>
  );
};

export default CardWrapper;
