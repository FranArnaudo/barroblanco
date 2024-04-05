"use client";
import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ClickAwayListener from "react-click-away-listener";

const MaterialTypesTableActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="absolute inline-block">
      <button ref={buttonRef} onClick={() => setOpen(true)}>
        <Icon icon="flowbite:dots-vertical-outline" />
      </button>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="absolute rounded-lg shadow-inset right-3 bg-primary-light t-10 z-20">
            <ul className="flex [&>li]:pl-3 [&>li]:pr-3 [&>li]:pt-2 [&>li]:pb-2 md:[&>li]:pb-1 md:[&>li]:pt-1 flex-col">
              <li>
                <Link href={`tipos/${id}/edit`}>Editar</Link>
              </li>
              <div className="w-full bg-white h-px"></div>
              <li>
                <Link href={"/edit"}>Eliminar</Link>
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default MaterialTypesTableActions;
