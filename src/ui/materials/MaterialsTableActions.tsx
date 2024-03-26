"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const MaterialsTableActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="relative inline-block">
      <button ref={buttonRef} onClick={() => setOpen(true)}>
        <Icon icon="flowbite:dots-vertical-outline" />
      </button>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="absolute  right-3 bg-slate-100 t-10 z-20">
            <ul className="flex [&>li]:pl-3 [&>li]:pr-3 [&>li]:pt-2 [&>li]:pb-2 md:[&>li]:pb-1 md:[&>li]:pt-1 flex-col">
              <li>
                <Link href={"/edit"}>Editar</Link>
              </li>
              <div className="w-full bg-slate-200 h-px"></div>
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

export default MaterialsTableActions;
