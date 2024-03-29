"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import RoundedIconButton from "../Buttons/RoundedIconButton";

const playfair_Display = Playfair_Display({ subsets: ["latin"] });

const Sidebar = () => {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(path !== "/");
  return (
    <div
      className={`
        bg-white 
				shadow-lg
				${collapsed ? "sidebar-collapsed" : "sidebar"}
        `}
    >
      <div className="absolute top-4 -right-5 md:top-12 md:-right-6  w-fit">
        <RoundedIconButton
          icon={
            collapsed ? "gravity-ui:chevron-right" : "gravity-ui:chevron-left"
          }
          onClick={() => setCollapsed((prev) => !prev)}
        />
      </div>
      <span
        className={`${playfair_Display.className} ${
          collapsed
            ? "hidden"
            : "text-4xl md:text-8xl select-none overflow-hidden"
        }`}
      >
        Barro Blanco
      </span>
      <ul className={collapsed ? "hidden" : "md:text-2xl overflow-hidden"}>
        <li>
          <Link
            href={"/"}
            className={`sidebar-link ${path === "/" && "bg-primary-light"}`}
          >
            <Icon icon="gravity-ui:house" className="color-primary-main" />
            {!collapsed && "Inicio"}
          </Link>
          <Link
            href={"materiales"}
            className={`sidebar-link ${
              path.includes("materiales") && "bg-primary-light"
            }`}
          >
            <Icon icon="mdi:material" className="color-primary-main" />
            {!collapsed && "Materiales"}
          </Link>
          <Link
            href={"plantillas"}
            className={`sidebar-link ${
              path.includes("plantillas") && "bg-primary-light"
            }`}
          >
            <Icon
              icon="octicon:project-template-16"
              className="color-primary-main"
            />
            {!collapsed && "Plantillas"}
          </Link>
          <Link
            href={"calcular"}
            className={`sidebar-link ${
              path.includes("calcular") && "bg-primary-light"
            }`}
          >
            <Icon
              icon="ion:calculator-outline"
              className="color-primary-main"
            />
            {!collapsed && "Calcular"}
          </Link>
          <Link
            href={"cursos"}
            className={`sidebar-link ${
              path.includes("cursos") && "bg-primary-light"
            }`}
          >
            <Icon icon="ph:student" className="color-primary-main" />
            {!collapsed && "Cursos"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
