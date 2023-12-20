import React, { useEffect } from "react";
import useBillStore from "../zustand/BillContext";
import useUiContext from "../zustand/UiContext";

const Bills = () => {
  const { bills, fetchBills, setSingleBill } = useBillStore();
  const { setBillModalActive } = useUiContext();
  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="w-full h-full p-10 select-none">
      <div className="flex flex-col w-full h-full rounded-lg bg-neutral-400 bg-opacity-70">
        <h1 className="w-full py-5 text-3xl font-bold text-center">Bills</h1>
        <div className="h-full p-3 rounded-md ">
          <div className="h-full">
            <div className="grid grid-cols-5 gap-4 px-5 py-2 text-xl font-bold text-center bg-white rounded-lg text-neutral-700">
              <div>วันที่</div>
              <div>ชื่อบิล</div>
              <div>ลูกค้า</div>
              <div>รายการ</div>
              <div>ราคา</div>
            </div>
            <div className="mt-5 overflow-hidden text-base text-center bg-white rounded-l text-neutral-700">
              <div className="overflow-y-auto h-96 ">
                {bills?.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 py-2 hover:bg-highlight bg-none hover:text-white"
                    onClick={() => {
                      setBillModalActive(true);
                      setSingleBill(item);
                    }}
                  >
                    <div className="text-center ">{item.convertTime}</div>
                    <div className="text-center ">{item.name}</div>
                    <div className="text-center ">{item.customer}</div>
                    <div className="text-center ">{item.ProductCount}</div>
                    <div className="text-center ">{item.totalPay}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
