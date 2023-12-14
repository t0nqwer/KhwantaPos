import React from "react";
import useUiContext from "../zustand/UiContext";
import usePosContext from "../zustand/PosContext";
import { notify } from "../function/Notification";
import useShopContext from "../zustand/ShopContext";

const Report = () => {
  const setCloseShopModalActive = useUiContext((state) => state.setCloseShopModalActive);
  const activeBillList = usePosContext((state) => state.activeBillList);
  const PrintReport = useShopContext((state) => state.printReport);

  const handleCloseShop = () => {
    if (activeBillList.length > 0) return notify("กรุณาปิดบิลก่อนปิดร้าน");
    setCloseShopModalActive(true);
  };
  const handlePrintReport = () => {
    PrintReport();
  };
  return (
    <div className="w-full p-10 select-none">
      <div className="flex items-center justify-around w-full h-full rounded-lg bg-neutral-400 bg-opacity-70">
        <button
          className="p-5 text-4xl tracking-wider text-center text-white border rounded-lg bg-highlight focus:shadow-outline hover:bg-opacity-0 hover:text-highlight active:bg-opacity-80"
          onClick={handleCloseShop}
        >
          <p>ปิดร้าน</p>
        </button>
        <button
          className="p-5 text-4xl tracking-wider text-center text-white border rounded-lg bg-highlight focus:shadow-outline hover:bg-opacity-0 hover:text-highlight active:bg-opacity-80"
          onClick={handlePrintReport}
        >
          <p>ปริ้นรายงาน</p>
        </button>
      </div>
    </div>
  );
};

export default Report;
