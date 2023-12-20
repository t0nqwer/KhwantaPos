import React from "react";
import useUiContext from "../../zustand/UiContext";
import usePosContext from "../../zustand/PosContext";

const Results = () => {
  const setOpenResult = useUiContext((state) => state.setOpenResult);
  const setOpenPayment = useUiContext((state) => state.setOpenPayment);
  const setActiveBill = usePosContext((state) => state.setActiveBill);
  const ResultData = usePosContext((state) => state.ResultData);
  const reset = usePosContext((state) => state.reset);
  const finishPayment = () => {
    reset();
    setOpenResult(false);
    setOpenPayment(false);
  };
  return (
    <div id="BG" className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 z-150 bg-secondary backdrop-blur-md">
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-3/5 p-10 text-center bg-primary rounded-xl"
      >
        <h1 className="text-4xl text-white">ใบเสร็จการชำระเงิน</h1>
        <div className="mt-3 mb-5 outline outline-1 outline-zinc-700"></div>
        <div className="mt-6 text-xl text-white">
          <h1>ข้อมูลูกค้า</h1>
          <div className="grid grid-cols-10 mt-3 text-lg gap-y-1">
            <h1 className="col-span-3 "> ชื่อลูกค้า</h1>
            <h1 className="col-span-7 "> {ResultData.customer ? ResultData.customer : "-"}</h1>
            <h1 className="col-span-3 "> เบอร์โทร</h1>
            <h1 className="col-span-7 "> {ResultData.Tel ? ResultData.Tel : "-"}</h1>
            <h1 className="col-span-3 "> ที่อยู่</h1>
            <h1 className="col-span-7 "> {ResultData.address ? ResultData.address : "-"}</h1>
          </div>
          <div className="mt-3 mb-5 outline outline-1 outline-zinc-700" />
          <div className="grid grid-cols-10 mt-6 text-lg gap-y-1 ">
            <h1 className="col-span-2 "> จ่ายโดย:</h1>
            <h1 className="col-span-2 "> {ResultData.payment}</h1>
            <h1 className="col-span-2 col-start-6 "> เลขที่ใบเสร็จ</h1>
            <h1 className="col-span-2 "> {ResultData.name}</h1>
          </div>
          <div className="mt-3 mb-5 outline outline-1 outline-zinc-700" />
          <div className="grid grid-cols-10 py-3 mt-6 text-2xl gap-y-1 ">
            <h1 className="col-span-5 "> ได้รับเงินแล้ว</h1>
            <h1 className="col-span-5 "> {ResultData.payment !== "cash" ? ResultData.totalPay : ResultData.cash}</h1>
          </div>
          <div className="mt-3 mb-5 outline outline-1 outline-zinc-700" />
          <div className="grid grid-cols-10 py-3 mt-6 text-2xl text-orange-400 gap-y-1 ">
            <h1 className="col-span-5 "> ทอน</h1>
            <h1 className="col-span-5 "> {ResultData.change}</h1>
          </div>

          <div className="mt-3 mb-5 outline outline-1 outline-zinc-700" />
          <div className="grid grid-cols-10 py-3 mt-6 text-2xl align-middle gap-y-1 place-content-stretch ">
            <h1 className="self-center col-span-3 ">ทิป</h1>
            <div className="flex col-span-7">
              <h1 className="w-2/5 p-2 mr-3 text-xl bg-orange-300 rounded-md hover:bg-orange-100 active:bg-orange-700 "> ทิปทั้งหมด</h1>
              <input className="w-3/5 px-5 py-0 text-right text-black rounded-lg " placeholder="0.00" />
            </div>
          </div>
          <div className="mt-3 mb-5 outline outline-1 outline-zinc-700" />
          <div
            className="py-3 mt-8 rounded-md outline outline-1 outline-neutral-500 hover:bg-white hover:text-primary active:bg-neutral-700"
            onClick={() => electron.Print.RePrint()}
          >
            พิมพ์ใบเสร็จ
          </div>
          <div
            className="py-3 mt-5 font-bold bg-green-400 rounded-md outline outline-1 outline-neutral-500 hover:bg-green-300 active:bg-green-700"
            onClick={finishPayment}
          >
            เสร็จสิ้น
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Results;
