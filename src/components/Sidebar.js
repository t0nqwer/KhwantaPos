import React from "react";
import { NavLink } from "react-router-dom";
import { links } from "../side-menu";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full mr-5 ">
      <div className="h-24"></div>
      <div className="flex flex-col justify-center h-full mt-6 ml-8 space-y-4 text-left text-white select-none ">
        {links.map((item) => (
          <NavLink key={item.pathname} to={`/${item.pathname}`} className={({ isActive }) => (isActive ? "liactive" : "li")}>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <button
        className="w-48 py-4 mt-10 mb-5 text-black transition-all duration-150 rounded-full bg-slate-50 hover:text-white hover:bg-neutral-900 hover:outline outline-2 outline-white "
        onClick={() => {
          electron.close();
        }}
      >
        ปิดโปรแกรม
      </button>
    </div>
  );
};

export default Sidebar;
