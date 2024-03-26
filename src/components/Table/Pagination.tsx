"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationButtons from "./PageButtons";
import { ChangeEvent } from "react";

type PaginationProps = {
  totalPages: number;
};
const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleChangeTake = (e: ChangeEvent<HTMLSelectElement>) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("take", e.target.value);
    replace(`${pathname}?${urlParams}`);
  };
  return (
    <div className="flex w-full justify-between pt-2">
      <select
        defaultValue={Number(searchParams.get("take")?.toString() ?? "10")}
        onChange={handleChangeTake}
        className="text-input max-w-20"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <div>
        <PaginationButtons totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Pagination;
