"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { deleteMaterial } from "@/lib/serverActions/materialsServerActions";
import { errorToast, successToast } from "@/lib/toasts";

const MaterialsTableActions = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = async () => {
    deleteMaterial(id)
      .then(() => successToast("Material eliminado correctamente"))
      .catch(() => errorToast("Hubo un problema al eliminar el material"));
  };
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
                <Link href={`materiales/${id}/edit`}>Editar</Link>
              </li>
              <div className="w-full bg-white h-px"></div>
              <li onClick={handleDelete} className="cursor-pointer">
                Eliminar
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default MaterialsTableActions;
