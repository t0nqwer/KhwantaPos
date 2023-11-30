import React from "react";
import Logo from "../img/Logo";
import useUiContext from "../zustand/UiContext";

const Navbar = () => {
  const setSideBarActive = useUiContext((state) => state.setSideBarActive);
  const SideBarActive = useUiContext((state) => state.SideBarActive);
  const activesidebar = (e) => {
    setSideBarActive(!SideBarActive);
  };
  return (
    <div className=" w-full text-5xl text-white" onClick={activesidebar}>
      <Logo className="w-full h-32" />
    </div>
  );
};

export default Navbar;
