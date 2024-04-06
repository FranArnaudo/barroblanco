"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import { debounce, set } from "lodash";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRouter as Router } from "next/router";
import IconButton from "@/components/Buttons/IconButton";
import { MdiTrashOutline } from "../icons/Icons";
import { MaterialType } from "../../../types";
type MaterialsSearchType = {
  materialTypes: MaterialType[];
};
const MaterialsSearch = ({ materialTypes }: MaterialsSearchType) => {
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

  const handleOnChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const urlParams = new URLSearchParams(params);
    if (e.target.value && e.target.value !== "all") {
      urlParams.set("type", e.target.value);
    } else {
      urlParams.delete("type");
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
      <div className="flex flex-col items-start gap-2">
        <label>Tipo</label>
        <select className="text-input" onChange={handleOnChangeSelect}>
          <option value="all">Todos</option>
          {materialTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MaterialsSearch;
