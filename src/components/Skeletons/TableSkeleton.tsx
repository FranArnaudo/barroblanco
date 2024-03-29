import { getRandomInt } from "@/lib/utils";
import { Skeleton, SVGSkeleton } from "./Skeleton";
const columnGenerator = (amountOfColumns: number) => {
  const array = Array.from(Array(amountOfColumns).keys());
  return array.map((num) => {
    if (num === 0) {
      return <th key={`head-${num}`} className="rounded-tl-lg"></th>;
    } else if (num === amountOfColumns - 1) {
      return <th key={`head-${num}`} className="rounded-tr-lg"></th>;
    }
    return <th key={`head-${num}`}></th>;
  });
};
const rowsGenerator = (amountOfRows: number, amountOfColumns: number) => {
  return Array.from(Array(amountOfRows).keys()).map((row) => {
    return (
      <tr key={`tablerow-${row}`} className="align-center table-row">
        {Array.from(Array(amountOfColumns).keys()).map((cell) => (
          <td key={`tablecell-${cell}`}>
            <Skeleton
              className={`md:w-[${getRandomInt(70, 300)}px] w-[${getRandomInt(
                20,
                100
              )}px]`}
            />
          </td>
        ))}
      </tr>
    );
  });
};

type TableSkeletonProps = {
  rows: number;
  columns: number;
};
const TableSkeleton = ({ rows, columns }: TableSkeletonProps) => {
  const columnsToRender = columnGenerator(columns);
  const rowsToRender = rowsGenerator(rows, columns);
  return (
    <>
      <div className="overflow-auto shadow-lg w-full h-fit">
        <table className="border-collapse w-full">
          <thead className="[&amp;>tr>th]:p-3 animate-pulse rounded bg-primary-light ">
            <tr className="table-row overflow-scroll">{columnsToRender}</tr>
          </thead>
          <tbody className="m-20 [&amp;>tr]:border-b [&amp;>tr]:border-slate-300 [&amp;>:last-child]:border-0 [&amp;>tr>td]:p-3">
            {rowsToRender}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;
