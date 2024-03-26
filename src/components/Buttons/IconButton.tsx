import { Icon } from "@iconify/react";
import Link from "next/link";
type IconButtonProps = {
  href: string;
  children: JSX.Element;
  className?: string;
};
const IconButton = ({ href, children, className }: IconButtonProps) => {
  return (
    <div className="w-fit">
      <Link href={href}>
        <div
          className={`rounded-lg shadow-xl md:p-4 flex items-center justify-center w-fit aspect-square bg-slate-100 duration-200 ${className}`}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export default IconButton;
