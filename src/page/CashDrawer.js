import React, { useEffect, useState } from "react";
import useShopContext from "../zustand/ShopContext";
import { notify } from "../function/Notification";
import useAppContext from "../zustand/AppContext";

const CashDrawer = () => {
  const [cashIn, setCashIn] = useState("");
  const [cashOut, setCashOut] = useState("");
  const [cashInNote, setCashInNote] = useState("");
  const [cashOutNote, setCashOutNote] = useState("");
  const shopDetail = useShopContext((state) => state.shopDetail);
  const cashInFnc = useShopContext((state) => state.cashInFnc);
  const cashOutFnc = useShopContext((state) => state.cashOutFnc);
  const cashDrawer = useAppContext((state) => state.cashDrawer);

  const cashInSubmit = () => {
    if (!cashIn || cashIn === 0) return notify("กรุณากรอกจำนวนเงิน");
    cashInFnc({ cash: cashIn, note: cashInNote });
    setCashIn("");
    setCashInNote("");
  };
  const cashOutSubmit = () => {
    if (!cashOut || cashOut === 0) return notify("กรุณากรอกจำนวนเงิน");
    cashOutFnc({ cash: cashOut, note: cashOutNote });
    setCashOut("");
    setCashOutNote("");
  };
  return (
    <div className="w-full p-10 select-none">
      <div className="w-full h-full rounded-lg bg-neutral-400 bg-opacity-70">
        <h1 className="w-full py-5 text-3xl font-bold text-center">Cash Drawer</h1>
        <div className="flex px-5 space-x-5">
          <div className="w-1/2">
            <h1 className="w-full py-5 text-xl font-bold text-center">เงินเข้า</h1>
            <div className="w-full overflow-y-auto text-base text-center bg-white rounded-lg text-neutral-700 h-60 ">
              {shopDetail.cashin?.map((item, i) => (
                <div key={i} className="grid grid-cols-2 py-2 ">
                  <div className="text-center ">{item.cash}</div>
                  <div className="text-center ">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="flex mt-5 space-x-3">
              <input
                className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
                type="number"
                value={cashIn}
                onChange={(e) => setCashIn(e.target.value)}
                placeholder="เงินเข้า"
              />
              <input
                className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
                type="text"
                value={cashInNote}
                onChange={(e) => setCashInNote(e.target.value)}
                placeholder="หมายเหตุ"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-1/2 h-10 px-3 mt-5 mb-2 text-base text-center text-white border rounded-lg bg-highlight focus:shadow-outline hover:bg-opacity-0 hover:text-highlight active:bg-opacity-80"
                onClick={cashInSubmit}
              >
                ยืนยัน
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="w-full py-5 text-xl font-bold text-center">เงินออก</h1>
            <div className="w-full overflow-y-auto text-base text-center bg-white rounded-lg h-60 text-neutral-700 ">
              {shopDetail.cashout?.map((item, i) => (
                <div key={i} className="grid grid-cols-2 py-2 ">
                  <div className="text-center ">{item.cash}</div>
                  <div className="text-center ">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="flex mt-5 space-x-3">
              <input
                className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
                type="number"
                value={cashOut}
                onChange={(e) => setCashOut(e.target.value)}
                placeholder="เงินออก"
              />
              <input
                className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
                type="text"
                value={cashOutNote}
                onChange={(e) => setCashOutNote(e.target.value)}
                placeholder="หมายเหตุ"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="w-1/2 h-10 px-3 mt-5 mb-2 text-base text-center text-white border rounded-lg bg-highlight focus:shadow-outline hover:bg-opacity-0 hover:text-highlight active:bg-opacity-80"
                onClick={cashOutSubmit}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-10 ">
          <button
            className="p-8 text-4xl tracking-wider text-center text-white border rounded-lg bg-highlight focus:shadow-outline hover:bg-opacity-0 hover:text-highlight active:bg-opacity-80"
            onClick={() => electron.Cashdrawer(cashDrawer)}
          >
            <p>เปิดลิ้นชัก</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashDrawer;
