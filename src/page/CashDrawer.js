import React from "react";

const CashDrawer = () => {
  return (
    <div className="w-full p-10">
      <div className="w-full h-full rounded-lg bg-neutral-400 bg-opacity-70">
        <h1 className="w-full py-5 text-3xl font-bold text-center">Cash Drawer</h1>
        <div className="flex px-5 space-x-5">
          <div className="w-1/2">
            <h1 className="w-full py-5 text-xl font-bold text-center">เงินเข้า</h1>
            <input
              className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
              type="text"
              placeholder="เงินเข้า"
            />
          </div>
          <div className="w-1/2">
            <h1 className="w-full py-5 text-xl font-bold text-center">เงินออก</h1>
            <input
              className="w-full h-10 px-3 mb-2 text-base text-center border rounded-lg text-neutral-700 placeholder-neutral-600 focus:shadow-outline"
              type="text"
              placeholder="เงินออก"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashDrawer;
