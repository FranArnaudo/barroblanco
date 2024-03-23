"use client";
import { Icon } from "@iconify/react";
type RoundedIconButtonProps = {
  icon: string;
  onClick: () => void;
};
const RoundedIconButton = ({ icon, onClick }: RoundedIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full shadow-xl p-2 md:p-4 bg-slate-100"
    >
      <Icon icon={icon} />
    </button>
  );
};

export default RoundedIconButton;
