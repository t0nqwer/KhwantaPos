import React, { useEffect } from "react";
import useUiContext from "../../zustand/UiContext";
import useBillStore from "../../zustand/BillContext";

const BillModal = () => {
  const { billModalActive, setBillModalActive } = useUiContext();
  const { singleBill, setSingleBill } = useBillStore();
  useEffect(() => {
    console.log(singleBill);
  }, [singleBill]);

  const closeModal = () => {
    setSingleBill({});
    setBillModalActive(false);
  };
  const PrintBill = () => {
    const data = {
      Name: singleBill.name,
      Product: singleBill.map((item) => {
        return {
          barcode: item?.barcode,
          proname: item.name,
          qty: item.qty,
          price: item.price,
        };
      }),
      customer: singleBill.customer,
      item: singleBill.ProductCount,
      productsum: singleBill.totalBfDiscount,
      subtotal: singleBill.totalPay,
      time: singleBill.convertTime,
      Paytype: singleBill.payment,
      Payamt: "0",
    };
    electron.Print.Print(data);
  };
  return (
    <div className="fixed bg-secondary w-full h-full top-0 left-0 bg-opacity-75 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div className="flex space-x-5 overflow-y-scroll bg-primary rounded-xl p-7">
        <div className="p-3 bg-white w-96">
          <p className="w-full border-t-2 "></p>
          <p>วันเวลา : {singleBill.convertTime}</p>
          <p>บิลเลขที่ : {singleBill.name} </p>
          <p>ลูกค้า : {singleBill.customer}</p>
          <p className="w-full border-t-2 "></p>
          <div>
            <div className="flex justify-between">
              <p>รายการ</p>
              <p>ราคา</p>
            </div>
            <p className="w-full border-t-2 "></p>
          </div>
          {singleBill?.products?.map((item, i) => (
            <div className="flex mt-1 " key={i}>
              <div className="w-4/5 shrink-0 ">
                <p className="text-sm text-wrap">{item.name}</p>
                <p>
                  {item.price} X{item.qty}{" "}
                </p>
              </div>
              <div className="w-full text-right">{item.price * item.qty}</div>
            </div>
          ))}
          <p className="w-full border-t-2 "></p>
          <div className="flex flex-wrap ">
            <p className="w-4/5 shrink-0 ">รวม</p>
            <p className="text-right ">{singleBill.totalBfDiscount}</p>
            <p className="w-4/5 shrink-0"> ส่วนลด</p>
            <p className="text-right ">{singleBill.disamout ? singleBill.disamout : "0"}</p>
            <p className="w-4/5 shrink-0">รวมสุทธิ</p>
            <p className="text-right ">{singleBill.totalPay}</p>
          </div>
        </div>
        <div className="flex flex-col w-48 ">
          <button className="p-3 border border-highlight text-highlight bg-slate-50 rounded-xl" onClick={PrintBill}>
            พิมพ์ใบเสร็จ
          </button>
          <button className="p-3 mt-10 border border-highlight text-highlight rounded-xl" onClick={closeModal}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
