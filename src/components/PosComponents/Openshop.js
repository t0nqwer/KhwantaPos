import React, { useState } from "react";
import usePosContext from "../../zustand/PosContext";
import { notify } from "../../function/Notification";

const Openshop = () => {
  const [ChangeValue, setChangeValue] = useState("");
  const openShop = usePosContext((state) => state.openShop);
  const setValue = (p) => {
    if (!isNaN(+p.target.value)) {
      setChangeValue(p.target.value);
    }
    if (isNaN(+p.target.value)) {
      notify("โปรดกรอกแค่ตัวเลข");
    }
  };
  const confirm = (e) => {
    if (ChangeValue === "") {
      return notify("โปรดใส่เงินทอน");
    }
    openShop(ChangeValue);
  };
  return (
    <div className="fixed z-30 flex items-center justify-center w-screen h-screen bg-opacity-50 bg-slate-100 backdrop-blur-md">
      <div className="flex flex-col justify-around h-48 p-5 text-xl text-center text-white rounded-md bg-primary w-72">
        <span>กรุณาใส่เงินทอนเพื่อเปิดร้าน</span>
        <div className="">
          <input value={ChangeValue} onChange={setValue} className="text-center text-black rounded-md" />
        </div>
        <button className="p-2 rounded-md cursor-pointer bg-secondary hover:bg-slate-100 hover:text-primary" onClick={confirm}>
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default Openshop;
