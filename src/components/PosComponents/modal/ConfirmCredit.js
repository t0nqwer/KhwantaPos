import React from "react";

const ConfirmCredit = ({ subtotal, func, back }) => {
  return (
    <div className="fixed bg-secondary w-full h-full top-0 left-0 bg-opacity-75 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-1/2 bg-primary rounded-xl px-7"
      >
        <div className="w-full text-2xl text-center text-white mt-9 tracking-widestt "> ยอดรูดบัตร </div>
        <div className="flex justify-center py-4 text-xl text-center text-white rounded-lg mt-9 mb-9 outline outline-1">{subtotal}</div>
        <div className="w-full text-xl tracking-wider text-center text-red-500">**กรุณาทำรายการรูดบัตรให้สำเร็จแล้วกดยืนยัน**</div>
        <div className="grid grid-cols-2 gap-4 mx-10 overflow-hidden text-white mt-9 mb-9 ">
          <button
            className="px-4 py-3 bg-red-500 rounded-lg "
            onClick={() => {
              back(false);
            }}
          >
            ยกเลิก
          </button>
          <button
            className="px-4 py-3 rounded-lg bg-emerald-500 "
            onClick={() => {
              func();
            }}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCredit;
