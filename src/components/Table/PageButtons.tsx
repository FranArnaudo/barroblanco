import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PaginationButtonsProps = {
  totalPages: number;
};
const PaginationButtons = ({ totalPages }: PaginationButtonsProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const queryPage = parseInt(searchParams.get("page") ?? "1");
    setCurrentPage(queryPage);
  }, [searchParams]);

  const updateUrlParams = (page: any) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("page", page);
    const newPath = {
      pathname: pathname,
      query: { ...searchParams, page },
    };
    replace(`${pathname}?${urlParams}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      updateUrlParams(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      updateUrlParams(currentPage - 1);
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center h-fit">
      <button
        onClick={prevPage}
        disabled={currentPage <= 1}
        className="custom-button "
      >
        &lt; Previous
      </button>
      <span className="p-2 h-full bg-white rounded-lg shadow-lg">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        className="custom-button "
      >
        Next &gt;
      </button>
    </div>
  );
};

export default PaginationButtons;
