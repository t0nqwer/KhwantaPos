import React, { useState } from "react";
import useUiContext from "../../zustand/UiContext";
import { notify } from "../../function/Notification";
import useShopContext from "../../zustand/ShopContext";
import usePosContext from "../../zustand/PosContext";

const CloseShop = () => {
  const [cash, setCash] = useState(0);
  const setCloseShopModalActive = useUiContext((state) => state.setCloseShopModalActive);
  const closeShop = useShopContext((state) => state.closeShop);
  const SideBarActive = useUiContext((state) => state.SideBarActive);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cash === 0) {
      notify("กรุณาใส่จำนวนเงินให้ถูกต้อง", "error");
    } else {
      closeShop(cash);
      SideBarActive(false);
      setCloseShopModalActive(false);
    }
  };

  return (
    <div className="fixed bg-secondary w-full h-full top-0 left-0 bg-opacity-75 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-1/2 bg-primary rounded-xl px-7"
      >
        <div className="w-full text-2xl text-center text-white mt-9 tracking-widestt "> นับยอดเงินในลิ้นชัก </div>
        <input
          className="w-full py-4 text-xl text-center rounded-lg mt-9 mb-9 outline outline-1"
          type="number"
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          onFocus={(e) => setCash("")}
        />
        <div className="w-full text-xl tracking-wider text-center text-red-500">**กรุณานับเงินให้ถูกต้องแล้วกดยืนยัน**</div>
        <div className="grid grid-cols-2 gap-4 mx-10 overflow-hidden text-white mt-9 mb-9 ">
          <button
            className="px-4 py-3 bg-red-500 rounded-lg "
            onClick={() => {
              setCloseShopModalActive(false);
            }}
          >
            ยกเลิก
          </button>
          <button className="px-4 py-3 rounded-lg bg-emerald-500 " onClick={handleSubmit}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseShop;
