import { MaterialSymbolsEditOutline } from "@/ui/icons/Icons";
import IconButton from "../Buttons/IconButton";
import { ReactElement, ReactNode } from "react";
import Pagination from "./Pagination";

type TableProps = {
  items: Record<string, string | number | boolean>[];
  totalPages: number;
  columns: Record<string, { key: string; prefix?: string; suffix?: string }>;
  ActionComponent: (props: any) => React.JSX.Element;
};
const Table = ({ items, totalPages, columns, ActionComponent }: TableProps) => {
  const isEmpty = items.length === 0;
  return (
    <div>
      <div className="rounded-lg overflow-auto shadow-lg w-full h-fit ">
        {!isEmpty ? (
          <table className="border-collapse table-auto text-lg w-full table">
            <thead className="bg-primary-light table-header-group [&>tr>th]:p-3">
              <tr className="table-row [&>:first-child]:rounded-tl-lg [&>:last-child]:rounded-tr-lg overflow-scroll">
                {Object.keys(columns).map((column) => (
                  <th key={column} className="table-cell font-semibold">
                    {column}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>

            <tbody
              className="m-20 [&>tr]:border-b [&>tr]:border-slate-300 
          [&>:last-child]:border-0 [&>tr>td]:p-3 "
            >
              {items.map((item: any) => (
                <tr className="align-center table-row bg-white" key={item._id}>
                  {Object.values(columns).map(({ key, prefix, suffix }) => (
                    <td key={key} className="table-cell text-center">
                      {`${Boolean(prefix) ? prefix : ""}${item[key]}${
                        Boolean(suffix) ? suffix : ""
                      }`}
                    </td>
                  ))}
                  <td className="flex w-full align-center justify-center gap-2 text-center ">
                    {ActionComponent({ id: item.id })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center bg-white h-32">
            <span className="text-xl font-semibold">
              Todavia no hay items D:
            </span>
          </div>
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Table;
