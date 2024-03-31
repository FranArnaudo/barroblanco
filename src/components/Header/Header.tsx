import Link from "next/link";

type HeaderProps = { title: string; buttonRef?: string; buttonText?: string };
const Header = ({ title, buttonRef, buttonText }: HeaderProps) => {
  return (
    <div className="flex justify-between w-full">
      <h1 className="text-bold text-4xl self-start">{title}</h1>
      {buttonText && buttonRef && (
        <Link className="custom-button" href={buttonRef}>
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default Header;
