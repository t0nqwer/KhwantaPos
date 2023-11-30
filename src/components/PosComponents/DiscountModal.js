import React, { useState } from "react";
import useUiContext from "../../zustand/UiContext";
import usePosContext from "../../zustand/PosContext";
import { notify } from "../../function/Notification";
const DiscountModal = () => {
  const [Distype, setDistype] = useState("");
  const [Amount, setAmount] = useState("");

  const activeBill = usePosContext((state) => state.activeBill);
  const currentProductList = usePosContext((state) => state.currentProductList);
  const setDiscount = usePosContext((state) => state.setDiscount);
  const setDiscountModalActive = useUiContext((state) => state.setDiscountModalActive);
  const discount = (e) => {
    setAmount(e.target.value);
  };
  const choose = (e) => {
    const amt = e.target.innerHTML;
    setAmount(amt);
  };
  const confirm = () => {
    // if (currentProductList.length === 0) {
    //   notify("โปรดเลือกสินค้า");
    //   setDiscountModalActive(false);
    //   return;
    // }
    if (Distype === "") {
      notify("โปรดเลือกประเภทส่วนลด");
      return;
    }
    if (Amount === "") {
      notify("โปรดกรอกส่วนลด");
      return;
    }
    setDiscount(Distype, +Amount);
    setDiscountModalActive(false);
  };
  return (
    <div
      id="BG"
      onClick={(e) => {
        e.target.id === "BG" ? setDiscountModalActive(false) : "";
      }}
      className=" fixed z-[5000] bg-secondary w-full h-full top-0 left-0 bg-opacity-75 backdrop-blur-md flex justify-center items-center "
    >
      <div
        onClick={(e) => {
          e.preventDefault();
        }}
        className="w-1/2 bg-primary rounded-xl"
      >
        <div className="w-full text-2xl text-center text-white mt-9 tracking-widestt "> ลดราคา</div>
        <div className="grid grid-cols-2 mx-10 text-center text-white divide-x rounded-lg mt-9 mb-9 divide-solid divide-neutral-300 outline outline-1">
          <div
            className={`w-full  py-3 px-4 ${Distype === "int" ? "bg-secondary" : "bg-transparent"} cursor-pointer`}
            onClick={() => {
              setDistype("int");
              setAmount("");
            }}
          >
            บาท
          </div>
          <div
            className={`w-full  py-3 px-4 ${Distype === "percent" ? "bg-secondary" : "bg-transparent"} cursor-pointer`}
            onClick={() => {
              setDistype("percent");
              setAmount("");
            }}
          >
            เปอร์เซ็นต์
          </div>
        </div>
        {Distype === "percent" ? (
          <div className="grid grid-cols-4 gap-4 mx-10 overflow-hidden text-center text-white mt-9 mb-9 ">
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              5
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              10
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              15
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              20
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mx-10 overflow-hidden text-center text-white mt-9 mb-9 ">
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              100
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              200
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              500
            </div>
            <div onClick={choose} className={`w-full  rounded-md py-3 px-4  cursor-pointer bg-secondary`}>
              1000
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 mx-10 overflow-hidden text-center text-white divide-x rounded-lg mt-9 mb-9 divide-solid divide-neutral-300 outline outline-1 ">
          <input
            type={"number"}
            value={Amount}
            className="w-full text-center text-black bg-neutral-50 "
            onChange={discount}
            placeholder="ส่วนลด"
          ></input>
          <div className={`w-full  py-3 px-4  cursor-pointer bg-secondary`}>{Distype === "percent" ? "%" : "บาท"}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mx-10 overflow-hidden text-white mt-9 mb-9 ">
          <button className="px-4 py-3 bg-red-500 rounded-lg " onClick={() => setDiscountModalActive(false)}>
            ยกเลิก
          </button>
          <button className="px-4 py-3 rounded-lg bg-emerald-500 " onClick={confirm}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
