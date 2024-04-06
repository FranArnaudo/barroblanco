"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { debounce, set } from "lodash";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdiTrashOutline } from "../icons/Icons";

const MaterialTypesSearch = () => {
  const path = usePathname();
  const params = useSearchParams();
  const { replace, refresh } = useRouter();

  const [search, setSearch] = useState<string | undefined>(
    params.get("name")?.toString()
  );

  const replacePathAndQuery = debounce((newPath: string) => {
    replace(newPath);
  }, 500);

  const handleOnChangeInput = (value: string | undefined) => {
    const urlParams = new URLSearchParams(params);
    if (value) {
      setSearch(value);
      urlParams.set("name", value);
    } else {
      setSearch(undefined);
      urlParams.delete("name");
    }
    replacePathAndQuery(`${path}?${urlParams.toString()}`);
  };

  return (
    <div className="flex flex-col bg-white shadow-2xl gap-2 p-3 w-full rounded-lg ">
      <div className="">
        <label>Nombre</label>
        <div className="relative col-span-9 z-0">
          <input
            className="text-input inline-block"
            onChange={(e) => handleOnChangeInput(e.target.value)}
            placeholder="Busqueda por nombre...."
            value={search ?? ""}
          />
          <button
            className="absolute right-2 top-3 leading-10"
            onClick={(e) => handleOnChangeInput(undefined)}
          >
            <MdiTrashOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialTypesSearch;
