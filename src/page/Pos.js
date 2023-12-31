import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Navbar, Sidebar, Payment, Result } from "../components";
import useUiContext from "../zustand/UiContext";
import { Page, CashDrawer, Report, Stock, Promotion, Bills, Setting, Home } from "./";
import useShopContext from "../zustand/ShopContext";
import { CloseShop, BillModal } from "../components/modal";
const Pos = () => {
  const SideBarActive = useUiContext((state) => state.SideBarActive);
  const OpenResult = useUiContext((state) => state.OpenResult);
  const OpenPayment = useUiContext((state) => state.OpenPayment);
  const CloseShopModalActive = useUiContext((state) => state.CloseShopModalActive);
  const BillModalActive = useUiContext((state) => state.BillModalActive);

  return (
    <HashRouter>
      <div className="relative w-full h-full bg-primary">
        {CloseShopModalActive && <CloseShop />}
        {BillModalActive && <BillModal />}

        <div className="fixed z-150">
          <Navbar />
        </div>
        <div
          className={`${
            SideBarActive ? "w-full" : "w-0"
          } fixed z-100  flex bg-primary bg-opacity-80 backdrop-blur-lg  transition-all  overflow-hidden h-full`}
        >
          <Sidebar />
          <Routes>
            <Route path="/" element={<Page />}></Route>
            <Route path="/CashDrawer" element={<CashDrawer />}></Route>
            <Route path="/Report" element={<Report />} />
            <Route path="/Stock" element={<Stock />} />
            <Route path="/Promotion" element={<Promotion />} />
            <Route path="/Bills" element={<Bills />} />
            <Route path="/Setting" element={<Setting />} />
          </Routes>
        </div>
        <div className="w-full h-full">
          {OpenResult ? <Result /> : ""}
          {OpenPayment ? <Payment /> : ""}
          <Home />
        </div>
      </div>
    </HashRouter>
  );
};

export default Pos;
